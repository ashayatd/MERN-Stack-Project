import { React } from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/loguser/login", {
      method: "POST",
      body: JSON.stringify({
        data: { Username, Password },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status !== 200) {
      window.alert(data.message);
    } 
    else {
      navigate.push("./dashboard");
    }
  };

  return (
    <>
    <div>
    <nav id="navbar">
      <ul>
        <li><Link Link to="/" className="Link">
        Home
      </Link></li>
        <li><Link Link to="/about" className="Link">
        About
      </Link></li>
        <li><Link Link to="/register" className="Link">
        Register
      </Link></li>
      </ul>
    </nav>
    <Outlet />
  </div>

    <div>
      <div>
         {/*  */}
        <div className="login-container">
          <form className="login-form">
            <h1 className="form-title">Login</h1>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={Username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={Password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" onClick={loginUser}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};
export default Login;





