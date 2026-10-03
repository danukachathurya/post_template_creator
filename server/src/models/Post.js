import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ""
    },
    templateId: {
      type: String,
      required: true
    },
    size: {
      type: String,
      enum: ["1:1", "3:4"],
      default: "1:1"
    },
    quality: {
      type: String,
      enum: ["standard", "high", "ultra"],
      default: "high"
    }
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
