

// const randomNumber = Math.floor(1000000000000 + Math.random() * 9000000000000)
// // const randomNumber = Math.floor()

// console.log(randomNumber);



//  $body = @{
//       title = "The Hobbit"
//       author = "J.R.R. Tolkien"
//       publishedYear = 1937
//   }
 
//   Invoke-RestMethod -Uri http://localhost:5000/api/books -Method Post -Body ($body | ConvertTo-Json) -ContentType "application/json"

// // const nowYear = new Date().getFullYear();

// // console.log(nowYear);

// // router.put('/:id', async (req, res, next) => {
// //   try {
// //     const book = await Book.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       {
// //         new: true,
// //         runValidators: true,
// //       }
// //     );
// //     if (!book) {
// //       return res.status(404).json({ success: false, message: 'Book not found' });
// //     }
// //     res.status(200).json({ success: true, data: book });
// //   } catch (error) {
// //     if (error.name === 'ValidationError') {
// //       const messages = Object.values(error.errors).map((err) => err.message);
// //       return res.status(400).json({ success: false, message: messages.join(', ') });
// //     }
// //     if (error.kind === 'ObjectId') {
// //       return res.status(400).json({ success: false, message: 'Invalid book ID format' });
// //     }
// //     next(error);
// //   }
// // });
// I’ll provide a complete working solution that:

// · Serves the HTML + JavaScript from the public folder
// · Exposes the existing /api/books endpoints for list all books (GET) and add new book (POST)
// · Handles button clicks to fetch all books and render them, and to show a form for adding a new book

// No templating engine needed – pure static frontend + Express API.

// ---

// 1. Project Structure (just the important parts)

// ```
// book-library-api/
// ├── server.js
// ├── models/
// │   └── Book.js          (your Mongoose schema)
// ├── controllers/
// │   └── bookController.js  (handlers for GET, POST, etc.)
// ├── routes/
// │   └── bookRoutes.js
// ├── middlewares/
// │   └── errorHandling.js
// └── public/               ← Frontend (static files)
//     ├── index.html
//     └── main.js           (frontend logic)
// ```

// ---

// 2. Backend – The Three Essential Files

// server.js

// ```javascript
// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const path = require('path');

// const app = express();

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Body parser (important for POST requests)
// app.use(express.json());

// // 1. Serve static files (frontend) from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

// // 2. Mount API routes
// app.use('/api/books', require('./routes/bookRoutes'));

// // 3. Fallback – for any other route, serve index.html (optional)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // 4. Global error handler (optional but recommended)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// ```

// routes/bookRoutes.js

// ```javascript
// const express = require('express');
// const router = express.Router();
// const { getBook, createBook } = require('../controllers/bookController');

// // GET all books
// router.get('/', getBook);
// // POST new book
// router.post('/', createBook);
// // You already have PUT and DELETE, keep them as needed.

// module.exports = router;
// ```

// controllers/bookController.js

// I’ll write it cleanly, including your existing logic for automatic ISBN generation (from your previous schema with default and immutable).

// ```javascript
// const { createError } = require("../middlewares/errorHandling");
// const bookModel = require("../models/bookModel");

// const getBook = async (req, res, next) => {
//   try {
//     const books = await bookModel.find({});   // all books
//     res.status(200).json(books);              // send plain array
//   } catch(err) {
//     next(createError(err));
//   }
// };

// const createBook = async (req, res, next) => {
//   try {
//     // Prevent user from manually setting ISBN – we want the auto‑generated one
//     delete req.body.isbn;

//     // If publishedYear is explicitly null/undefined, remove it so the schema default kicks in
//     if (req.body.publishedYear == null) {
//       delete req.body.publishedYear;
//     }

//     const book = await bookModel.create(req.body);
//     res.status(201).json(book);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ success: false, message: messages.join(', ') });
//     }
//     if (error.code === 11000) {
//       return res.status(400).json({ success: false, message: 'A book with this ISBN already exists' });
//     }
//     next(createError(error));
//   }
// };

// module.exports = { getBook, createBook };
// ```

// If you don’t have createError middleware, just replace next(createError(err)) with next(err) and adjust accordingly.

// ---

// 3. Frontend – HTML + JavaScript

// These files go inside the public/ folder.

// public/index.html

// ```html
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Book Library App</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         margin: 20px;
//         background: #f7f7f7;
//       }
//       h2 {
//         text-align: center;
//       }
//       button {
//         padding: 10px 20px;
//         margin: 5px;
//         cursor: pointer;
//         font-size: 16px;
//       }
//       #addFormContainer {
//         display: none;
//         margin: 20px 0;
//         padding: 15px;
//         background: white;
//         border: 1px solid #ccc;
//         border-radius: 8px;
//         max-width: 400px;
//       }
//       #addFormContainer input, #addFormContainer select {
//         display: block;
//         width: 100%;
//         margin-bottom: 10px;
//         padding: 8px;
//       }
//       #addFormContainer button[type="submit"] {
//         background-color: #4CAF50;
//         color: white;
//         border: none;
//         border-radius: 4px;
//       }
//       table {
//         width: 100%;
//         border-collapse: collapse;
//         margin-top: 20px;
//         background: white;
//       }
//       th, td {
//         padding: 10px;
//         border: 1px solid #ddd;
//         text-align: left;
//       }
//       th {
//         background-color: #4CAF50;
//         color: white;
//       }
//       tr:nth-child(even) {
//         background-color: #f2f2f2;
//       }
//       .error {
//         color: red;
//         font-weight: bold;
//       }
//     </style>
//   </head>
//   <body>
//     <main>
//       <h2>Welcome to Book Library App</h2>
//       <button id="getAllBooksBtn">Show All Books</button>
//       <button id="addNewBookBtn">Add New Book</button>

//       <!-- Hidden form for adding a book -->
//       <div id="addFormContainer">
//         <h3>Add a New Book</h3>
//         <form id="addBookForm">
//           <input type="text" id="title" placeholder="Title *" required />
//           <input type="text" id="author" placeholder="Author *" required />
//           <input type="number" id="publishedYear" placeholder="Published Year (optional)" />
//           <select id="genre">
//             <option value="">Select Genre (optional)</option>
//             <option value="Fiction">Fiction</option>
//             <option value="Non-Fiction">Non-Fiction</option>
//             <option value="Science">Science</option>
//             <option value="History">History</option>
//             <option value="Fantasy">Fantasy</option>
//             <option value="Biography">Biography</option>
//             <option value="Other">Other</option>
//           </select>
//           <input type="number" id="availableCopies" placeholder="Available Copies" value="1" min="0" />
//           <button type="submit">Add Book</button>
//           <button type="button" id="cancelAddBtn">Cancel</button>
//         </form>
//       </div>

//       <div id="error-message" class="error"></div>

//       <!-- Books will be displayed here as a table -->
//       <div id="booksContainer">
//         <table id="booksTable" style="display: none;">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author</th>
//               <th>ISBN</th>
//               <th>Year</th>
//               <th>Genre</th>
//               <th>Available</th>
//             </tr>
//           </thead>
//           <tbody></tbody>
//         </table>
//       </div>
//     </main>

//     <script src="/main.js"></script>
//   </body>
// </html>
// ```

// public/main.js

//  javascript
// // ========== DOM Elements ==========
// const getAllBtn = document.getElementById('getAllBooksBtn');
// const addNewBookBtn = document.getElementById('addNewBookBtn');
// const addFormContainer = document.getElementById('addFormContainer');
// const addBookForm = document.getElementById('addBookForm');
// const cancelBtn = document.getElementById('cancelAddBtn');
// const booksTable = document.getElementById('booksTable');
// const tableBody = booksTable.querySelector('tbody');
// const errorDiv = document.getElementById('error-message');

// // ========== API Base (same origin) ==========
// const apiUrl = '/api/books';

// // ========== Functions ==========

// // Fetch all books from API and render table
// async function fetchAndDisplayBooks() {
//   try {
//     errorDiv.textContent = '';
//     const res = await fetch(apiUrl);
//     if (!res.ok) throw new Error(`Server error: ${res.status}`);
//     const books = await res.json();   // expects array
//     renderBooks(Array.isArray(books) ? books : books.message || []);
//   } catch (err) {
//     errorDiv.textContent = 'Failed to load books: ' + err.message;
//   }

// // Render books into table
// function renderBooks(books) {
//   tableBody.innerHTML = '';
//   if (!books || books.length === 0) {
//     booksTable.style.display = 'none';
//     return;
//   }
//   booksTable.style.display = '';
//   books.forEach(book => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${escapeHtml(book.title)}</td>
//       <td>${escapeHtml(book.author)}</td>
//       <td>${book.isbn || '—'}</td>
//       <td>${book.publishedYear || '—'}</td>
//       <td>${book.genre || '—'}</td>
//       <td>${book.availableCopies ?? 0}</td>
//     `;
//     tableBody.appendChild(row);
//   });
// }

// // Add new book
// async function addBook(bookData) {
//   try {
//     errorDiv.textContent = '';
//     const res = await fetch(apiUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(bookData)
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.message || 'Failed to add book');
//     }
//     // Success: hide form, refresh list
//     addFormContainer.style.display = 'none';
//     addBookForm.reset();
//     await fetchAndDisplayBooks();   // show the updated list
//   } catch (err) {
//     errorDiv.textContent = err.message;
//   }
// }

// // XSS prevention
// function escapeHtml(text) {
//   if (!text) return '';
//   return String(text)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#039;');
// }

// // ========== Event Listeners ==========

// // Show all books button
// getAllBtn.addEventListener('click', fetchAndDisplayBooks);

// // Show add new book form
// addNewBookBtn.addEventListener('click', () => {
//   addFormContainer.style.display = 'block';
//   errorDiv.textContent = '';
// });

// // Cancel button hides form
// cancelBtn.addEventListener('click', () => {
//   addFormContainer.style.display = 'none';
//   addBookForm.reset();
// });

// // Handle form submission
// addBookForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const bookData = {
//     title: document.getElementById('title').value.trim(),
//     author: document.getElementById('author').value.trim(),
//   };
//   const year = document.getElementById('publishedYear').value;
//   if (year) bookData.publishedYear = Number(year);
//   const genre = document.getElementById('genre').value;
//   if (genre) bookData.genre = genre;
//   const copies = document.getElementById('availableCopies').value;
//   if (copies) bookData.availableCopies = Number(copies);

//   // Title and author are required (schema ensures it, but double-check)
//   if (!bookData.title || !bookData.author) {
//     errorDiv.textContent = 'Title and Author are required.';
//     return;
//   }

//   await addBook(bookData);
// });
 
// ---

// 4. How to Run & Test

// 1. Start your server: node server.js (or npm run dev).
// 2. Open your browser to http://localhost:5000.
// 3. Click Show All Books – it fetches all books from MongoDB and displays them in a table.
// 4. Click Add New Book – a form appears. Fill in title and author (others optional) and submit. The book is sent via POST /api/books, the ISBN is auto‑generated, and the table refreshes to include it.

// Your API stays untouched – you can still test it with curl or Postman.

// ---

// Why This Is “Clean”

// · The backend is purely an API – no HTML mixed in.
// · The frontend is static files, served by Express, that fetch data via JavaScript.
// · The user interface is completely decoupled from the server logic.
// · If you later switch to React, you only touch the public folder—not the backend.

// This gives you get all books and add a new book from a single HTML page, exactly as you requested.


// const myArr = ["array length start from 1"]
// console.log(myArr.length);


/////////////////////////

// const nowDate = new Date().toISOString()
// console.log(nowDate.slice(0, 25));
//////////

 