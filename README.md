# Facebook Post Creator

MERN stack web application for creating Facebook-ready post images with a headline, uploaded picture, template selection, 1:1 or 3:4 sizing, and quality-based downloads.

## Structure

- `client/src/models` - template, size, and export quality data
- `client/src/controllers` - browser-side post/export behavior
- `client/src/components` - reusable creator controls and canvas
- `client/src/pages` - app pages
- `client/src/routes` - React Router setup
- `server/src/models` - Mongoose models
- `server/src/controllers` - Express request handlers
- `server/src/routes` - API routes

## Run

```bash
npm.cmd run install:all
npm.cmd run dev
```

Client: `http://localhost:5173`

Server: `http://localhost:5000`

MongoDB is optional for local UI use. To save drafts, set `MONGO_URI` in `server/.env`.

## Deploy to Vercel

This repository is configured as one Vercel project. The Vite frontend is built from `client`, and the Express API runs as a serverless function at `/api/*` on the same domain.

1. Import the repository into Vercel and keep the project root set to the repository root.
2. Add `MONGO_URI` in the Vercel project's Environment Variables if you want draft saving. Use a MongoDB connection string reachable from Vercel.
3. Deploy. Vercel serves the frontend and routes `/api/*` to the backend. No `VITE_API_URL` or `CLIENT_URL` is needed for this same-origin setup.

For a separate frontend/backend deployment, set `VITE_API_URL` at frontend build time to the backend origin, and set `CLIENT_URL` on the backend to the frontend origin. The backend's CORS policy uses that configured origin; don't use a trailing slash.
