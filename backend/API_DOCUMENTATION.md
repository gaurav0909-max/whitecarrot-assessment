# ATS Careers API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### Health Check

**GET** `/health`

Response:
```json
{
  "status": "ok"
}
```

---

## Authentication Endpoints

### Register

**POST** `/auth/register`

Request:
```json
{
  "email": "recruiter@company.com",
  "password": "password123",
  "companyName": "TechCorp Inc",
  "companySlug": "techcorp"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "companySlug": "techcorp",
  "user": {
    "id": 1,
    "email": "recruiter@company.com"
  }
}
```

### Login

**POST** `/auth/login`

Request:
```json
{
  "email": "recruiter@company.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "companySlug": "techcorp",
  "user": {
    "id": 1,
    "email": "recruiter@company.com"
  }
}
```

---

## Company Endpoints

### Get Company by Slug

**GET** `/companies/:slug`

Example: `GET /companies/techcorp`

Response:
```json
{
  "id": 1,
  "slug": "techcorp",
  "name": "TechCorp Inc",
  "description": "We build amazing products",
  "logo_url": "https://...",
  "banner_url": "https://...",
  "theme": {
    "primary_color": "#3B82F6",
    "secondary_color": "#1F2937"
  },
  "is_published": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Update Company

**PUT** `/companies/:slug` 🔒 Protected

Request:
```json
{
  "name": "TechCorp Inc",
  "description": "Updated description",
  "logo_url": "https://example.com/logo.png",
  "banner_url": "https://example.com/banner.png",
  "theme": {
    "primary_color": "#3B82F6",
    "secondary_color": "#1F2937"
  }
}
```

Response: Updated company object

---

## Job Endpoints

### List Jobs

**GET** `/companies/:slug/jobs`

Query Parameters:
- `location` (optional) - Filter by location
- `job_type` (optional) - Filter by job type

Examples:
- `GET /companies/techcorp/jobs`
- `GET /companies/techcorp/jobs?location=Berlin,%20Germany`
- `GET /companies/techcorp/jobs?job_type=Full%20time`
- `GET /companies/techcorp/jobs?location=Remote&job_type=Full%20time`

Response:
```json
[
  {
    "id": 1,
    "company_id": 1,
    "title": "Senior Full Stack Engineer",
    "slug": "senior-full-stack-engineer",
    "description": "We are looking for...",
    "work_policy": "Hybrid",
    "location": "Berlin, Germany",
    "department": "Engineering",
    "employment_type": "Full time",
    "experience_level": "Senior",
    "job_type": "Permanent",
    "salary_range": "€80,000 - €120,000",
    "is_active": true,
    "posted_at": "2024-01-01T00:00:00.000Z",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create Job

**POST** `/companies/:slug/jobs` 🔒 Protected

Request:
```json
{
  "title": "Frontend Developer",
  "description": "Join our team...",
  "work_policy": "Remote",
  "location": "Remote",
  "department": "Engineering",
  "employment_type": "Full time",
  "experience_level": "Mid-level",
  "job_type": "Permanent",
  "salary_range": "$90,000 - $130,000"
}
```

Response: Created job object

### Update Job

**PUT** `/companies/:slug/jobs/:id` 🔒 Protected

Request:
```json
{
  "title": "Updated Job Title",
  "description": "Updated description",
  "location": "New York, NY",
  "job_type": "Full time",
  "work_policy": "Hybrid"
}
```

Response: Updated job object

### Delete Job

**DELETE** `/companies/:slug/jobs/:id` 🔒 Protected

Response:
```json
{
  "message": "Job deleted"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Email already registered"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Company not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch jobs"
}
```

---

## Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","companyName":"Test Co","companySlug":"testco"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get company (after seeding)
curl http://localhost:3000/api/companies/techcorp

# List jobs (after seeding)
curl http://localhost:3000/api/companies/techcorp/jobs

# List jobs with filters
curl "http://localhost:3000/api/companies/techcorp/jobs?location=Remote&job_type=Full%20time"

# Create job (replace YOUR_TOKEN)
curl -X POST http://localhost:3000/api/companies/techcorp/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"New Job","description":"Description here","location":"Remote","job_type":"Full time","work_policy":"Remote","department":"Engineering","employment_type":"Full time","experience_level":"Mid-level","salary_range":"$100k"}'
```

---

## Setup & Testing Steps

1. **Create .env file:**
```bash
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_random_secret_key
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001
```

2. **Run migrations:**
```bash
# Using psql
psql $DATABASE_URL -f migrations/001_init.sql
```

3. **Seed database:**
```bash
cd backend
node src/utils/seedData.js
```

4. **Start server:**
```bash
npm start
```

5. **Test endpoints:**
- Use the curl commands above
- Use Postman/Insomnia
- Use VS Code REST Client (see test.http file)

---

## Notes

- All protected routes check that the authenticated user owns the company
- Job slugs are auto-generated from titles
- JWT tokens expire after 7 days
- Passwords are hashed with bcrypt (10 rounds)
