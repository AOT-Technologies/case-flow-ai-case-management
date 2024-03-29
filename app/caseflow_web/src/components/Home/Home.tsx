import React from "react";
import { Outlet } from "react-router-dom";
import MiniDrawer from "../NavigationDrawer/NavigationDrawer";
import Loader from "../Loader/Loader";
import "./home.scss";
const Home = () =>
  {
    return (
      <div className="grid-container">
        <div className="menu">
          <MiniDrawer />
        </div>
        <div className="outlet">
          <Loader />
          <Outlet />
        </div>
      </div>
    );
  };

export default Home;
