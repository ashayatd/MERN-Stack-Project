import { React, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dash() {
  const [Data, setData] = useState([" Task 1", " Task 2", " Task 3"]);
  const [Users, setUsers] = useState([
    "Name1",
    "Name2",
    "Name3",
    "Name4",
    "Name5",
  ]);
  const [Data2, setData2] = useState([" abc", " def", " ghi"]);
  const [Input, setInput] = useState("");

  const navigate = useNavigate();

  const calldashboardpage = async () => {
    try {
      const res = await fetch("/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "Application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
      }
    } catch (error) {
      console.log(error);
      navigate(`/`);
      window.alert("Please Login Again...");
    }
  };

  // useEffect(() => {
  //   calldashboardpage();
  // });

  const dataTransfer = (key) => {
    const Temp = Data.filter((elem, ind) => {
      return ind === key;
    });
    setData2([...Data2, Temp[0]]);
    const Temp1 = Data.filter((elem, ind) => {
      return ind != key;
    });
    setData(Temp1);
  };

  const reverseTransfer = (key) => {
    const Temp5 = Data2.filter((elem, ind) => {
      return ind === key;
    });
    setData([...Data, Temp5]);
    const Temp3 = Data2.filter((elem, ind) => {
      return ind != key;
    });
    setData2(Temp3);
  };

  return (
    <div>
      <nav id="navbar">
        <ul>
          <li>
            <Link Link to="/" className="Link">
              Home
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
          <li>
            <Link Link to="/dashboard" className="Link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link Link to="/" className="Link">
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
                <ul className="UsersNamesList">
                  <li key={ing} className="UserName">
                    {elem}
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="task-container">
            <div className="ongoing-tasks">
              <h2 className="TaskOngoingHeading">Ongoing Tasks</h2>

              {Data.map((name, key) => {
                return (
                  <ul className="List">
                    <li
                      className="TaskOngoing"
                      key={key}
                      onClick={() => {
                        dataTransfer(key);
                      }}
                    >
                      ☐{name}{" "}
                    </li>
                  </ul>
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
                  <ul className="List">
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
                  </ul>
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
