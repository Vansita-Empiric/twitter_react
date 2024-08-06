import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  localStorage.setItem("isLoggedIn", "false");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Email is : ", formData.email);
    console.log("Password is : ", formData.password);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("password", formData.password);

    try {
      const apiLogin = "/api/users/login";
      const response = await axios.post(apiLogin, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("User logged in successfully");
        localStorage.setItem("isLoggedIn", "true");
        navigate("home");
      } else {
        console.log("User login failed");
      }
    } catch (error) {
      console.log("Internal Server error");
    }
  };
  return (
    <>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex items-center lg:order-2">
            <Link
              to="/"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <form className="p-6 flex flex-col justify-center" onSubmit={loginUser}>
        <div className="flex flex-col mt-2">
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="hidden">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
        >
          Log In
        </button>
      </form>
    </>
  );
}

export default Login;
