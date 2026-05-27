# SkillSphere

**SkillSphere** is a modern online learning platform built with Next.js. It helps users explore courses, review lessons, and manage their profile in a responsive learning experience.

## Live Demo
https://your-deployment-url.vercel.app

## Purpose
The project delivers a polished single-page learning platform with the following capabilities:

- Browse skill-based courses in Development, Design, and Marketing
- Search courses by title
- View protected course detail pages after login
- Register and manage user profile data
- Update name and photo information
- Responsive layout for mobile, tablet, and desktop

## Key Features

- Persistent Navbar and Footer
- Course search and trending course highlights
- Protected course detail route with redirect if not logged in
- Login, registration, and profile update forms
- Toast notifications for success and errors
- Mobile-friendly design and responsive course cards
- Not-found page for invalid routes

## Project Structure

- `src/app` — Next.js App Router pages
- `src/components` — shared UI components
- `src/lib/auth.ts` — local authentication context and session storage
- `src/data/courses.json` — course catalog data
- `src/app/api/courses/route.ts` — courses API endpoint

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then configure your local environment:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## NPM Packages Used

- `next` — React framework
- `react` / `react-dom` — UI library
- `react-hot-toast` — toast notifications
- `framer-motion` — animation and motion effects

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Notes

This version supports a local authentication flow with session persistence. Google login is simulated for demo purposes and can be replaced with a real OAuth provider later.
