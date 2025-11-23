# Cloud Deployment Guide

## Automated Deployment Setup

This guide will help you deploy the Stock Professional Analysis App to free cloud services with automatic deployments from GitHub.

---

## Architecture

- **Frontend**: Vercel (Free Tier)
- **Backend**: Render (Free Tier)
- **CI/CD**: GitHub Actions

---

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account

### 1.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `edward40/Stock-Manager`
3. Configure the service:
   - **Name**: `stock-manager-api`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

### 1.3 Add Environment Variables
In the Render dashboard, add:
- **Key**: `ALLOWED_ORIGINS`
- **Value**: `https://stock-manager.vercel.app,http://localhost:3000`

(You'll update this with your actual Vercel URL later)

### 1.4 Deploy
Click "Create Web Service" and wait for deployment (5-10 minutes).

Your backend will be available at: `https://stock-manager-api.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### 2.2 Import Project
1. Click "Add New..." → "Project"
2. Import `edward40/Stock-Manager`
3. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT: Click "Edit" and set to `frontend`**
   - **Build Command**: Leave as default (`npm run build`)
   - **Output Directory**: Leave as default (`.next`)
   - **Install Command**: Leave as default (`npm install`)

### 2.3 Add Environment Variable
In "Environment Variables" section, add:
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://stock-manager-api.onrender.com`

(Use your actual Render URL from Step 1)

### 2.4 Deploy
Click "Deploy" and wait (2-3 minutes).

Your frontend will be available at: `https://stock-manager-xxx.vercel.app`

---

## Step 3: Update CORS Settings

### 3.1 Update Render Environment Variable
1. Go back to Render dashboard
2. Navigate to your `stock-manager-api` service
3. Go to "Environment" tab
4. Update `ALLOWED_ORIGINS` to include your Vercel URL:
   ```
   https://stock-manager-xxx.vercel.app,http://localhost:3000
   ```
5. Save changes (service will redeploy automatically)

---

## Step 4: Verify Deployment

### 4.1 Test Backend
Visit: `https://stock-manager-api.onrender.com/health`

Expected response:
```json
{"status": "ok"}
```

### 4.2 Test Frontend
1. Visit your Vercel URL
2. Search for a stock (e.g., "AAPL")
3. Verify:
   - Stock data loads
   - Charts display
   - Buy/Sell recommendation shows

---

## Automatic Deployments

### GitHub Actions
The `.github/workflows/backend-tests.yml` workflow automatically:
- Runs backend tests on every push to `main`
- Ensures code quality before deployment

### Vercel
- Automatically deploys on every push to `main`
- Creates preview deployments for pull requests

### Render
- Automatically deploys on every push to `main`
- Monitors for changes in the repository

---

## Monitoring & Logs

### Vercel Logs
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments" → Select deployment → "Logs"

### Render Logs
1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab

---

## Important Notes

> [!WARNING]
> **Render Free Tier Limitations**
> - Services spin down after 15 minutes of inactivity
> - First request after inactivity may take 30-60 seconds
> - 750 hours/month free (enough for 1 service running 24/7)

> [!TIP]
> **Keep Service Warm**
> To prevent spin-down, you can:
> - Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 10 minutes
> - Upgrade to Render paid plan ($7/month) for always-on service

---

## Troubleshooting

### Frontend can't connect to Backend
- Check CORS settings in Render
- Verify `NEXT_PUBLIC_API_URL` in Vercel
- Check Render logs for errors

### Backend deployment fails
- Check `requirements.txt` is correct
- Verify Python version compatibility
- Check Render build logs

### Tests failing in GitHub Actions
- Run tests locally: `cd backend && pytest tests/`
- Check test output in GitHub Actions tab

---

## Cost Summary

**Total Cost**: $0/month

- ✅ Vercel Free: Unlimited personal projects
- ✅ Render Free: 750 hours/month
- ✅ GitHub Actions: 2,000 minutes/month

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Update CORS settings
4. ✅ Test the application
5. 🎉 Share your live app!

Your app will be live at:
- Frontend: `https://stock-manager-xxx.vercel.app`
- Backend API: `https://stock-manager-api.onrender.com`
