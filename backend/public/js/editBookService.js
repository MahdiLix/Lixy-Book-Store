
const editBookForm = document.getElementById("editBookForm")
const submitEditdBook = document.getElementById("submitEditdBook")
const cancelEditBook = document.getElementById("cancelEditBook")
const errorDisplayContainer = document.getElementById("errorDisplayContainer")


const API_URL = "/api/books";

async function editBookHandler(bookData) {
  errorDisplayContainer.textContent = '';
  try {

    const id = window.location.pathname.split(':')[1];
    console.log(typeof(id));
    
    const url = `/api/books/update/${id}`
    console.log('url',url);
    
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getUserAuthToken()
      },
      body: JSON.stringify(bookData),
    });

    const data = await res.json()
    if (!res.ok) {
      console.error(data.message)
      throw new Error(data.message || res.status);
    }
    console.log("data", data)
    
  } catch (error) {
    console.error(error.message);
    errorDisplayContainer.textContent = `Error add book: ${error.message}`;
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
// Submit new book
const titleField = document.getElementById("title");
const authorField = document.getElementById("author");
// check title and author REGEX when keypres
titleField.addEventListener("keypress", restrikInputTitle);
authorField.addEventListener("keypress", restrikInputAuthor);


editBookForm.addEventListener("submit", async (event) => {
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

  console.log(bookData);
  await editBookHandler(bookData)


});

// Cancel adding book
cancelEditBook.addEventListener("click", () => {
  console.log("click on cancel");
  window.location.href = "/login"
  return
});
