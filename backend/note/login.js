// // // ========== CONSTANTS ==========
// // const API_BOOKS = '/api/books';
// // const API_LOGIN = '/admin/login';

// // // ========== TOKEN MANAGEMENT ==========

// // // Save token + expiry to localStorage
// // function saveToken(token) {
// //   // Decode the JWT to get expiry (exp) – without verifying signature
// //   const payload = JSON.parse(atob(token.split('.')[1]));
// //   const expiresAt = payload.exp * 1000; // convert seconds to milliseconds
// //   localStorage.setItem('adminToken', token);
// //   localStorage.setItem('tokenExpiry', expiresAt);
// // }

// // // Get the stored token if still valid
// // function getToken() {
// //   const token = localStorage.getItem('adminToken');
// //   const expiry = localStorage.getItem('tokenExpiry');
// //   if (!token || !expiry) return null;
// //   if (Date.now() > Number(expiry)) {
// //     // Token expired – clear storage
// //     clearToken();
// //     return null;
// //   }
// //   return token;
// // }

// // // Remove token from storage
// // function clearToken() {
// //   localStorage.removeItem('adminToken');
// //   localStorage.removeItem('tokenExpiry');
// // }

// // // Check if user is authenticated (token exists and not expired)
// // function isAuthenticated() {
// //   return !!getToken();
// // }

// // // Build auth headers for fetch
// // function authHeaders() {
// //   const token = getToken();
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // }

// // // ========== UI HELPERS ==========
// // const loginSection = document.getElementById('loginSection');
// // const dashboardSection = document.getElementById('dashboardSection');
// // const loginError = document.getElementById('loginError');
// // const booksError = document.getElementById('booksError');
// // const booksTable = document.getElementById('booksTable');
// // const tbody = booksTable.querySelector('tbody');

// // function showLogin() {
// //   loginSection.classList.remove('hidden');
// //   dashboardSection.classList.add('hidden');
// // }

// // function showDashboard() {
// //   loginSection.classList.add('hidden');
// //   dashboardSection.classList.remove('hidden');
// //   fetchAndDisplayBooks();
// // }

// // // ========== LOGIN ==========
// // document.getElementById('loginBtn').addEventListener('click', async () => {
// //   const email = document.getElementById('loginEmail').value.trim();
// //   const password = document.getElementById('loginPassword').value;
// //   loginError.textContent = '';

// //   if (!email || !password) {
// //     loginError.textContent = 'Please fill in both fields.';
// //     return;
// //   }

// //   try {
// //     const res = await fetch(API_LOGIN, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ email, password })
// //     });
// //     const data = await res.json();
// //     if (!res.ok) throw new Error(data.message || 'Login failed');

// //     // Save token with expiry
// //     saveToken(data.token);
// //     showDashboard();
// //   } catch (err) {
// //     loginError.textContent = err.message;
// //   }
// // });

// // // ========== LOGOUT ==========
// // document.getElementById('logoutBtn').addEventListener('click', () => {
// //   clearToken();
// //   showLogin();
// //   // Clear dashboard
// //   tbody.innerHTML = '';
// // });

// // // ========== FETCH & DISPLAY BOOKS ==========
// // async function fetchAndDisplayBooks() {
// //   if (!isAuthenticated()) {
// //     showLogin();
// //     return;
// //   }
// //   try {
// //     const res = await fetch(API_BOOKS);
// //     const books = await res.json();
// //     renderBooks(Array.isArray(books) ? books : books.message || []);
// //   } catch (err) {
// //     booksError.textContent = 'Failed to load books.';
// //   }
// // }

// // function renderBooks(books) {
// //   tbody.innerHTML = '';
// //   if (!books.length) {
// //     booksTable.style.display = 'none';
// //     return;
// //   }
// //   booksTable.style.display = '';
// //   books.forEach(book => {
// //     const row = document.createElement('tr');
// //     row.innerHTML = `
// //       <td>${escapeHtml(book.title)}</td>
// //       <td>${escapeHtml(book.author)}</td>
// //       <td>${book.isbn || '—'}</td>
// //       <td>${book.publishedYear || '—'}</td>
// //       <td>${book.genre || '—'}</td>
// //       <td>${book.availableCopies ?? 0}</td>
// //       <td>
// //         <button class="editBtn" data-id="${book._id}">Edit</button>
// //         <button class="deleteBtn" data-id="${book._id}">Delete</button>
// //       </td>
// //     `;
// //     tbody.appendChild(row);
// //   });
// //   attachActionHandlers();
// // }

// // function escapeHtml(text) {
// //   if (!text) return '';
// //   return String(text)
// //     .replace(/&/g, '&amp;')
// //     .replace(/</g, '&lt;')
// //     .replace(/>/g, '&gt;')
// //     .replace(/"/g, '&quot;')
// //     .replace(/'/g, '&#039;');
// // }

// // // ========== ADD BOOK ==========
// // document.getElementById('addBookForm').addEventListener('submit', async (e) => {
// //   e.preventDefault();
// //   if (!isAuthenticated()) { showLogin(); return; }
// //   const bookData = {
// //     title: document.getElementById('title').value.trim(),
// //     author: document.getElementById('author').value.trim(),
// //   };
// //   const year = document.getElementById('publishedYear').value;
// //   if (year) bookData.publishedYear = Number(year);
// //   const genre = document.getElementById('genre').value;
// //   if (genre) bookData.genre = genre;
// //   const copies = document.getElementById('availableCopies').value;
// //   bookData.availableCopies = copies ? Number(copies) : 1;

// //   try {
// //     const res = await fetch(API_BOOKS, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         ...authHeaders()
// //       },
// //       body: JSON.stringify(bookData)
// //     });
// //     const data = await res.json();
// //     if (!res.ok) throw new Error(data.message || 'Add failed');
// //     document.getElementById('addBookForm').reset();
// //     fetchAndDisplayBooks();
// //   } catch (err) {
// //     booksError.textContent = err.message;
// //   }
// // });

// // // ========== EDIT / DELETE (simplified – prompt for edit) ==========
// // function attachActionHandlers() {
// //   document.querySelectorAll('.editBtn').forEach(btn => {
// //     btn.addEventListener('click', async () => {
// //       const id = btn.dataset.id;
// //       const row = btn.closest('tr');
// //       const oldTitle = row.cells[0].textContent;
// //       const oldAuthor = row.cells[1].textContent;
// //       const newTitle = prompt('New title:', oldTitle);
// //       if (!newTitle) return;
// //       const newAuthor = prompt('New author:', oldAuthor);
// //       if (!newAuthor) return;
// //       try {
// //         const res = await fetch(`${API_BOOKS}/${id}`, {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             ...authHeaders()
// //           },
// //           body: JSON.stringify({ title: newTitle, author: newAuthor })
// //         });
// //         if (!res.ok) throw new Error('Update failed');
// //         fetchAndDisplayBooks();
// //       } catch (err) {
// //         booksError.textContent = err.message;
// //       }
// //     });
// //   });

// //   document.querySelectorAll('.deleteBtn').forEach(btn => {
// //     btn.addEventListener('click', async () => {
// //       if (!confirm('Delete this book?')) return;
// //       const id = btn.dataset.id;
// //       try {
// //         const res = await fetch(`${API_BOOKS}/${id}`, {
// //           method: 'DELETE',
// //           headers: authHeaders()
// //         });
// //         if (!res.ok) throw new Error('Delete failed');
// //         fetchAndDisplayBooks();
// //       } catch (err) {
// //         booksError.textContent = err.message;
// //       }
// //     });
// //   });
// // }

// // // ========== INITIALISATION ==========
// // if (isAuthenticated()) {
// //   showDashboard();
// // } else {
// //   showLogin();
// // }

// You don’t need the user ID on the frontend – the JWT token already contains it.
// When your edit page sends a request to the backend, it includes the token in the Authorization header. The backend’s protect middleware decodes the token and attaches req.user (which includes the user ID and role). So you never need to pass the user ID manually.

// Your edit page only needs:

// 1. The book ID (to know which book to update).
// 2. The token (to prove you are an admin).

// Both are already available: the book ID comes from the URL, and the token is in localStorage.

// ---

// ✅ Complete Edit Page – Cleanly Sending Data to Backend

// Here’s a minimal, correct editbook.html that:

// · Reads the bookId from the URL (e.g., /admin/editbook?bookId=...)
// · Gets the token from localStorage (same key as in your admin dashboard)
// · Fetches the current book details and fills the form
// · Submits the update with the token attached

// ```html
// <!-- public/admin/editbook.html -->
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Edit Book</title>
//   <style>
//     body { font-family: Arial; margin: 20px; }
//     .error { color: red; }
//     label { display: block; margin-top: 10px; }
//     input, select { padding: 6px; width: 250px; }
//     button { margin-top: 15px; cursor: pointer; }
//   </style>
// </head>
// <body>
//   <h2>Edit Book</h2>
//   <p id="error" class="error"></p>
//   <form id="editForm">
//     <label>Title *</label>
//     <input type="text" id="title" required />

//     <label>Author *</label>
//     <input type="text" id="author" required />

//     <label>Published Year</label>
//     <input type="number" id="publishedYear" />

//     <label>Genre</label>
//     <select id="genre">
//       <option value="">None</option>
//       <option>Fiction</option><option>Non-Fiction</option>
//       <option>Science</option><option>History</option>
//       <option>Fantasy</option><option>Biography</option><option>Other</option>
//     </select>

//     <label>Available Copies</label>
//     <input type="number" id="availableCopies" min="0" />

//     <button type="submit">Save Changes</button>
//     <button type="button" id="cancelBtn">Cancel</button>
//   </form>

//   <script>
//     // ====== TOKEN HELPERS (same as admin page) ======
//     const TOKEN_KEY = 'UserAuthToken';   // must match what you used in admin.html

//     function getToken() {
//       return localStorage.getItem(TOKEN_KEY) || '';
//     }

//     function isAuthenticated() {
//       return !!getToken();
//     }

//     // If no token → send back to login
//     if (!isAuthenticated()) {
//       window.location.href = '/admin.html';  // or your login page
//     }

//     // ====== FETCH WRAPPER (includes token) ======
//     async function fetchWithAuth(url, options = {}) {
//       const token = getToken();
//       const headers = {
//         'Content-Type': 'application/json',
//         ...(options.headers || {})
//       };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;   // <-- this is where the user ID is carried
//       }

//       const response = await fetch(url, { ...options, headers });

//       // If token expired/invalid → clear and redirect
//       if (response.status === 401) {
//         localStorage.removeItem(TOKEN_KEY);
//         window.location.href = '/admin.html';
//         throw new Error('Session expired');
//       }

//       return response;
//     }

//     // ====== GET BOOK ID FROM URL ======
//     const params = new URLSearchParams(window.location.search);
//     const bookId = params.get('bookId');   // ?bookId=...

//     if (!bookId) {
//       document.getElementById('error').textContent = 'No book ID provided.';
//     }

//     // ====== LOAD BOOK DATA ======
//     async function loadBook() {
//       try {
//         const response = await fetchWithAuth(`/api/books/${bookId}`);
//         if (!response.ok) throw new Error('Book not found');
//         const book = await response.json();

//         // Fill form fields
//         document.getElementById('title').value = book.title || '';
//         document.getElementById('author').value = book.author || '';
//         document.getElementById('publishedYear').value = book.publishedYear || '';
//         document.getElementById('genre').value = book.genre || '';
//         document.getElementById('availableCopies').value = book.availableCopies ?? 1;
//       } catch (err) {
//         document.getElementById('error').textContent = err.message;
//       }
//     }

//     loadBook();

//     // ====== HANDLE FORM SUBMISSION (UPDATE) ======
//     document.getElementById('editForm').addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const errorEl = document.getElementById('error');
//       errorEl.textContent = '';

//       // Gather updated fields
//       const updates = {
//         title: document.getElementById('title').value.trim(),
//         author: document.getElementById('author').value.trim(),
//       };

//       const year = document.getElementById('publishedYear').value;
//       if (year) updates.publishedYear = Number(year);

//       const genre = document.getElementById('genre').value;
//       if (genre) updates.genre = genre;

//       const copies = document.getElementById('availableCopies').value;
//       updates.availableCopies = copies ? Number(copies) : 1;

//       try {
//         const response = await fetchWithAuth(`/api/books/${bookId}`, {
//           method: 'PUT',
//           body: JSON.stringify(updates)
//         });

//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.message || 'Update failed');
//         }

//         // Success → go back to dashboard
//         window.location.href = '/admin.html';
//       } catch (err) {
//         errorEl.textContent = err.message;
//       }
//     });

//     // Cancel → back to dashboard
//     document.getElementById('cancelBtn').addEventListener('click', () => {
//       window.location.href = '/admin.html';
//     });
//   </script>
// </body>
// </html>
// ```

// ---

// 🔑 Key Point – How the User ID is Used (Without You Sending It)

// 1. The token was saved during login on the admin page.
// 2. The edit page retrieves the token from localStorage using the same key (UserAuthToken).
// 3. Every fetch request includes the header Authorization: Bearer <token>.
// 4. Your backend’s protect middleware does this:

// ```javascript
// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // decoded = { id: 'user_mongo_id', iat: ..., exp: ... }
// req.user = await User.findById(decoded.id);
// ```

// 1. The user ID is automatically extracted from the token and attached to req.user. The update controller doesn’t even need the user ID – it only checks the role via the authorize middleware.

// So you never need to get the user ID from a separate file or from loginUser.js. The token is the only credential you need to send, and it’s already stored in localStorage.

// ---

// 🚀 How to Test the Flow

// 1. Login on /admin.html → token is saved.
// 2. Click Edit on a book → you go to /admin/editbook.html?bookId=...
// 3. The page loads, fetches the book (with token), fills the form.
// 4. Change some fields and click Save.
// 5. The update request is sent with the token. Backend authenticates and updates.
// 6. You are redirected back to the dashboard.

// Everything works because the token is shared between pages via localStorage. No extra user ID logic is needed.