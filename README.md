# JobConnect — MCA Mini Project

JobConnect is a medium-level job portal built with Node.js, Express.js, MongoDB, Mongoose, HTML, CSS and browser JavaScript.

## Features

- Job seeker and recruiter registration/login
- Password hashing with bcrypt
- JWT-protected APIs and role-based authorization
- Recruiters can create, update and delete their own job listings
- Public job search by title, company, skills and location
- Job seekers can apply once per job
- Candidates can view their application status
- Recruiters can view applicants for their own jobs and update status
- Responsive frontend dashboard

## Requirements

- Node.js LTS (includes npm)
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code

## Setup in VS Code

1. Extract the ZIP file.
2. Open the `jobconnect-mca-project` folder in VS Code.
3. Open the VS Code terminal: **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Copy `.env.example` to a new file named `.env` in the same project root folder.
   - In VS Code Explorer, right-click `.env.example` → Copy, then right-click the project folder → Paste.
   - Rename the copy to `.env` (make sure it is not `.env.txt`).
6. Open `.env` and set values:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/jobconnect
   JWT_SECRET=replace_this_with_a_long_random_secret
   ```

   If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string. Keep `.env` private.
7. Start MongoDB Community Server if you are using a local database.
8. Start the app:

   ```bash
   npm run dev
   ```

   Or use `npm start` for normal mode.
9. Open **http://localhost:5000** in your browser.

## First test

1. Register a user with account type **Recruiter**.
2. Use the recruiter account to post a job.
3. Register a second account with account type **Job seeker**. Use a different email address.
4. Find the job and click **Apply now**.
5. Log in as the recruiter and open Dashboard to see the applicant and update the status.
6. Log back in as the job seeker to see the updated status.

## Folder structure

```text
jobconnect-mca-project/
├── middleware/
│   └── auth.js
├── models/
│   ├── Application.js
│   ├── Job.js
│   └── User.js
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── routes/
│   ├── applications.js
│   ├── auth.js
│   └── jobs.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Database schema

MongoDB creates the database and collections when the first records are inserted.

### users

- `_id`: ObjectId, primary document identifier
- `name`: String
- `email`: String, unique
- `password`: String (bcrypt hash, never plain text)
- `role`: `jobseeker` or `recruiter`
- `skills`: Array of strings
- `createdAt`: Date

### jobs

- `_id`: ObjectId
- `title`: String
- `company`: String
- `location`: String
- `jobType`: Full-time, Part-time, Internship, or Contract
- `salary`: String
- `description`: String
- `skills`: Array of strings
- `createdBy`: ObjectId reference to `users`
- `createdAt`: Date

### applications

- `_id`: ObjectId
- `job`: ObjectId reference to `jobs`
- `applicant`: ObjectId reference to `users`
- `coverLetter`: String
- `status`: Pending, Shortlisted, or Rejected
- `appliedAt`: Date
- Unique compound index on `job` + `applicant` prevents duplicate applications

## REST API summary

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/me` | Logged-in user | Current profile |
| GET | `/api/jobs` | Public | List/search jobs |
| GET | `/api/jobs/:id` | Public | Get one job |
| POST | `/api/jobs` | Recruiter | Create job |
| PUT | `/api/jobs/:id` | Owner recruiter | Update job |
| DELETE | `/api/jobs/:id` | Owner recruiter | Delete job |
| POST | `/api/applications` | Job seeker | Apply to a job |
| GET | `/api/applications/mine` | Logged-in user | Own applications or applicants for recruiter's jobs |
| PATCH | `/api/applications/:id/status` | Owner recruiter | Update application status |
| GET | `/api/health` | Public | API health check |

For protected routes, the frontend sends `Authorization: Bearer <token>`.

## MongoDB checks

In `mongosh`, run:

```javascript
show dbs
use jobconnect
show collections
db.users.find({}, { name: 1, email: 1, role: 1 })
db.jobs.find()
db.applications.find()
```

## Important notes

- This is an educational mini project. Before public deployment, add stronger validation, rate limiting, secure production secrets, HTTPS, logging, and a more robust token/session strategy.
- JWT is stored in browser local storage for simplicity in this demo. For a production application, evaluate secure, HttpOnly cookie-based authentication and CSRF protections.
- Never upload `.env` or real passwords to GitHub.
