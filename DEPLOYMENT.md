# Deployment Guide

## Quick Deployment Steps

### 1. Backend Deployment (Render)

1. **Create Render Account**: Go to https://render.com and sign up

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

3. **Configure Service**:
   ```
   Name: ats-careers-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**:
   ```
   DATABASE_URL=your-neon-database-url (from Neon dashboard)
   JWT_SECRET=your-secret-key-here (generate a random string)
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PORT=3000
   ```

5. **Deploy**: Click "Create Web Service"

6. **Copy Backend URL**: Save your backend URL (e.g., `https://ats-careers-backend.onrender.com`)

---

### 2. Frontend Deployment (Vercel)

1. **Create Vercel Account**: Go to https://vercel.com and sign up

2. **Import Project**:
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as root directory

3. **Configure Build**:
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com/api
   ```
   (Use the backend URL from step 1.6)

5. **Deploy**: Click "Deploy"

---

### 3. Database (Already Set Up)

Your Neon database is already configured! Just make sure to:
- Copy the connection string from Neon dashboard
- Add it to Render environment variables as `DATABASE_URL`

---

## Testing Deployment

1. **Visit your Vercel URL**: `https://your-app.vercel.app`
2. **Should redirect to**: `/login`
3. **Try registering**: Create a new company account
4. **Test the editor**: Update company info, create jobs
5. **View careers page**: Visit `/:your-company-slug/careers`

---

## Troubleshooting

### Backend not connecting to database:
- Check `DATABASE_URL` format in Render
- Ensure Neon database is active
- Check Render logs for errors

### Frontend can't reach backend:
- Verify `NEXT_PUBLIC_API_URL` in Vercel
- Check CORS settings in backend
- Ensure `FRONTEND_URL` in Render matches your Vercel URL

### Build errors:
- Check Node version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

---

## Environment Variables Checklist

### Backend (Render):
- [ ] DATABASE_URL
- [ ] JWT_SECRET
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL
- [ ] PORT=3000

### Frontend (Vercel):
- [ ] NEXT_PUBLIC_API_URL

---

## Post-Deployment

1. Update CORS: Make sure `FRONTEND_URL` in backend .env matches your Vercel URL
2. Test all features: Login, register, create jobs, view careers page
3. Check mobile responsiveness
4. Verify SEO meta tags are working

---

## Deployment URLs

After deployment, save these URLs:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Sample Careers Page**: https://your-app.vercel.app/techcorp/careers
- **Database**: (Neon dashboard)
