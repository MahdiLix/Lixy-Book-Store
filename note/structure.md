.
├── backend
│   ├── app.js
│   ├── controllers
│   │   ├── auth
│   │   │   ├── admins
│   │   │   │   ├── deleteAdminController.js
│   │   │   │   └── registerController.js
│   │   │   └── users
│   │   │       ├── loginController.js
│   │   │       └── protectController.js
│   │   └── crud
│   │       ├── deleteBookController.js
│   │       ├── getBookByIdController.js
│   │       ├── getBookController.js
│   │       ├── postNewBookController.js
│   │       └── putBookController.js
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

32 directories, 74 files
