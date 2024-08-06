import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Logout from "./components/Logout/Logout";
import UpdatePost from "./components/Update/UpdatePost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path="/update/:id" element={<UpdatePost />} />
      <Route path="logout" element={<Logout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
