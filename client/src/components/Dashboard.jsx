import { React, useState, useEffect, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dash() {

  const [OngoingTasks, setOngoingTasks] = useState([]);

  const [Users, setUsers] = useState(["Name 1", "name 2", "name 3"]);
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

  const fetchTasks = async ()=>{
    try {
      const res = await fetch("/api/fetchTask", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 201) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      const Temp = data.filter((elem, ind) => {
        return elem.status === false;
      });
      setOngoingTasks(Temp);
    }

     catch (error) {
      console.log(error);
    }
  }

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
    fetchTasks();
  });
  


  useEffect(()=>{
    //DeleteCookie();
  });

  const dataTransfer = (data, key) => {
    const Temp = OngoingTasks.filter((elem,ind) => {
      return elem._id === key;
    });
    setCompletedTasks([...CompletedTasks, Temp[0]]);
    const Temp1 = OngoingTasks.filter((elem, ind) => {
      return elem._id !== key;
    });
    setOngoingTasks(Temp1);
  };

  const reverseTransfer = (key) => {
    const Temp5 = CompletedTasks.filter((elem, ind) => {
      return elem._id === key;
    });
    setOngoingTasks([...OngoingTasks, Temp5]);
    const Temp3 = CompletedTasks.filter((elem, ind) => {
      return elem._id !== key;
    });
    setCompletedTasks(Temp3);
  };

  const AddTasks = async ()=>{
    const taskInput = {
      task : {
        title : Input,
        description : "",
      },
      status : false,
    }
    setOngoingTasks([...OngoingTasks, taskInput]);
    setInput("");

    try{

      const AddTasksResp = await fetch("/api/addTask", {
        method: "POST",
        body: JSON.stringify({
          title:Input, Description:"", status:false
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      if(AddTasksResp.status !== 201){
        window.alert(`Status:`+ AddTasksResp.status );
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

              <ul className="List">{OngoingTasks.map((name, key) => {
                return (

                    <li
                      className="TaskOngoing"
                      key={name._id}
                      onClick={() => {
                        dataTransfer(key);
                      }}
                    >
                      ☐ { name.task.title}{" "}
                    </li>

                );
              })}</ul>

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

              <ul className="List">{CompletedTasks.map((elem, key) => {
                return (
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
                );
              })}</ul>
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
