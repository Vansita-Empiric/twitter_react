import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  useEffect(() => {
    const loginDetails = localStorage.getItem("isLoggedIn");
    console.log(loginDetails);
    if (loginDetails) {
      window.alert("You have already logged in");
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signup = async (e) => {
    e.preventDefault();
    console.log("Username : ", formData.username);
    console.log("Email : ", formData.email);
    console.log("Password : ", formData.password);

    try {
      const apiSignup = "/api/users/register";
      const response = await axios.post(apiSignup, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Registered successfully");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Internal server error");
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
      <form className="p-6 flex flex-col justify-center" onSubmit={signup}>
        <div className="flex flex-col mt-2">
          <label htmlFor="username" className="hidden">
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
          />
        </div>

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

        <div className="flex flex-col mt-2">
          <label htmlFor="confirmPassword" className="hidden">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
        >
          Sign up
        </button>
      </form>
    </>
  );
}

export default Signup;
