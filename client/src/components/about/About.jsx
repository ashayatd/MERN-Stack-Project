import React from "react";
import "./About.css";
import { Link, Outlet } from "react-router-dom";

const Home2 = () => {
  return (
    <div className="body">
      <div className="admin-navbarBackground">
        <div className="admin-navbarBackground2"></div>
      </div>{" "}
      <nav >
        <ul id="adminnavbar">
          <li>
            <Link Link to="/" className="Link">
              Login
            </Link>
          </li>
          <li>
            <Link Link to="/about" className="Link">
              About
            </Link>
          </li>
          <li>
            <Link Link to="/register" className="Link">
              Register
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <div className="MainSegment"></div>
      <div className="about-us-page">
        <h2 className="subheading">Our Mission</h2>
        <p>
          Our mission is to help individuals and teams achieve greater
          productivity and efficiency through our task tracker app. We believe
          in providing a simple, user-friendly, and effective solution for
          managing tasks and projects.
        </p>

        <h2 className="subheading">Our Team</h2>
        <p>
          Our team is made up of experienced software developers, designers, and
          project managers who are dedicated to creating high-quality and
          innovative products. We are passionate about helping our users succeed
          and making their work easier.
        </p>

        <h2 className="subheading">Contact Us</h2>
        <p>
          If you have any questions or suggestions, please don't hesitate to
          reach out to us at "ashay.tamrakar@gmail.com". We would love to hear
          from you!
        </p>
      </div>
    </div>
  );
};

export default Home2;
