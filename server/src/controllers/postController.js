import mongoose from "mongoose";
import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database is not connected. Add MONGO_URI to enable saving drafts."
      });
    }

    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (_req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }

    const posts = await Post.find().sort({ createdAt: -1 }).limit(30);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
