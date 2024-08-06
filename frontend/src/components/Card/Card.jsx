import React, { useState } from "react";
import { MdModeComment } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Card({ postData, getPost }) {
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [newContent, setNewContent] = useState();
  const [addComment, setAddComment] = useState();
  // console.log("Card: ", postData);
  // console.log("Card-----------: ", postData._id);
  // console.log("editData------------------", editData);
  // console.log("editData------------------", editData._id);

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const apiUpdatePost = `/api/posts/${editData._id}`;
      const response = await axios.put(
        apiUpdatePost,
        { content: newContent },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response.data);
      console.log("new content: ", newContent);
      setShowModal(false);
      setEditData({});

      if (response.status === 200) {
        console.log("Updated successfully");
      } else {
        console.log("Updation failed");
      }
    } catch (error) {
      console.error("Update error: ", error);
    }
  };

  const handleDelete = async (e) => {
    // e.preventDefault();
    try {
      const apiDeletePost = `/api/posts/${e._id}`;
      const response = await axios.delete(apiDeletePost);
      // console.log("Delete Response: ", response.data);

      setEditData({});

      if (response.status === 200) {
        console.log("Deleted successfully");
        getPost();
      } else {
        console.log("Deletion failed");
      }
    } catch (error) {
      console.error("Delete error: ", error);
    }
  };

  const handlePostLike = async (e) => {
    // e.preventDefault();
    try {
      const apiPostLike = `/api/posts/likePost/${e._id}`;
      const response = await axios.put(apiPostLike);
      // console.log("Delete Response: ", response.data);

      setEditData({});

      if (response.status === 200) {
        console.log("Post liked successfully");
        getPost();
      } else {
        console.log("Post like failed");
      }
    } catch (error) {
      console.error("Error while liking post: ", error);
    }
  };

  const handlePostDisLike = async (e) => {
    // e.preventDefault();
    try {
      const apiPostDisLike = `/api/posts/dislikePost/${e._id}`;
      const response = await axios.put(apiPostDisLike);
      // console.log("Delete Response: ", response.data);

      setEditData({});

      if (response.status === 200) {
        console.log("Post disliked successfully");
        getPost();
      } else {
        console.log("Post dislike failed");
      }
    } catch (error) {
      console.error("Error while disliking post: ", error);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const apiCommentPost = `/api/posts/commentPost/${editData._id}`;
      const response = await axios.put(
        apiCommentPost,
        { commentData: addComment },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response.data);
      console.log("comment : ", addComment);
      setShowCommentModal(false);
      setEditData({});

      if (response.status === 200) {
        console.log("Comment Added");
        getPost();
      } else {
        console.log("Failed to add comment");
      }
    } catch (error) {
      console.error("Comment adding error: ", error);
    }
  };

  const commentLike = async (e) => {
    setEditData(e);
    console.log("-----------------------", editData._id);
  };

  return (
    <>
      {postData.map((e, index) => {
        // console.log("comment: ", e.comment[index].commentData);
        // console.log("index: ", index);
        // console.log("owner: ", e.owner);

        return (
          <div key={index}>
            <div className="flex font-sans border-solid border-2">
              <form className="flex-auto p-6">
                <div className="flex  flex-wrap">
                  <label>
                    <div className="flex items-center justify-center text-slate-700 ">
                      Post Owner: {e.owner}
                    </div>
                  </label>
                </div>
                <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                  <h1 className="flex-auto text-lg font-semibold   text-slate-900 ">
                    Post Content: {e.content}
                  </h1>
                </div>
                <div className="flex space-x-8 mb-2 text-2xl  ">
                  <FaRegHeart
                    className=" text-black-600"
                    onClick={() => {
                      handlePostLike(e);
                    }}
                  />
                  <BiDislike
                    className=" text-black-600"
                    onClick={() => {
                      handlePostDisLike(e);
                    }}
                  />
                  <MdModeComment
                    className="text-black-600"
                    onClick={() => {
                      setShowCommentModal(true);
                      setEditData(e);
                    }}
                  />
                </div>

                <div className="flex space-x-8 flex-wrap">
                  <div className="flex space-x-8 items-center justify-center text-slate-700 ">
                    Post Comments:
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="bg-gray-200 shadow-md rounded px-8 pt-10 pb-8 w-full">
                    <div className="flex flex-col text-sm ">
                      {e.comment?.map((comment, index) => (
                        <div
                          key={index}
                          className="border-gray-500 border mb-2 rounded-lg"
                        >
                          <div className="flex flex-col text-black py-2 px-1">
                            <p className="flex mb-2">{comment.commentData}</p>
                            <div className="flex gap-2">
                              <FaRegHeart
                                className="text-black-600 text-sm"
                                onClick={async () => {
                                  // console.log(comment._id);
                                  const apiCommentLike = `/api/posts/commentLike/${e._id}/${comment._id}`;
                                  const response = await axios.put(
                                    apiCommentLike
                                  );

                                  if (response.status === 200) {
                                    getPost();
                                  }
                                  // commentLike(e);
                                }}
                              />
                              <BiDislike
                                className=" text-black-600 text-sm"
                                onClick={async () => {
                                  // console.log(comment._id);
                                  const apiCommentLike = `/api/posts/commentDisLike/${e._id}/${comment._id}`;
                                  const response = await axios.put(
                                    apiCommentLike
                                  );

                                  if (response.status === 200) {
                                    getPost();
                                  }
                                  // commentLike(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mb-2 text-2xl ">
                  <div className="flex-auto flex space-x-4 place-content-end">
                    {/* <Link to={`/update/${e._id}`}> */}
                    <FiEdit
                      className="text-green-700"
                      onClick={() => {
                        setShowModal(true);
                        setEditData(e);
                      }}
                    />

                    <MdDeleteForever
                      className="text-3xl text-red-700"
                      onClick={() => {
                        handleDelete(e);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <br />
          </div>
        );
      })}

      {/* modal start for edit the post */}
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Edit Post</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowModal(false);
                      setEditData({});
                    }}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative p-6 flex-auto">
                    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Post Content
                      </label>
                      <input
                        onChange={(e) => setNewContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        defaultValue={editData.content}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      onClick={() => {
                        setShowModal(false);
                        setEditData({});
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* modal over for edit the post */}

      {/* modal start for the post comment */}
      {showCommentModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Add Post Comment</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => {
                      setShowCommentModal(false);
                      setEditData({});
                    }}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <form onSubmit={handlePostComment}>
                  <div className="relative p-6 flex-auto">
                    <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Comment
                      </label>
                      <input
                        onChange={(e) => setAddComment(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      onClick={() => {
                        setShowCommentModal(false);
                        setEditData({});
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* modal over for the post comment */}
    </>
  );
}

export default Card;
