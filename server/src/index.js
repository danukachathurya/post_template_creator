import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

let dbConnectionPromise;

export default async function handler(req, res) {
  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB();
    }

    await dbConnectionPromise;

    return app(req, res);
  } catch (error) {
    console.error("Backend initialization failed:", error.message);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}