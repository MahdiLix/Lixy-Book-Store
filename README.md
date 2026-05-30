# Lixy Book Store

Lixy Book Store is a full-stack book management app built with **React**, **Express.js**, **MongoDB**, **JWT**, **Tailwind CSS**, **Docker**, and **Docker Compose**.

The app includes a public book catalog, authentication, and admin features for managing books and admins.

## Features

* Public book listing page
* Smart search by **title**, **author**, or **genre**
* Add, edit, and remove books for admins
* JWT authentication
* Two roles:

  * **Super Admin**
  * **Admin**
* Super admin can create admins
* Dark mode and light mode
* Modern UI with Tailwind CSS
* Dockerized development setup

## Project Structure

```bash
backend/
frontend/
docker-compose.yml
.env
.git/
.gitignore
README.md
```

## Tech Stack

### Backend

* Express.js
* MongoDB + Mongoose
* JWT for authentication
* bcrypt for password hashing
* nodemon for development

### Frontend

* React.js
* Tailwind CSS v3
* React Router
* Modern modal / popup UI for add, edit, and delete actions

### DevOps

* Docker
* Docker Compose

## Before You Start

Read these files first:

* `env.md` → for environment variables and `.env` setup
* `superadmin.md` → for super admin credentials and seed instructions

## Docker Requirements

You need:

* Docker
* Docker Compose

## you can install docker for linux or windows
 
### Install Docker on Arch Linux

```bash
sudo pacman -S docker docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
```

Then log out and log back in.

### Install Docker on Windows

1. Download and install **Docker Desktop for Windows**.
2. During installation, enable **Use WSL 2 based engine** if it is shown.
3. After installation, start Docker Desktop.
4. Open PowerShell or Command Prompt and check it with:

```powershell
docker --version
docker compose version
docker ps
```

If Docker Desktop starts correctly and `docker ps` works, Docker is ready.

### Check Installation

```bash
docker --version
docker compose version
docker ps
```

If `docker ps` works without `sudo`, Docker is ready.

## Setup

### 1) Create the `.env` file

Read `env.md` and create a `.env` file in the root of the project.

Example:

```env
PORT=5000
HOST=0.0.0.0
MONGO_URI=mongodb://mongo:27017/bookLibrary
JWT_SECRET=your_secret_key
```

### 2) Start the app with Docker Compose

From the project root run:

```bash
docker compose up --build
```

Or run in background:

```bash
docker compose up -d --build
```

### 3) Check that everything started successfully

```bash
docker compose ps
docker compose logs -f
```

If you want to check one service only:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

## Create Super Admin

To create the first super admin, run the seed script inside the backend container:

```bash
docker compose exec backend npm run seed
```

This creates the single super admin used to manage admins.

### Super Admin Login

Open this address in your browser:

```text
http://localhost:3000/login
```

Use these credentials from `superadmin.md`:

* **Email:** `super@admin.gmail.com`
* **Password:** `SuperAdminSecret12345`

## Open the App

### Public Book Page

Open:

```text
http://localhost:3000/books
```

### Login Page

Open:

```text
http://localhost:3000/login
```

## What Admins Can Do

Admins can:

* add new books
* search books in the dashboard
* edit books
* remove books

The app also supports modal / popup UI for better book management.

## Notes

* Use Docker Compose to run the full app.
* MongoDB runs inside Docker.
* Backend connects to MongoDB using the Docker service name `mongo`.
* Frontend runs on port `3000`.
* Backend runs on port `5000`.

## Useful Commands

Stop the app:

```bash
docker compose down
```

Stop the app and remove volumes:

```bash
docker compose down -v
```

Restart one service:

```bash
docker compose restart backend
```

Rebuild after code changes:

```bash
docker compose up --build
```

 