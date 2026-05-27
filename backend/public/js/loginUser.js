const bookStoreDisplayContainer = document.getElementById('bookStoreDisplayContainer')
const adminForm = document.getElementById('adminForm')
const adminFormContainer = document.getElementById('adminFormContainer')

// domElements.js
// const getBooksBtn = document.getElementById("getBooksBtn");
const addNewBookBtn = document.getElementById("addNewBookBtn");
const addNewBookContainer = document.getElementById("addNewBookContainer");
const submitAddBookBtn = document.getElementById("submitAddBookBtn");
const cancelAddBookBtn = document.getElementById("cancelAddBookBtn");
const addNewBookForm = document.getElementById("addNewBookForm");
const booksDisplayContainer = document.getElementById("booksDisplayContainer");
const errorDisplayContainer = document.getElementById("errorDisplayContainer");

const searchQueryInput = document.getElementById("searchQueryInput");
const searchQueryForm = document.getElementById("searchQueryForm");


const table = document.getElementById("booksTable");
const tbody = table.querySelector("tbody");
//

const API_URL = "/api/books";

// add book
function restrikInputTitle(event) {
  const key = event.key;
  const allowedRegex = /[^A-Za-z0-9\s\-\.'"\*]/g;
  if (allowedRegex.test(key)) {
    event.preventDefault();
    alert(`Invalid character: ${key}`);
  }
}
function restrikInputAuthor(event) {
  const key = event.key;
  const allowedRegex = /[^A-Za-z\s\-\.'"\*]/g;
  if (allowedRegex.test(key)) {
    event.preventDefault();
    alert(`Invalid character: ${key}`);
  }
}

async function addNewBookToDb(bookData) {
  errorDisplayContainer.textContent = '';
  try {
    console.log("before", getUserAuthToken())

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getUserAuthToken()
      },
      body: JSON.stringify(bookData),
    });

    const data = await res.json()

    if (res.status === 401) {
      localStorage.removeItem("userAuthToken")
      showLoginForm()
    }
    if (!res.ok) {
      console.error(data.message)
      throw new Error(data.message || res.status);
    }

    renderBooksContent([data.book]);
  } catch (error) {
    console.error(error.message);
    errorDisplayContainer.textContent = `Error add book: ${error.message}`;
  }
}

 

// get book
async function fetchBooksFromDb(term = '') {
  errorDisplayContainer.textContent = '';
  try {
    const url = `${API_URL}?q=${encodeURIComponent(term)}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }
    const { data } = await res.json();
    renderBooksContent(data);
  } catch (error) {
    errorDisplayContainer.textContent = `Faild to load books: ${error.message}`;
  }
}

// render html
function renderBooksContent(books) {
  tbody.innerHTML = "";

  if (!books || books.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8">No Books Found!</td></tr>';
    table.style.display = "none";
    return;
  }

  table.style.display = "";

  books.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHtml(book.title) || ""}</td>
      <td>${escapeHtml(book.author) || ""}</td>
      <td>${book.isbn || "—"}</td>
      <td>${book.publishedYear || "—"}</td>
      <td>${book.genre || "—"}</td>
      <td>${book.availableCopies ?? 0}</td>
      <td>
        <button class="edit-btn" data-id="${book._id}">Edit</button>
      </td>
      <td>
        <button class="remove-btn" data-id="${book._id}">Remove</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  // Attach event listeners to all edit/remove buttons
  attachButtonListeners();
}
// for security in front end side
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function attachButtonListeners() {
  // Edit buttons
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookId = btn.dataset.id;
      console.log(bookId)
      window.location.href = `/admin/editbook/id:${bookId}`
     });
  });

  // Remove buttons
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookId = btn.dataset.id;
      console.log(bookId)
      // handleRemoveBook(bookId);
    });
  });
}

  
// Get all books
searchQueryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  addNewBookContainer.style.display = "none";

  let term = searchQueryInput.value;
  if (!term.trim()) term = "";
  searchQueryForm.reset();

  await fetchBooksFromDb(term);
});

// Show "Add New Book" form
addNewBookBtn.addEventListener("click", () => {
  // booksDisplayContainer.style.display = "none";
  table.style.display = "none";
  addNewBookContainer.style.display = "block";
});

// Submit new book
const titleField = document.getElementById("title");
const authorField = document.getElementById("author");
// check title and author REGEX when keypres
titleField.addEventListener("keypress", restrikInputTitle);
authorField.addEventListener("keypress", restrikInputAuthor);

addNewBookForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorDisplayContainer.textContent = "";

  const bookData = {
    title: titleField.value.trim(),
    author: authorField.value.trim(),
  };

  const publishedYear = document.getElementById("publishedYear").value.trim();
  const genre = document.getElementById("genre").value;
  const availableCopies = document.getElementById("availableCopies").value;

  if (publishedYear) bookData.publishedYear = publishedYear;
  if (genre) bookData.genre = genre;
  if (availableCopies) bookData.availableCopies = availableCopies;

  if (!bookData.title || !bookData.author) {
    errorDisplayContainer.textContent = "Title and Author is required!";
    return;
  }

  addNewBookContainer.style.display = "none";
  addNewBookForm.reset();
  await addNewBookToDb(bookData);
});

// Cancel adding book
cancelAddBookBtn.addEventListener("click", () => {
  addNewBookContainer.style.display = "none";
  addNewBookForm.reset();
});



/////////////==== admin service ============////////////
const USER_LOGIN_URL = "/api/user/login"

async function sendLoginFieldToDb(loginField) {
  try {
    const res = await fetch(USER_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginField),
    });
    const data = await res.json()

    if (!res.ok) {
      throw new Error(`${data.message} || Server Error ${res.status} `);
    }

    const token = data.token
    if (!token) throw new Error("Not Login!")

    saveUserAuthToken(token)


  } catch (error) {
    console.error(error.message);
    errorDisplayContainer.textContent = "Login Faild!";
  }
}

function saveUserAuthToken(token) {
  localStorage.setItem('userAuthToken', token)
  // show book
  showBookStore()
  return;
}

function getUserAuthToken() {
  const token = localStorage.getItem('userAuthToken');
  return token ? `Bearer ${token}` : ''

}

function showBookStore() {
  adminFormContainer.style.display = 'none';
  bookStoreDisplayContainer.style.display = 'block';
}
function showLoginForm() {
  bookStoreDisplayContainer.style.display = 'none';
  adminFormContainer.style.display = 'block';
}

window.addEventListener('DOMContentLoaded', () => {
  const vallidToken = localStorage.getItem('userAuthToken')
  if (vallidToken) {
    showBookStore()
  } else {
    showLoginForm()
  }
})

adminForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorDisplayContainer.textContent = "";

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) {
    errorDisplayContainer.textContent = "Provide Email and Password"
    return
  }
  adminForm.reset()
  await sendLoginFieldToDb({ email, password });

})

