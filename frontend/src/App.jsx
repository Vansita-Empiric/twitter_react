import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const login = () => {
  //   setIsAuthenticated(true);
  // };
  // const logout = () => {
  //   setIsAuthenticated(false);
  // };

  // context={{ isAuthenticated, login, logout }}

  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
}

export default App;
