import { Post } from "../model/post.model.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
  const { content } = req.body;

  try {
    const post = await Post.create({
      content,
      owner: req.user._id,
      like: [],
      dislike: [],
      comment: [],
    });
    console.log("Post created successfully");
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating post" });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      owner: req.user._id,
    });

    if (!deletedPost) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Post deleted successfully");
    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting post" });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, owner: req.user._id },
      { content },
      { new: true }
    );

    if (!updatedPost) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Post updated successfully");
    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating post" });
  }
};

const getAllPost = async (req, res) => {
  const getAll = await Post.find();
  if (!getAll) {
    return console.log("No post found");
  }
  return res.status(200).json({ message: "Post found successfully", getAll });
};

const getPostByUser = async (req, res) => {
  const findByUser = await Post.find({ owner: req.user._id });
  if (!findByUser) {
    return console.log("No post found");
  }
  return res
    .status(200)
    .json({ message: "Post found successfully", findByUser });
};

const getPostById = async (req, res) => {
  const findById = await Post.find({ _id: req.params.id });
  if (!findById) {
    return console.log("No post found");
  }
  console.log(findById);
  return res.status(200).json({ message: "Post found", findById });
};

const likePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const f1 = await Post.findOne({ like: req.user._id });
    if (!f1) {
      const like = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { like: req.user._id } },
        { new: true }
      );
      if (like) {
        console.log("Post liked");
        return res.status(200).json({ message: "Post liked", like });
      }
    } else {
      const like1 = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { like: req.user._id } },
        { new: true }
      );
      if (like1) {
        console.log("Removed from like");
        return res.status(200).json({ message: "Removed from like" });
      }
    }
  } catch (error) {
    console.log("error liking post");
    return res.status(400).json({ message: "error", error });
  }
};

const dislikePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const f1 = await Post.findOne({ dislike: req.user._id });
    if (!f1) {
      const dislike = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { dislike: req.user._id } },
        { new: true }
      );
      if (dislike) {
        console.log("Post disliked");
        return res.status(200).json({ message: "Post disliked" });
      }
    } else {
      const dislike1 = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { dislike: req.user._id } },
        { new: true }
      );
      if (dislike1) {
        console.log("Removed from dislike");
        return res.status(200).json({ message: "Removed from dislike" });
      }
    }
  } catch (error) {
    console.log("erro disliking post");
    return res.status(400).json({ message: "error", error });
  }
};

const commentPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const { commentData } = req.body;
  // console.log(commentData);

  try {
    const post = await Post.findOne({ _id: req.params.id });
    // console.log(post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const addComment = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          comment: {
            commentBy: userId,
            commentData: commentData,
            commentLikes: [],
            commentDislikes: [],
            subcomments: [],
          },
        },
      },
      { new: true }
    );
    // console.log(addComment);
    if (addComment) {
      console.log("Comment added");
      return res.status(200).json({ message: "Comment added", addComment });
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const commentLike = async (req, res) => {
  try {
    const commentId = req.params.id;
    const postId = req.params.postId;
    const userId = req.user._id;

    console.log("Post id : ", postId);
    console.log("comment id: ", commentId);
    console.log("user id : ", userId.toString());

    const post = await Post.findById({
      _id: postId,
    });
    const commentDt = post.comment;
    if (commentDt.length > 0) {
      const findComment = commentDt.filter((cdata) => {
        if (cdata._id.toString() === commentId) {
          return cdata;
        }
      });
      console.log("findComment: ", findComment);
      if (findComment[0].commentLikes.length > 0) {
        const commentLikes = findComment[0].commentLikes;

        console.log("commentLikes: ", commentLikes);
        if (commentLikes.length > 0) {
          const findLike = commentLikes.includes(userId);
          console.log("find like : ", findLike);
          if (findLike) {
            return res
              .status(200)
              .json({ message: "user already liked comment" });
          } else {
            console.log("Add Like ");
            const result = await Post.findOneAndUpdate(
              { "comment._id": findComment[0]._id },
              {
                $push: {
                  "comment.$.commentLikes": userId,
                },
              },
              { new: true }
            );
            if (result) {
              console.log("comment liked");
              return res.status(200).json({ message: "comment liked", result });
            } else {
              return res.status(400).json({ message: "error" });
            }
          }
        }
      } else {
        const result = await Post.findOneAndUpdate(
          { "comment._id": findComment[0]._id },
          {
            $push: {
              "comment.$.commentLikes": userId,
            },
          },
          { new: true }
        );
        if (result) {
          console.log("comment liked");
          return res.status(200).json({ message: "comment liked", result });
        } else {
          return res.status(400).json({ message: "error" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const commentDisLike = async (req, res) => {
  try {
    const commentId = req.params.id;
    const postId = req.params.postId;
    const userId = req.user._id;

    console.log("Post id : ", postId);
    console.log("comment id: ", commentId);
    console.log("user id : ", userId.toString());

    const post = await Post.findById({
      _id: postId,
    });
    const commentDt = post.comment;
    if (commentDt.length > 0) {
      const findComment = commentDt.filter((cdata) => {
        if (cdata._id.toString() === commentId) {
          return cdata;
        }
      });
      console.log("findComment: ", findComment);
      if (findComment[0].commentDislikes.length > 0) {
        const commentDislikes = findComment[0].commentDislikes;

        console.log("commentDislikes: ", commentDislikes);
        if (commentDislikes.length > 0) {
          const findLike = commentDislikes.includes(userId);
          console.log("find like : ", findLike);
          if (findLike) {
            return res
              .status(200)
              .json({ message: "user already disliked comment" });
          } else {
            console.log("Add Like ");
            const result = await Post.findOneAndUpdate(
              { "comment._id": findComment[0]._id },
              {
                $push: {
                  "comment.$.commentDislikes": userId,
                },
              },
              { new: true }
            );
            if (result) {
              console.log("comment disliked");
              return res.status(200).json({ message: "comment disliked", result });
            } else {
              return res.status(400).json({ message: "error" });
            }
          }
        }
      } else {
        const result = await Post.findOneAndUpdate(
          { "comment._id": findComment[0]._id },
          {
            $push: {
              "comment.$.commentDislikes": userId,
            },
          },
          { new: true }
        );
        if (result) {
          console.log("comment disliked");
          return res.status(200).json({ message: "comment disliked", result });
        } else {
          return res.status(400).json({ message: "error" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  createPost,
  deletePost,
  updatePost,
  getAllPost,
  getPostByUser,
  getPostById,
  likePost,
  dislikePost,
  commentPost,
  commentLike,
  commentDisLike,
};
