import { React, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dash() {

  const [Data, setData] = useState([" Task 1", " Task 2", " Task 3"]);
  const [Users, setUsers] = useState(["Name 1","name 2", "name 3" ]);

  const [Data2, setData2] = useState([" abc", " def", " ghi"]);
  const [Input, setInput] = useState("");

  const navigate = useNavigate();

  const calldashboardpage = async () => {

    try {

      const res = await fetch("/dashboard/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 200) {
        const error = new Error(res.error);
        navigate(`/`);
        window.alert("Please Login Again...");
        throw error;
      }
      res = res.json();
      setUsers(res);
    }

     catch (error) {
      console.log(error);
      navigate(`/`);
      window.alert("Some Error Occured! Please Login Again...");
    }
  };

  const DeleteCookie = async ()=>{
    try{
      const response = await fetch("/logout/logout",{
        method:"GET",
        header:{
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials:"include",
      });

      if(response.status === 200){
        console.log(response.status);
        navigate(`/`);
      }
      else{
        // console.log("Didnt match nasujfn")
      }
    }
    catch(error){
      console.log(error.message);
    }
  }

  useEffect
  (() => {
    calldashboardpage();
  });

  useEffect(()=>{
    DeleteCookie();
  });

  const dataTransfer = (key) => {
    const Temp = Data.filter((elem, ind) => {
      return ind === key;
    });
    setData2([...Data2, Temp[0]]);
    const Temp1 = Data.filter((elem, ind) => {
      return ind !== key;
    });
    setData(Temp1);
  };

  const reverseTransfer = (key) => {
    const Temp5 = Data2.filter((elem, ind) => {
      return ind === key;
    });
    setData([...Data, Temp5]);
    const Temp3 = Data2.filter((elem, ind) => {
      return ind !== key;
    });
    setData2(Temp3);
  };

  return (
    <div>
      <nav id="navbar">
        <ul>
          <li>
            <Link Link to="/about" className="Link">
              About
            </Link>
          </li>
          <li>
            <Link Link to="/" className="Link" onClick={DeleteCookie}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <>
        <h2>Hello</h2>
        <div className="container">
          <div className="sidebar">
            <h2>Users</h2>

            {Users.map((elem, ing) => {
              return (
                // <ul className="UsersNamesList"></ul>
                  <li key={ing} className="UserName">
                    {elem}
                  </li>
              );
            })}

          </div>
          <div className="task-container">
            <div className="ongoing-tasks">
              <h2 className="TaskOngoingHeading">Ongoing Tasks</h2>

              {Data.map((name, key) => {
                return (
                  // <ul className="List">
                    <li
                      className="TaskOngoing"
                      key={key}
                      onClick={() => {
                        dataTransfer(key);
                      }}
                    >
                      ☐{name}{" "}
                    </li>
                  // </ul>
                );
              })}

              <div className="InputAdd">
                <input
                  className="TaskInput"
                  value={Input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <button
                  className="AddTaskButton"
                  onClick={() => {
                    setData([...Data, Input]);
                    setInput("");
                  }}
                >
                  Add Task +{" "}
                </button>
              </div>
            </div>

            <div className="completed-tasks">
              <h2 className="TaskCompletedHeading">Completed Tasks</h2>

              {Data2.map((elem, key) => {
                return (
                  // <ul className="List">
                    <div
                      className="ListDivision"
                      key={key}
                      onClick={() => {
                        reverseTransfer(key);
                      }}
                    >
                      <div className="TickMark">☑️</div>{" "}
                      <li className="TaskCompleted">{elem}</li>
                    </div>
                  // </ul>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ButtonDiv">
          <button className="Button1">Reload</button>
          <button className="Button">Save</button>
        </div>
      </>
    </div>
  );
}

export default Dash;
