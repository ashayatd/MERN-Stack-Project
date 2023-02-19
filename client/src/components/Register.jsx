import { useState } from "react";
import React from "react";
import "./Register.css";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Regs() {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [Role, setRole] = useState("user");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    if (cpassword === password) {
      console.log(email, password, username);
      const res = await fetch("/user/register", {
        method: "POST",
        body: JSON.stringify({
          data: { email: email, password: password, username: username, role: Role }, // 
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        window.alert("All Input required! ");
      } else if (res.status === 409) {
        window.alert("Already Register username please login");
      } else {
        window.alert("Registration done please login");
        navigate("/");
      }
    } else {
      alert("Password Not matched!");
      return;
    }
  };

  function chaeckSet(e) {
    setcpassword(e.target.value);
  }


  return (
    <>    <nav id="navbar">
    <ul>
      <li><Link Link to="/" className="Link">
      Home
    </Link></li>
      <li><Link Link to="/about" className="Link">
      About
    </Link></li>
    </ul>
  </nav>
  <Outlet />

  <div className="register-container">
      <form method="POST" className="register-form">
        <h1 className="form-title">Register</h1>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
            type={"email"}
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            name="Username"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            value={username}
            type={"name"}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
            type={"password"}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="cpassword"
            onChange={chaeckSet}
            value={cpassword}
            type={"password"}
          />
          <br />
        </div>
        <div className="form-group">
          <label>Role</label>

          <select onChange={async (e)=>{
            setRole(e.target.value)
            }}>
              
            <option defaultChecked={true} value={"user"}>User</option>
            <option value={"admin"}>Admin</option>
          </select>
          <br />
        </div>

        <button onClick={registerUser} className="register-button">
          Register
        </button>
      </form>
    </div>
    </>
    
  );
}
