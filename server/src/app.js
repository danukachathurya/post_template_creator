import cors from "cors";
import express from "express";
import postRoutes from "./routes/postRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json({ limit: "8mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "facebook-post-creator" });
});

app.use("/api/posts", postRoutes);
app.use("/api/templates", templateRoutes);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Something went wrong"
  });
});

export default app;
