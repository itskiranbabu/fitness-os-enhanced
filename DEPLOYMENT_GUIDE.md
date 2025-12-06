# 🚀 Deploying BusinessOS.ai

## 1. Project Info
- **Project Name Recommend**: `business-os-ai`
- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase
- **Payments**: Stripe

## 2. Push to GitHub
Since I am an AI running locally, I cannot push to your private GitHub directly. **You must do this step:**

1.  **Create a New Repository** on [GitHub.com](https://github.com/new) named `business-os-ai`.
2.  **Run these commands** in your terminal (inside `d:\MyDigitalProductWorkspace\fitness-os-enhanced`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/business-os-ai.git
git branch -M main
git push -u origin main
```

## 3. Deploy to Vercel
1.  Go to [Vercel.com](https://vercel.com/new).
2.  Import the `business-os-ai` repository you just created.
3.  **Configure Project**:
    - **Framework Preset**: Next.js
    - **Root Directory**: `.` (default)
4.  **Environment Variables** (Copy these from your local `.env`):
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `GOOGLE_GEMINI_API_KEY` (or `OPENAI_API_KEY`)
    - `STRIPE_SECRET_KEY` (optional for now)
5.  Click **Deploy**.

## 4. Final Sanity Check
Once deployed, verify:
- `/onboarding` loads correctly.
- Lead capture form works (check Supabase logs).
- AI Generation works (check logs if it fails).
