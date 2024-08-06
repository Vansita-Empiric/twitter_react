import { Router } from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPost,
  getPostById,
  getPostByUser,
  likePost,
  dislikePost,
  commentPost,
  commentLike,
  commentDisLike,
} from "../controller/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create", verifyJWT, createPost);
router.delete("/:id", verifyJWT, deletePost);
router.put("/:id", verifyJWT, updatePost);
router.get("/getAll", getAllPost);
router.get("/getByUser", verifyJWT, getPostByUser);
router.get("/getPostById/:id", verifyJWT, getPostById);
router.put("/likePost/:id", verifyJWT, likePost);
router.put("/dislikePost/:id", verifyJWT, dislikePost);
router.put("/commentPost/:id", verifyJWT, commentPost);
router.put("/commentLike/:postId/:id", verifyJWT, commentLike);
router.put("/commentDisLike/:postId/:id", verifyJWT, commentDisLike);
export default router;
