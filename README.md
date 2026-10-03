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
