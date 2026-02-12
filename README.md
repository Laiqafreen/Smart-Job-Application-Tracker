# Smart Job Application Tracker (MERN)

A simple, beginner-friendly but production-style MERN stack application that helps students track their job applications.

## 1. Folder structure

```text
smart job tracker/
  backend/
    config/
      db.js
    controllers/
      authController.js
      jobController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      User.js
      Job.js
    routes/
      authRoutes.js
      jobRoutes.js
    seeder/
      seed.js
    .env.example
    package.json
    server.js

  frontend/
    public/ (optional, not used by default)
    .env.example
    index.html
    package.json
    vite.config.js
    src/
      App.jsx
      main.jsx
      styles.css
      context/
        AuthContext.jsx
      services/
        api.js
      components/
        Navbar.jsx
        ProtectedRoute.jsx
        JobForm.jsx
        JobList.jsx
        DashboardCards.jsx
      pages/
        LoginPage.jsx
        SignupPage.jsx
        DashboardPage.jsx
        JobFormPage.jsx
```

## 2. Backend setup

### 2.1. Install dependencies

From the project root:

```bash
cd backend
npm install
```

### 2.2. Environment variables

Create a `.env` file inside the `backend` folder by copying the example:

```bash
cd backend
cp .env.example .env   # On Windows PowerShell: copy .env.example .env
```

Then edit `.env` and set:

- **MONGO_URI**: your MongoDB connection string (local or Atlas)
- **PORT**: backend port (default 5000)
- **JWT_SECRET**: long random string for signing tokens

### 2.3. Seed sample data (optional)

To insert a sample user and some job applications:

```bash
cd backend
npm run seed
```

The sample user will be:

- **Email**: `student@example.com`
- **Password**: `password123`

### 2.4. Run backend server

```bash
cd backend
npm run dev   # uses nodemon
```

The API will run at `http://localhost:5000`.

## 3. Frontend setup

### 3.1. Install dependencies

```bash
cd ../frontend
npm install
```

### 3.2. Environment variables

Copy the example:

```bash
cd frontend
cp .env.example .env   # On Windows PowerShell: copy .env.example .env
```

By default:

- `VITE_API_BASE_URL=http://localhost:5000/api`

Change this if your backend runs elsewhere.

### 3.3. Run frontend dev server

```bash
cd frontend
npm run dev
```

Open the shown URL (usually `http://localhost:5173`).

## 4. Using the app locally

1. **Start MongoDB** (local instance or ensure your Atlas cluster is reachable).
2. **Run backend** (`npm run dev` inside `backend`).
3. **Run frontend** (`npm run dev` inside `frontend`).
4. Visit the frontend URL, then:
   - Sign up as a new user **or**
   - Use the seeded user (`student@example.com` / `password123` if you ran `npm run seed`).
5. After logging in you can:
   - Create, edit, and delete job applications.
   - See a dashboard with total applications and counts per status.

## 5. Backend API overview

- **Auth**
  - `POST /api/auth/signup` – register a new user.
  - `POST /api/auth/login` – login and receive a JWT.
- **Jobs** (all require `Authorization: Bearer <token>`)
  - `GET /api/jobs` – list all jobs for current user.
  - `POST /api/jobs` – create a new job.
  - `PUT /api/jobs/:id` – update existing job.
  - `DELETE /api/jobs/:id` – delete job.
  - `GET /api/jobs/stats/summary` – dashboard stats (total and per status).

## 6. Frontend architecture overview

- **AuthContext** (`src/context/AuthContext.jsx`)
  - Stores `user` and `token`, syncs them with `localStorage`.
  - Provides `login`, `logout`, and `isAuthenticated`.
- **ProtectedRoute** (`src/components/ProtectedRoute.jsx`)
  - Wraps routes that should only be visible to logged-in users.
- **Pages**
  - `LoginPage` – login form.
  - `SignupPage` – registration form.
  - `DashboardPage` – stats + job list with edit/delete.
  - `JobFormPage` – add/edit job using `JobForm` component.
- **API Service** (`src/services/api.js`)
  - Axios instance with base URL and JWT interceptor.
  - Small helper functions to call backend routes.

## 7. Notes for beginners

- **Environment variables**:
  - Backend uses `dotenv` with `.env` at `backend/.env`.
  - Frontend uses Vite, so env variables must start with `VITE_`.
- **Security tips for real projects**:
  - Never commit real secrets to Git.
  - Use HTTPS in production.
  - Use stronger password policies and rate limiting for auth.

