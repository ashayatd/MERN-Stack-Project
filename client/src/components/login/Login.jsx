import { React } from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(()=>{
  //   loginUser();
  // })

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

    console.log("hit the BE");

    if (res.status !== 200) {
      window.alert(data.message);
    } else {
      console.log(data.message);
      if (data.role === "user") {
        navigate("/dashboard");
      }
      if (data.role === "admin") {
        navigate("/admindashboard");
      }
    }
  };

  return (
    <div className="main_background">
      <div className="navbarBackground">
        <div className="navbarBackground2"></div>
      </div>
      <div >
        <nav>
          <ul id="navbar">
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
      </div>

      <div>
        <div className="main-div">
          <div className="login-container">
                <form className="login-form">
                  <h1 className="form-title">Login</h1>
                  <div className="form-group">
                    <label htmlFor="username" className="label">Username:</label>
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
                    <label htmlFor="password" className="label">Password:</label>
                    <input 
                      type="password"
                      id="password"
                      name="password"
                      value={Password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                  <div className="button-div">
                    <button type="submit" onClick={loginUser} className="button">
                      Login
                    </button>
                  </div>
                  
                </form>
              <img src="https://productsinsights.com/wp-content/uploads/2023/02/Untitled-design-20.png" className="side-image"/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
