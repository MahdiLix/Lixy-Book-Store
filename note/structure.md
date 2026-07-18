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
│   │       ├── getUserById.js
│   │       ├── registerNewUser.js
│   │       ├── updateUserById.js
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
│   │   ├── bookRouter.js
│   │   └── userRouter.js
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
│   │       ├── getUserByIdService.js
│   │       ├── registerNewUserService.js
│   │       ├── updateUesrByIdService.js
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
│       ├── bookImage-1783919469896-747222574.jpg
│       ├── bookImage-1783919495872-138255262.png
│       ├── bookImage-1783919530557-122105064.jpg
│       ├── bookImage-1783920341019-188531643.png
│       ├── bookImage-1783921281291-511596868.png
│       ├── bookImage-1783921325693-928966312.png
│       ├── bookImage-1783921349754-105703289.webp
│       ├── bookImage-1783963767225-139373595.webp
│       ├── bookImage-1783970224305-840505984.png
│       ├── bookImage-1784006932797-447432655.png
│       ├── bookImage-1784007095065-94865716.webp
│       ├── bookImage-1784007308759-383642082.jpg
│       ├── bookImage-1784010468955-491473917.jpg
│       ├── bookImage-1784010565514-412711199.png
│       ├── bookImage-1784011270125-468632029.webp
│       ├── bookImage-1784011515398-424238854.jpg
│       ├── bookImage-1784011893757-441039136.webp
│       ├── bookImage-1784038063011-483755848.webp
│       ├── bookImage-1784041905810-643358883.png
│       ├── bookImage-1784041947540-499589961.webp
│       ├── bookImage-1784122176162-137517784.png
│       ├── bookImage-1784124398120-358764039.png
│       ├── bookImage-1784198758064-654288316.png
│       ├── bookImage-1784272613003-599697591.jpg
│       ├── bookImage-1784287708301-309572452.png
│       └── bookImage-1784307023949-592496070.png
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
│   │   │   └── images
│   │   │       └── promo_banner_1.png
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
│   │   │   │   ├── PriceTag.jsx
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
│   │   ├── constants
│   │   │   └── genres.js
│   │   ├── context
│   │   │   ├── CartContext.jsx
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

40 directories, 139 files
