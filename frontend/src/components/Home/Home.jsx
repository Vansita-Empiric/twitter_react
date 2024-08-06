import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Card/Card";

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([0]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const getPost = async () => {
    // console.log(content);

    const apiGetPost = "/api/posts/getAll";
    const response = await axios.get(apiGetPost);
    setData(response.data.getAll);
    setContent("");
  };

  const createPost = async (e) => {
    e.preventDefault();
    // console.log(content);
    try {
      const apiCreatePost = "/api/posts/create";
      const response = await axios.post(
        apiCreatePost,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Post created successfully");
        getPost();
      } else {
        console.log("Post creation failed");
      }
    } catch (error) {
      console.error("Internal server error");
    }
  };

  useEffect(() => {

    getPost();
  }, []);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.setItem("isLoggedIn", "false");

    try {
      const apiLogout = "/api/users/logout";
      let response = await axios.post(apiLogout);
      console.log("Logout thing: ", response.data);

      navigate("/logout");
    } catch (error) {
      console.log("Internal Server error");
    }
  };

  // console.log("All data: ", data);

  return (
    <>
      <div className="p-6 flex flex-col justify-center">
        {/* <div className="flex flex-col mt-2">
          <label>Email : {email}</label>
        </div>

        <div className="flex flex-col mt-2">
          <label>Password : {password}</label>
        </div> */}

        <button
          onClick={logoutUser}
          type="submit"
          className=" md:w-28 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
        >
          Log out
        </button>
      </div>

      <form className="p-6 flex flex-col justify-center" onSubmit={createPost}>
        <div className="flex flex-col mt-2">
          <label htmlFor="content" className="hidden">
            Content
          </label>
          <input
            value={content}
            onChange={handleChange}
            type="content"
            name="content"
            placeholder="Content"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
        >
          Add Post
        </button>
      </form>

      <div className="p-6 flex flex-col ">
        {/* <div className="flex flex-col mt-2">
          <label>Email : {email}</label>
        </div>

        <div className="flex flex-col mt-2">
          <label>Password : {password}</label>
        </div> */}
        <div className="place-items-end"></div>

        <Card postData={data} getPost = {getPost}/>
        {/* {data.map((e) => {
          console.log(e.content);
          return (
            <>
              <Card postData={e} />
            </>
          );
        })} */}
      </div>
    </>
  );
}

// export default Home;
