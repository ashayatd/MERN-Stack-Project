import { React, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";


function Dash() {

const [data, setdata] = useState([]);
const [Input, setInput] = useState("");
let [count, setcount] = useState(0);

const calldashboardpage = async()=> {
  try {
    const res = await fetch('/dashboard', {
      method:"GET",
      headers:{
        Accept: "application/json",
        "Content-type":"Application/json"
      },
      credentials: "include"
    }) 
    const data = await res.json();
    console.log(data);
    if(!res.status === 200){
      const error = new Error(res.error);
      throw(error);
    }
  }
  catch (error) {
    console.log(error);
    window.alert("Please Login Again...");
  }
}

    useEffect(() => {
      calldashboardpage();
    }, []);

  function addList() {
    if (data === "") {
      alert("Please Enter Some Data");
    } else {
        if(count>5){
            alert("Not more than 6 Tasks 😫")
        }
        else{
            setcount(count+1);
            setInput("");
            setdata([...data, Input ]);
        }
    }
  }

  return (
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
      <li><Link Link to="/dashboard" className="Link">
      Dashboard
    </Link></li>
    </ul>
  </nav>
  
  <Outlet />
      <>
        <h2>Hello</h2>
        <h2>John Doe </h2>
        <p>Good to see you here!</p>
        <p>{Date()}</p>

        {data.map((elem, key)=>{
            return(<ul key={key}>
              <li> {elem} </li>
            </ul>)
        })}

        <input
          value={Input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button onClick={addList}>Add New Task</button>

        <button onClick={() => {setdata([])}}>Delete List</button>
        <p>Logout</p>
      </>
      <div>
        <img src="https://i.ibb.co/5YCbHPH/small-team-discussing-ideas-2194220-0-1.png" />
      </div>
    </div>
  );
}

export default Dash;
