# ATS Careers Page Builder - Implementation Plan

## Project Overview

Build a multi-tenant ATS Careers Page Builder where recruiters create branded careers pages and candidates browse jobs.

**Timeline:** 1-2 days
**Tech Stack:** React + Node/Express + PostgreSQL

---

## Core Requirements

### What Recruiters Can Do
- Register/login with email and password
- Customize company branding (logo, banner, colors)
- Add/edit/delete job postings
- Live preview while editing (split-screen, instant feedback!)
- Publish/unpublish careers page
- Each company's data is isolated (multi-tenant)

### What Candidates Can Do
- Visit public careers page (branded)
- Browse job listings
- Filter by Location and Job Type
- Search by Job Title
- Mobile-friendly experience

### Pages to Build
- `/login` - Authentication page
- `/:company-slug/edit` - **Split-screen editor** (forms left, live preview right)
- `/:company-slug/careers` - Public careers page

### Sample Data
- Google Sheets with ~100 jobs: https://docs.google.com/spreadsheets/d/16HRj1fHXuq10AxU-RtC6Qd1KBODsqvO4J4v3i1qGcD0/edit

### Deliverables
1. GitHub repo with working code
2. Live deployment (Vercel + Render + Neon)
3. Tech Spec.md (manual - don't use AI)
4. README.md (manual - don't use AI)
5. AGENT_LOG.md (manual - don't use AI)
6. Demo video (≤5 min)

---

## Tech Stack

### Backend
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **Auth:** JWT + bcrypt
- **Packages:** pg, jsonwebtoken, bcrypt, express-validator, cors, dotenv

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Routing:** Next.js built-in (file-based routing)
- **State Management:** React Query + Context
- **Forms:** React Hook Form
- **SEO:** Built-in server-side rendering (SSR)
- **Packages:** axios, @tanstack/react-query, react-hook-form, react-hot-toast, react-color

### Deployment
- **Database:** Neon (PostgreSQL free tier)
- **Backend:** Render (free tier)
- **Frontend:** Vercel (free tier)

---

## Database Schema

```sql
-- Companies table (one per recruiter account)
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,        -- URL: /acme-corp/careers
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  banner_url VARCHAR(500),
  theme JSONB DEFAULT '{"primary_color": "#3B82F6", "secondary_color": "#1F2937"}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table (recruiters only)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  work_policy VARCHAR(50),              -- Remote/Hybrid/On-site
  location VARCHAR(255),
  department VARCHAR(100),
  employment_type VARCHAR(50),          -- Full time/Part time
  experience_level VARCHAR(50),         -- Junior/Mid/Senior
  job_type VARCHAR(50),                 -- Permanent/Temporary
  salary_range VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  posted_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(company_id, slug)
);

-- Indexes for performance
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
```

---

## Backend Structure

### API Routes

```
Auth:
  POST   /api/auth/register        - Create account + company
  POST   /api/auth/login           - Get JWT token

Company:
  GET    /api/companies/:slug            - Get company info
  PUT    /api/companies/:slug            - Update company info
  PUT    /api/companies/:slug/theme      - Update branding theme
  PUT    /api/companies/:slug/publish    - Toggle published status

Jobs:
  GET    /api/companies/:slug/jobs       - List jobs (public or auth)
  POST   /api/companies/:slug/jobs       - Create job (auth)
  PUT    /api/companies/:slug/jobs/:id   - Update job (auth)
  DELETE /api/companies/:slug/jobs/:id   - Delete job (auth)

Dev:
  POST   /api/seed                       - Seed database with sample data
```

### Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js           # PostgreSQL connection
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── company.routes.js
│   │   └── job.routes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── companyController.js
│   │   └── jobController.js
│   ├── models/
│   │   ├── Company.js            # SQL queries for companies
│   │   ├── User.js               # SQL queries for users
│   │   └── Job.js                # SQL queries for jobs
│   ├── utils/
│   │   └── seedData.js           # Convert spreadsheet to SQL
│   └── server.js                 # Express app entry
├── migrations/
│   └── 001_init.sql              # Database schema
├── .env.example
└── package.json
```

---

## Frontend Structure (Next.js)

```
frontend/
├── app/
│   ├── layout.js                       # Root layout with providers
│   ├── login/
│   │   └── page.js                     # Auth page
│   ├── [slug]/
│   │   ├── careers/
│   │   │   └── page.js                 # Public careers (SSR + SEO)
│   │   └── edit/
│   │       └── page.js                 # Split-screen editor
│   └── api/                            # Optional API routes
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   ├── editor/
│   │   ├── EditorLayout.jsx            # Split-screen container
│   │   ├── EditorSidebar.jsx           # Left: Forms panel
│   │   ├── LivePreview.jsx             # Right: Real-time preview
│   │   ├── BrandingTab.jsx             # Logo, colors, banner forms
│   │   ├── CompanyTab.jsx              # Name, description forms
│   │   ├── JobsTab.jsx                 # Jobs table + add/edit
│   │   └── JobForm.jsx                 # Add/Edit job modal
│   └── careers/
│       ├── CareerPageHeader.jsx        # Hero with branding
│       ├── CompanyOverview.jsx         # About company section
│       ├── JobCard.jsx                 # Single job card
│       ├── JobFilters.jsx              # Search + filters
│       └── JobGrid.jsx                 # Jobs grid/list
├── lib/
│   ├── api.js                          # Axios instance + API calls
│   ├── auth.js                         # Auth context
│   └── theme.js                        # Apply dynamic colors
└── package.json
```

---

## SEO Implementation with Next.js

### Why Next.js Solves the SEO Problem

**The Issue:** SPAs (like Vite/React) render on the client, so crawlers see empty HTML initially.

**The Solution:** Next.js provides server-side rendering (SSR) - each page is rendered on the server with full content and meta tags before being sent to the browser.

### Dynamic Meta Tags Per Company

```javascript
// app/[slug]/careers/page.js

// Server Component - runs on server, perfect for SEO
export async function generateMetadata({ params }) {
  // Fetch company data on server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${params.slug}`);
  const company = await res.json();

  return {
    title: `Careers at ${company.name} | ${company.name} Jobs`,
    description: company.description || `Join ${company.name}. Explore open positions and start your career with us.`,
    openGraph: {
      title: `Join ${company.name}`,
      description: company.description,
      images: [company.banner_url],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Careers at ${company.name}`,
      description: company.description,
      images: [company.banner_url],
    },
  };
}

// Server Component for the page
export default async function CareersPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${params.slug}`);
  const company = await res.json();

  const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${params.slug}/jobs`);
  const jobs = await jobsRes.json();

  return (
    <div>
      {/* Render company and jobs - fully rendered on server */}
      <CareerPageHeader company={company} />
      <JobGrid jobs={jobs} />
    </div>
  );
}
```

### Structured Data for Jobs (Google Jobs Integration)

```javascript
// Add JSON-LD structured data for each job
export default async function CareersPage({ params }) {
  const jobs = await fetchJobs(params.slug);
  const company = await fetchCompany(params.slug);

  const structuredData = jobs.map(job => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.posted_at,
    "hiringOrganization": {
      "@type": "Organization",
      "name": company.name,
      "logo": company.logo_url
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location
      }
    },
    "employmentType": job.employment_type
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Rest of page */}
    </>
  );
}
```

### Benefits of Next.js SSR

✅ **Crawlers see full HTML** - No JavaScript execution needed
✅ **Instant meta tags** - Social media previews work perfectly
✅ **Google Jobs indexing** - Structured data parsed correctly
✅ **Fast load times** - Content visible immediately
✅ **SEO-ready out of the box** - No additional libraries needed

---

## Split-Screen Live Preview (The "Wow" Factor)

### Why Split-Screen Instead of Separate Preview Page

**Bad UX (separate preview page):**
- User edits → clicks "Preview" → waits for load → sees result → goes back → edits again
- Slow feedback loop
- Feels clunky

**Good UX (split-screen live preview):**
- User edits → sees changes instantly on the right side
- Zero navigation, zero waiting
- Feels modern and professional (like Webflow, Framer, Notion)

### Implementation Architecture

```javascript
// app/[slug]/edit/page.js

'use client';

export default function EditPage() {
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('branding'); // branding | company | jobs

  return (
    <div className="flex h-screen">
      {/* Left Side: Editor */}
      <div className="w-1/2 overflow-y-auto border-r">
        <EditorSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'branding' && (
          <BrandingTab
            company={company}
            onChange={(updates) => setCompany({ ...company, ...updates })}
          />
        )}

        {activeTab === 'company' && (
          <CompanyTab
            company={company}
            onChange={(updates) => setCompany({ ...company, ...updates })}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsTab
            jobs={jobs}
            onJobsChange={setJobs}
          />
        )}

        <PublishButton company={company} />
      </div>

      {/* Right Side: Live Preview */}
      <div className="w-1/2 overflow-y-auto bg-gray-50">
        <div className="sticky top-0 bg-white border-b px-4 py-2 text-sm text-gray-500">
          Live Preview
        </div>
        <LivePreview company={company} jobs={jobs} />
      </div>
    </div>
  );
}
```

### Key Benefits

✅ **Instant feedback** - Changes reflect immediately (no save button for preview)
✅ **Better UX** - No page navigation required
✅ **Looks professional** - Shows senior-level product thinking
✅ **Easier to implement** - One page instead of two
✅ **"Wow" factor** - Impresses assessors

### Implementation Notes

- Use React state to hold unsaved changes
- LivePreview component renders the same CareerPageHeader/JobGrid components used on public page
- "Publish" button saves to backend and updates `is_published` flag
- Changes in editor update state → triggers re-render in preview panel
- Mobile responsive: Stack vertically on small screens

---

## Implementation Timeline (2 Days)

### Day 1 - Backend + Public Page (10 hours)

**Hours 0-1: Backend Setup**
- Initialize Express project
- Setup PostgreSQL connection (Neon)
- Create database migrations
- Environment config (.env)

**Hours 1-2: Seed Data**
- Fetch jobs from Google Sheets
- Create seed script
- Populate database with ~100 jobs

**Hours 2-3: Authentication (Simplified - 1 hour saved!)**
- Backend: Simple register/login (see Critical Notes section)
- JWT with 7 day expiry (no refresh tokens)
- Auth middleware (ONE function)
- Frontend: Login page + localStorage
- **Skip:** Password reset, email verification, refresh tokens

**Hours 3-6: Public Careers Page (Next.js + SEO)**
- Frontend: Setup Next.js with App Router
- Backend: GET company + jobs with filters
- Careers page with SSR (server-side rendering)
- Dynamic meta tags per company (SEO!)
- Job listings component
- Search by title (client-side)
- Filter by location, job type
- Mobile responsive design

**Hours 6-8: Company Editor Setup**
- Backend: PUT company routes
- Frontend: Edit page layout (split-screen structure)
- Branding editor (logo, banner, colors)
- Company info editor (name, description)

**Hours 8-10: Job CRUD Backend**
- POST /jobs - Create job
- PUT /jobs/:id - Update job
- DELETE /jobs/:id - Delete job
- Authorization checks (simple - req.user.companyId check) (company ownership)

---

### Day 2 - Editor UI + Deploy (8 hours)

**Hours 0-4: Split-Screen Editor UI**
- EditorLayout component (split-screen container)
- EditorSidebar with tabs (Branding, Company, Jobs)
- BrandingTab with color picker, logo/banner inputs
- CompanyTab with name/description forms
- JobsTab with job list table
- JobForm modal for add/edit
- LivePreview component (renders careers page in real-time)
- Connect forms to local state → preview updates instantly
- Publish button saves to backend

**Hours 4-5: Polish & UX**
- Loading states (spinners)
- Error handling (toast notifications)
- Empty states (no jobs)
- Mobile responsiveness check
- Form validation messages

**Hours 5-6: Testing**
- Test recruiter flow end-to-end
- Test candidate flow end-to-end
- Edge cases (auth, invalid data)
- Cross-browser check

**Hours 6-8: Deployment**
- Setup Neon database (run migrations + seed)
- Deploy backend to Render
- Deploy frontend to Vercel
- Configure environment variables
- Production testing

---

## MVP Features (Must Have)

### Priority 1 - Core Functionality
- ✅ Email/password authentication
- ✅ Multi-tenant data isolation
- ✅ Company branding customization
- ✅ Job CRUD operations
- ✅ Public careers page
- ✅ Job filtering and search
- ✅ Mobile responsive design

### Priority 2 - Important UX
- ✅ Split-screen live preview (instant feedback!)
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ ~100 sample jobs seeded

### Nice to Have (If Time Permits)
- Culture video URL field
- Content sections (About Us, Life at Company)
- Advanced SEO (meta tags, structured data)
- Accessibility features
- Animations and transitions

### Skip for MVP
- File uploads (use URLs instead)
- Email verification
- Password reset
- Multiple users per company
- Job application form
- Analytics

---

## Code Style Guidelines

### Write Human Code (Not AI-Generated)

**DO:**
- Keep it simple and straightforward
- Use common, realistic patterns
- Comment only complex logic
- Use normal variable names
- Focus on functionality

**DON'T:**
- Over-comment obvious code
- Create unnecessary abstractions
- Write overly defensive code
- Use AI-style verbose naming
- Add helper functions for single use

**Example - Good:**
```javascript
const jobs = await db.query('SELECT * FROM jobs WHERE company_id = $1', [companyId]);
res.json(jobs.rows);
```

**Example - Bad (AI-style):**
```javascript
/**
 * Retrieves all jobs for a company
 * @param {number} companyId
 * @returns {Promise<Array>}
 */
async function getAllJobsByCompanyId(companyId) {
  try {
    const result = await executeDatabaseQuery(...);
    return formatSuccessResponse(result);
  } catch (error) {
    handleDatabaseError(error);
  }
}
```

---

## Critical Implementation Notes

### Authentication (Simplified - Don't Over-Engineer!)

**Time-Saver:** Keep auth MINIMAL for 1-2 day timeline. Don't build refresh tokens, password reset, email verification - NOT NEEDED for MVP!

**Simple JWT Auth (Total time: ~1 hour)**

```javascript
// Register endpoint - creates company + user
const register = async (req, res) => {
  const { email, password, companyName, companySlug } = req.body;

  const hash = await bcrypt.hash(password, 10); // Simple hash, 10 rounds

  const company = await db.query('INSERT INTO companies (name, slug) VALUES ($1, $2) RETURNING id', [companyName, companySlug]);
  const user = await db.query('INSERT INTO users (email, password_hash, company_id) VALUES ($1, $2, $3) RETURNING id', [email, hash, company.rows[0].id]);

  const token = jwt.sign({ userId: user.rows[0].id, companyId: company.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, companySlug });
};

// Auth middleware - ONE simple function
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { userId, companyId }
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

**What to SKIP** (saves 2-3 hours):
- ❌ Refresh tokens
- ❌ Password reset
- ❌ Email verification
- ❌ Rate limiting
- ❌ Session management
- ❌ Remember me

**Total auth implementation: ~1 hour vs 3-4 hours!**

### Multi-Tenant Security
- Every protected route checks: `req.user.company_id === resource.company_id`
- SQL queries filter by company_id
- Never trust client-provided company_id

### Dynamic Theming
- Store theme as JSON: `{"primary_color": "#3B82F6", "secondary_color": "#1F2937"}`
- Apply using CSS variables on careers page
- Color picker for recruiter editor

### Slug Generation
- Company slug: User inputs during registration
- Job slug: Auto-generate from title (`"Software Engineer"` → `"software-engineer"`)
- Handle duplicates: append number if needed

### Job Filtering
- Backend: Query params `?location=Berlin&job_type=Full%20time`
- Frontend: Dropdowns from unique values
- Search: Client-side filter on title

---

## Deployment Steps

### 1. Database (Neon)
```bash
# Create Neon account and project
# Copy connection string

# Run migrations
psql $DATABASE_URL -f migrations/001_init.sql

# Run seed script
node src/utils/seedData.js
```

### 2. Backend (Render)
```bash
# Connect GitHub repo to Render
# Build: npm install
# Start: npm start

# Environment variables:
DATABASE_URL=<neon-connection-string>
JWT_SECRET=<random-secret>
NODE_ENV=production
FRONTEND_URL=<vercel-url>
```

### 3. Frontend (Vercel)
```bash
# Connect GitHub repo to Vercel
# Framework: Next.js (auto-detected)
# Build: npm run build (automatic)
# Output: .next (automatic)

# Environment variables:
NEXT_PUBLIC_API_URL=<render-backend-url>

# Note: Next.js env vars must start with NEXT_PUBLIC_ to be accessible in browser
```

### 4. Post-Deployment
- Update backend FRONTEND_URL with Vercel URL
- Redeploy backend
- Test full flows in production

---

## Testing Checklist

### Recruiter Flow
- [ ] Register new account
- [ ] Login with credentials
- [ ] Edit company branding
- [ ] Add new job
- [ ] Edit existing job
- [ ] Delete job
- [ ] Live preview updates instantly in split-screen
- [ ] Publish careers page

### Candidate Flow
- [ ] Visit public careers page
- [ ] See company branding
- [ ] Browse job listings
- [ ] Filter by location
- [ ] Filter by job type
- [ ] Search by title
- [ ] Mobile responsive

### Edge Cases
- [ ] Invalid credentials → error
- [ ] Unauthorized access → 403
- [ ] Invalid slug → 404
- [ ] Empty state (no jobs)
- [ ] Long content doesn't break layout

---

## If Behind Schedule

### Cut in this order:
1. Color picker → Use default theme
2. Job filters → Search only
3. Structured data for jobs → Just meta tags
4. Polish/animations → Functional first

### Never cut:
- Authentication (required for multi-tenant)
- Job CRUD (core feature)
- Public careers page (main deliverable)

---

## Suggested Improvements (Post-MVP)

### After Working Prototype:
- Rich text editor for descriptions
- File uploads (Cloudinary)
- Culture video embed
- Content sections (About Us, etc)
- Advanced SEO and meta tags
- Better accessibility
- Loading skeletons
- Animations

### Future Features:
- Email verification
- Password reset
- Multiple users per company
- Job application form
- Applicant tracking
- Analytics dashboard
- Custom domains

---

## Common Issues & Solutions

### CORS Errors
- Update FRONTEND_URL in backend
- Redeploy backend
- Clear browser cache

### Database Connection Fails
- Check DATABASE_URL format
- Neon requires SSL: `?sslmode=require`

### Token Issues
- Ensure "Bearer " prefix
- Check JWT_SECRET matches
- Verify token not expired

### Frontend Can't Reach Backend
- Check VITE_API_URL correct
- Rebuild frontend (env vars baked in)

---

## Success Criteria

### Minimum Demo-Ready:
- ✅ Register and login works
- ✅ Can customize branding
- ✅ Can manage jobs (CRUD)
- ✅ Public page shows jobs
- ✅ Basic filtering works
- ✅ Deployed and live
- ✅ ~100 jobs seeded

### Ideal MVP:
- ✅ All above
- ✅ Split-screen live preview (instant feedback!)
- ✅ Combined filters + search
- ✅ Error handling
- ✅ Mobile responsive
- ✅ Clean, professional UI
- ✅ Dynamic meta tags per company (SEO)
- ✅ Structured data for jobs (Google Jobs)

---

## Project Rules

1. **No git commits/pushes** - Focus on building features
2. **Human-style code** - Simple, natural, not over-engineered
3. **Build only what's needed** - Suggest improvements later
4. **Manual docs** - Write Tech Spec, README, AGENT_LOG yourself (not AI)

---

**Ready to build!** Follow this plan step-by-step for a successful MVP in 1-2 days.
