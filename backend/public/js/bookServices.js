
const booksDisplayContainer = document.getElementById("booksDisplayContainer");
const errorDisplayContainer = document.getElementById("errorDisplayContainer");

const searchQueryInput = document.getElementById("searchQueryInput");
const searchQueryForm = document.getElementById("searchQueryForm");

//
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

// get book
async function fetchBooksFromDb(term = "") {
  errorDisplayContainer.textContent = "";
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

// render to html page
function renderBooksContent(books) {

  tbody.innerHTML = "";

  if (!books || books.length === 0) {
    // booksDisplayContainer.textContent = "No Books Found!";
    tbody.textContent = "No Books Found!";
    return;
  }

  table.style.display = "";
  books.forEach((book) => {

    const row = document.createElement("tr");

    // i can get _id from book._id
    row.innerHTML = `
          <td>${book.title || ""}</td>
          <td>${book.author || ""}</td>
          <td>${book.isbn || "—"}</td>
          <td>${book.publishedYear || "—"}</td>
          <td>${book.genre || "—"}</td>
          <td>${book.availableCopies ?? 0}</td>
        `;
    tbody.appendChild(row);
  });
}

// Get all books
searchQueryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // addNewBookContainer.style.display = "none";

  let term = searchQueryInput.value;
  if (!term.trim()) term = "";
  searchQueryForm.reset();

  await fetchBooksFromDb(term);
});

