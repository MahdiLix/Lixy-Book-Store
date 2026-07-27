# Lixy Book Store

Lixy Book Store is a full-stack book management application built with React on the frontend and Express.js, MongoDB, JWT, and Docker on the backend. It supports public browsing, role-based authentication, book management, user management, admin management, shopping cart access, and responsive book discovery pages.

## Project Overview

The app is organized as a monorepo with two main parts:

- `backend/` for the API, authentication, database access, uploads, tests, and seeding
- `frontend/` for the React UI, pages, shared components, routing, and client-side state

The current structure includes:

- role-based routes for public users, admins, and superadmins
- book search, category and genre browsing, and book detail pages
- user profile and account update flows
- admin pages for managing books, users, and admins
- integration tests for books, users, and admins
- Docker support for local development

## Features

### Public app experience

- Hero banner that always highlights 3 top books
- Promo banner with rotating ad slides
- Header search for books by title, author, or genre
- Genre selection from the top navigation area
- Search page that redirects to `/search` after a query is entered
- Book carousel with topics such as `top_genre`, `must_top`, and `must_offer`
- Books pages where users can view details, add books to cart, and continue to shopping
- Footer with your social media links

### Account and role features

- User profile dropdown in the header
- Access to shopping cart, my profile, and update account
- Admin and superadmin shortcuts from the dropdown for managing books, users, and admins
- Role-based access control for public users, admins, and superadmins
- JWT-based login and authenticated requests

### Discount and expiry behavior

- Admins and superadmins can set discount prices and expiration times
- The app calculates when discounts expire and reflects that in the UI and book data

## Roles and Permissions

### Superadmin

- Can manage all books
- Can add, update, and remove books
- Can add admins and users
- Can change admin and user details
- Can change user roles
- Can manage all users and grant the admin role to regular users
- Cannot change passwords directly, because passwords are hashed

### Admin

- Can manage books
- Can add, update, and remove books
- Can add new users
- Can manage users and change user details
- Cannot change passwords or roles

### Regular user

- Can log in to the app
- Can visit and update their own account information

## Tech Stack

### Backend

- Express.js
- MongoDB + Mongoose
- JWT
- bcrypt
- multer
- Jest
- Supertest

### Frontend

- React
- Tailwind CSS v3
- React Router
- react-scripts
- lucide-react
- react-icons

### DevOps and tooling

- Docker
- Docker Compose
- Nodemon
- PostCSS and Autoprefixer

## Project Structure

```bash
.
├── backend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── seed
│   │   └── superadmin.seed.js
│   ├── src
│   │   ├── app.js
│   │   ├── config
│   │   │   └── database.js
│   │   ├── middlewares
│   │   │   ├── error.js
│   │   │   └── uploads
│   │   │       ├── deleteUpload.js
│   │   │       └── upload.js
│   │   ├── models
│   │   │   ├── Book.js
│   │   │   └── User.js
│   │   ├── modules
│   │   │   ├── admins
│   │   │   │   ├── admin.routes.js
│   │   │   │   ├── controllers
│   │   │   │   └── services
│   │   │   ├── auth
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.middleware.js
│   │   │   │   └── auth.service.js
│   │   │   ├── books
│   │   │   │   ├── book.routes.js
│   │   │   │   ├── controllers
│   │   │   │   └── services
│   │   │   └── users
│   │   │       ├── controllers
│   │   │       ├── services
│   │   │       └── user.routes.js
│   │   ├── server.js
│   │   └── uploads
│   └── tests
│       ├── fixtures
│       ├── helpers
│       └── integration
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── App.jsx
│   │   ├── assets
│   │   ├── components
│   │   ├── constants
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   ├── styles
│   │   └── utils
│   └── tailwind.config.js
├── docker-compose.yml
├── README.md
└── structure.md
```

## Before You Start

Make sure you have the following installed:

- Docker and Docker Compose for the easiest setup
- Node.js and npm if you plan to run the backend or frontend outside Docker

## Docker Requirements

### Install Docker on Linux

On most Linux distributions, install Docker Engine and Docker Compose from the official Docker packages for your distribution. After installation, make sure Docker is running and your user can run Docker commands without `sudo`.

Verify the installation with:

```bash
docker --version
docker compose version
docker ps
```

### Install Docker on Windows

Install Docker Desktop for Windows and make sure WSL 2 is enabled when Docker Desktop asks for it. After installation, open PowerShell or Command Prompt and verify Docker with:

```bash
docker --version
docker compose version
docker ps
```

## Environment Files

### Backend: `backend/.env.docker`

```env
HOST=0.0.0.0
PORT=5000
MONGO_URI=mongodb://mongo:27017/lixyBookStore
JWT_SECRET_KEY=<Strong-Secret-Key>
EXPIRES_IN=30d
TEST_SUPERADMIN_EMAIL=super@admin.gmail.com
TEST_SUPERADMIN_PASSWORD=SuperAdminSecret12345
UPLOAD_ROOT=/app/src/uploads
```

### Backend: `backend/.env`

```env
HOST=0.0.0.0
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lixyBookStore
JWT_SECRET_KEY=<Strong-Secret-Key>
EXPIRES_IN=30d
TEST_SUPERADMIN_EMAIL=super@admin.gmail.com
TEST_SUPERADMIN_PASSWORD=SuperAdminSecret12345
UPLOAD_ROOT=/home/.../book-library-mongoose/backend/src/uploads
```

### Frontend: `frontend/.env.docker`

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

### Frontend: `frontend/.env`

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

## Setup

### 1) Clone the repository

```bash
git clone https://github.com/MahdiLix/Lixy-Book-Store.git
cd Lixy-Book-Store
```

### 2) Create the environment files

Create the four environment files in the exact locations shown above:

- `backend/.env.docker`
- `backend/.env`
- `frontend/.env.docker`
- `frontend/.env`

Use the values from the environment file examples in this README.

### 3) Start the app with Docker Compose

From the project root, run:

```bash
docker compose up --build
```

To run in the background:

```bash
docker compose up -d --build
```

This starts:

- MongoDB on port `27017`
- Backend on port `5000`
- Frontend on port `3000`

### 4) Check the containers

```bash
docker compose ps
docker compose logs -f
```

To inspect one service only:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

## Create Super Admin

After the containers are running, seed the first superadmin from the backend container:

```bash
docker compose exec backend npm run seed
```

Use the credentials from the backend environment file:

- Email: `super@admin.gmail.com`
- Password: `SuperAdminSecret12345`

## Open the App

- Frontend: `http://localhost:3000`
- Login page: `http://localhost:3000/login`
- Public books page: `http://localhost:3000/books`
- Search results: `http://localhost:3000/search`

## What Admins Can Do

Admins can:

- add new books
- update books
- remove books
- search books in the dashboard
- add new users
- manage users and edit user details

Superadmins can do everything admins can do, plus manage admins and change user roles.

## Notes

- MongoDB runs inside Docker by default
- The backend connects to MongoDB using the Docker service name `mongo`
- The frontend runs on port `3000`
- The backend runs on port `5000`
- Uploaded book images are stored inside the backend upload directory
- Passwords are hashed, so password changes must go through the account or auth flows, not direct database edits

## Useful Commands

### Docker

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose down -v
docker compose restart backend
docker compose restart frontend
```

### Backend

```bash
cd backend
npm install
npm run dev
npm start
npm test
npm run seed
```

### Frontend

```bash
cd frontend
npm install
npm start
npm run build
```
