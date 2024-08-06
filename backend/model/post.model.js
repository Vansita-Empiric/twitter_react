import mongoose from "mongoose";
import { User } from "./user.model.js";

// const subcommentSchema = new mongoose.Schema({
//   commentBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   commentData: {
//     type: String,
//     required: true,
//   },
//   commentLikes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   commentDislikes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
// });

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentData: {
    type: String,
  },
  commentLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  commentDislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

commentSchema.add({ subcomments: [commentSchema] });

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislike: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comment: {
      type: [commentSchema],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
