.
├── backend
│   ├── app.js
│   ├── controllers
│   │   ├── admins
│   │   │   ├── deleteAdminById.js
│   │   │   └── registerNewAdmin.js
│   │   ├── booksCrud
│   │   │   ├── deleteBookById.js
│   │   │   ├── getBookById.js
│   │   │   ├── getBookByQuery.js
│   │   │   ├── postNewBook.js
│   │   │   └── putBookById.js
│   │   └── users
│   │       ├── userLogin.js
│   │       └── userProtect.js
│   ├── database.js
│   ├── Dockerfile
│   ├── middlewares
│   │   └── errors
│   │       └── errorHandling.js
│   ├── models
│   │   ├── bookModel.js
│   │   └── userModel.js
│   ├── note
│   │   ├── unix_command.md
│   │   └── windows_command.md
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   │   ├── adminRoutes.js
│   │   └── bookRoutes.js
│   ├── seedSuperadmin.js
│   ├── server.js
│   ├── services
│   │   ├── admins
│   │   │   ├── deleteAdminService.js
│   │   │   └── registerNewAdminService.js
│   │   ├── booksCrud
│   │   │   ├── deleteBookByIdService.js
│   │   │   ├── getBookByIdService.js
│   │   │   ├── getBookByQueryService.js
│   │   │   ├── postNewBookService.js
│   │   │   └── putBookByIdService.js
│   │   └── users
│   │       ├── userLoginService.js
│   │       └── userProtectService.js
│   └── tests
│       ├── helper
│       │   └── userLoginAuth.js
│       └── integration
│           ├── adminServices.test.js
│           └── booksServices.test.js
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── index.html
│   │   ├── lixybookstore.png
│   │   └── lixystoreblue.png
│   ├── src
│   │   ├── api
│   │   │   ├── authApi.js
│   │   │   └── booksApi.js
│   │   ├── App.jsx
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Admin
│   │   │   │   ├── AddBookForm.jsx
│   │   │   │   ├── AdminHeader.jsx
│   │   │   │   ├── AdminToolbar.jsx
│   │   │   │   ├── BookFormFields.jsx
│   │   │   │   └── EditBook
│   │   │   │       └── EditBookForm.jsx
│   │   │   ├── Books
│   │   │   │   ├── BookRow.jsx
│   │   │   │   ├── BooksHeader.jsx
│   │   │   │   ├── BooksTable.jsx
│   │   │   │   └── SearchBookForm.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Login
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── LoginHeader.jsx
│   │   │   ├── SearchBookForm.jsx
│   │   │   └── Shared
│   │   │       ├── Card.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       ├── FeedbackMessage.jsx
│   │   │       ├── Loading.jsx
│   │   │       ├── PageShell.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       └── SectionTitle.jsx
│   │   ├── context
│   │   │   └── ThemeContext.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── AdminBooksPage.jsx
│   │   │   │   └── EditBookPage.jsx
│   │   │   ├── BooksPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── LoginPage.jsx
│   │   ├── styles
│   │   │   └── ui.js
│   │   └── utils
│   │       ├── auth.js
│   │       ├── bookForm.js
│   │       └── inputGuards.js
│   └── tailwind.config.js
├── note
│   ├── env.md
│   ├── structure.md
│   └── superadmin.md
└── README.md

35 directories, 83 files
