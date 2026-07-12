.
├── backend
│   ├── app.js
│   ├── controllers
│   │   ├── admins
│   │   │   ├── deleteAdminById.js
│   │   │   ├── registerNewAdmin.js
│   │   │   ├── updateAdminById.js
│   │   │   └── updateAdminPassById.js
│   │   ├── booksCrud
│   │   │   ├── deleteBookById.js
│   │   │   ├── getBookById.js
│   │   │   ├── getBookByQuery.js
│   │   │   ├── postNewBook.js
│   │   │   └── updateBookById.js
│   │   └── users
│   │       ├── userLogin.js
│   │       └── userProtect.js
│   ├── database.js
│   ├── Dockerfile
│   ├── middlewares
│   │   ├── bookUpload.js
│   │   ├── deleteUploadImage.js
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
│   │   │   ├── registerNewAdminService.js
│   │   │   ├── updateAdminByIdService.js
│   │   │   └── updateAdminPassByIdService.js
│   │   ├── booksCrud
│   │   │   ├── deleteBookByIdService.js
│   │   │   ├── getBookByIdService.js
│   │   │   ├── getBookByQueryService.js
│   │   │   ├── postNewBookService.js
│   │   │   └── updateBookByIdService.js
│   │   └── users
│   │       ├── userLoginService.js
│   │       └── userProtectService.js
│   ├── tests
│   │   ├── fixtures
│   │   │   ├── test-image-2.jpg
│   │   │   └── test-image.jpg
│   │   ├── helper
│   │   │   ├── testConfig.js
│   │   │   └── userLoginAuth.js
│   │   └── integration
│   │       ├── admin.integration.test.js
│   │       └── books.integration.test.js
│   └── uploads
│       ├── bookImage-1782543274302-423615845.jpg
│       ├── bookImage-1782543405236-218759939.png
│       ├── bookImage-1782545292217-399550674.jpg
│       ├── bookImage-1782545338991-483401636.webp
│       ├── bookImage-1782545417107-788165050.png
│       ├── bookImage-1782630024616-982291270.jpg
│       ├── bookImage-1782668862246-873750835.jpg
│       ├── bookImage-1782668878760-922996115.png
│       ├── bookImage-1782669460679-436873813.jpeg
│       ├── bookImage-1782715876968-159906848.png
│       ├── bookImage-1782716008776-901355553.png
│       ├── bookImage-1782716731958-292944701.png
│       └── bookImage-1782717957978-364093932.png
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── index.html
│   │   └── lixystoreblue-logo.png
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
│   │   │   │   ├── BookFormFields.jsx
│   │   │   │   ├── BookImagePicker.jsx
│   │   │   │   └── EditBook
│   │   │   │       └── EditBookForm.jsx
│   │   │   ├── Books
│   │   │   │   ├── BookCard.jsx
│   │   │   │   ├── BookCover.jsx
│   │   │   │   ├── BookRow.jsx
│   │   │   │   ├── BooksGrid.jsx
│   │   │   │   ├── BooksTable.jsx
│   │   │   │   └── SearchBookForm.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Home
│   │   │   │   ├── BookCarousel.jsx
│   │   │   │   ├── CategorySidebar.jsx
│   │   │   │   ├── GenreBar.jsx
│   │   │   │   ├── HeroBanner.jsx
│   │   │   │   └── PromoBanner.jsx
│   │   │   ├── Login
│   │   │   │   └── LoginForm.jsx
│   │   │   ├── SearchBookForm.jsx
│   │   │   └── Shared
│   │   │       ├── Card.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       ├── FeedbackMessage.jsx
│   │   │       ├── Loading.jsx
│   │   │       ├── PageShell.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       ├── SearchPanel.jsx
│   │   │       └── SectionTitle.jsx
│   │   ├── context
│   │   │   └── ThemeContext.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── AddBookPage.jsx
│   │   │   │   ├── AdminBooksPage.jsx
│   │   │   │   └── EditBookPage.jsx
│   │   │   ├── BookDetailPage.jsx
│   │   │   ├── BooksPage.jsx
│   │   │   ├── BooksSearchPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── HomePage.jsx
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

38 directories, 115 files
