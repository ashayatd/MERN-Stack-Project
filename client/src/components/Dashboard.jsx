import { React, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dash() {

  const [OngoingTasks, setOngoingTasks] = useState([" Task 1", " Task 2", " Task 3"]);
  const [Users, setUsers] = useState(["Name 1", "name 2", "name 3" ]);
  const [Description, setDescription] = useState("");

  const [CompletedTasks, setCompletedTasks] = useState([" abc", " def", " ghi"]);
  const [Input, setInput] = useState("");

  const navigate = useNavigate();

  const calldashboardpage = async () => {

    try {
      const res = await fetch("/user/authenticate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 201) {
        const error = new Error(res.error);
        navigate(`/`);
        throw error;
      }
      //res = res.json();
      //setUsers(res);
    }

     catch (error) {
      console.log(error);
      navigate(`/`);
    }
  };

  const DeleteCookie = async ()=>{
    try{
      const response = await fetch("/logout",{
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
    //DeleteCookie();
  });

  const dataTransfer = (key) => {
    const Temp = OngoingTasks.filter((elem, ind) => {
      return ind === key;
    });
    setCompletedTasks([...CompletedTasks, Temp[0]]);
    const Temp1 = OngoingTasks.filter((elem, ind) => {
      return ind !== key;
    });
    setOngoingTasks(Temp1);
  };

  const reverseTransfer = (key) => {
    const Temp5 = CompletedTasks.filter((elem, ind) => {
      return ind === key;
    });
    setOngoingTasks([...OngoingTasks, Temp5]);
    const Temp3 = CompletedTasks.filter((elem, ind) => {
      return ind !== key;
    });
    setCompletedTasks(Temp3);
  };

  const AddTasks = async ()=>{
    setOngoingTasks([...OngoingTasks, Input]);
    setInput("");
    
    try{
      const AddTasksResp = await fetch("/Api/addTask",{
        method:"POST",
        body: JSON.stringify({
          data: { Input, Description },
        }),
        header:{
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials:"include",
      });

      if(AddTasksResp.status !== 201){
        window.alert(AddTasksResp.message);
      }
    }
    catch(error){
      console.log(error.message);
    }
  }

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

              {OngoingTasks.map((name, key) => {
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
                  onClick={AddTasks}
                >
                  Add Task +{" "}
                </button>
              </div>
            </div>

            <div className="completed-tasks">
              <h2 className="TaskCompletedHeading">Completed Tasks</h2>

              {CompletedTasks.map((elem, key) => {
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
