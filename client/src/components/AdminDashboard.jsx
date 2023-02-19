import "./AdminDashboard.css";
import { React, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [OngoingTasks, setOngoingTasks] = useState([]);
  const [Users, setUsers] = useState(["Name 1", "name 2", "name 3"]);
  const [Description, setDescription] = useState("");

  const [CompletedTasks, setCompletedTasks] = useState([]);
  const [Input, setInput] = useState("");
  const [updatedTask, setupdatedTask] = useState("");
  const [userName, setuserName] = useState("");

  const navigate = useNavigate();

  const callAdminDashboard = async () => {
    try {
      const res = await fetch("/user/authenticate", {
        method: "POST",
        header: {
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
    } catch (error) {
      console.log(error);
      navigate(`/`);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch('/admin/users',{
        method:"GET", 
        headers:{
          Accept:"application/json",
          "Content-type":"application/json",
        },
        credentials:"include"
      });

      if(res.status === 201){
       const Userentiredata = await res.json();
       setuserName(Userentiredata.users);
      }
    } catch (error) {
      console.log(error);
    }
  }

console.log(userName);
  useEffect(() => {
    fetchUser();
  }, []);


  const fetchUserstasks = async (e)=>{
    try {
      const tasks = await fetch("/admin/users-tasks", {
        method: "GET", 
        body: JSON.stringify({userId: e.target.value}),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials:"include",
      });
      if (tasks.status !== 201) {
        const error = new Error(tasks.error);
        throw error;
      }
       const data = await tasks.json();
       const Temp = data.filter((elem, ind) => {
        return elem.status === false;
      });
      setOngoingTasks(Temp);

      const Temp2 = data.filter((elem, ind) => {
        return elem.status === true;
      });
      setCompletedTasks(Temp2);
      
    } catch (error) {
      console.log(error);
    }

  }

  const DeleteCookie = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        console.log(response.status);
        navigate(`/`);
      } else {
        // console.log("Didnt match nasujfn")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const dataTransfer = async (key) => {
    try {
      const res = await fetch("/admin/task-completed", {
        method: "POST",
        body: JSON.stringify({ ide: key }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 201) {
        window.alert(`Error in Transfering Data: `, res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reverseTransfer = async (key) => {
    try {
      const res = await fetch("/admin/", {
        method: "POST",
        body: JSON.stringify({ ide: key }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 201) {
        window.alert(`status:`, res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCompletedTasks = async (key) => {
    try {
      const res = await fetch("/api/deleteTask", {
        method: "POST",
        body: JSON.stringify({ ide: key }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 201) {
        window.alert(`status:`, res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateDataTitle = async (key, updatedTask) => {
    try {
      const res = await fetch("/admin/adminupdatetitle", {
        method: "POST",
        body: JSON.stringify({ ide: key, newTitle: updatedTask }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 201) {
        window.alert(`status:`, res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddTasks = async () => {
    const taskInput = {
      task: {
        title: Input,
        description: "",
      },
      status: false,
    };
    setInput("");

    try {
      const AddTasksResp = await fetch("/api/addTask", {
        method: "POST",
        body: JSON.stringify({
          title: Input,
          Description: "",
          status: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (AddTasksResp.status !== 201) {
        window.alert(`Status:` + AddTasksResp.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    callAdminDashboard();
    // fetchTasks();
  }, [deleteCompletedTasks, dataTransfer]);

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
            <div className="users">
              <h2 className="TaskOngoingHeading">Users</h2>
              <option className="listOfUsers">
                {
                  userName.map((name, key)=>{
                    return (
                    <select key={key} value={name._id} 
                    onChange={(e)=>{fetchUserstasks(e)}}
                    > {name.username} </select>
                    )
                  })
                }
              </option>
            </div>
          <div className="task-container">



            <div className="ongoing-tasks">
              <h2 className="TaskOngoingHeading">Ongoing Tasks</h2>

              <ul className="List">
                {OngoingTasks.map((name, key) => {
                  return (
                    <li className="TaskOngoing" key={name._id}>
                      <div
                        className="checkbox"
                        onClick={() => {
                          dataTransfer(name._id);
                        }}
                      >
                        ☐&#160;&#160;&#160;&#160;&#160;
                      </div>{" "}
                      <div
                        className="WrittenContent"
                        spellCheck={false}
                        contentEditable={false}
                        onBlur={(e)=>{
                          UpdateDataTitle(name._id, e.target.innerText)
                          console.log(e.target.innerText)}}
                      >
                        {name.task.title}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="InputAdd">
                <input
                  className="TaskInput"
                  value={Input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <button className="AddTaskButton" onClick={AddTasks}>
                  Add Task +{" "}
                </button>
              </div>
            </div>

            <div className="completed-tasks">
              <h2 className="TaskCompletedHeading">Completed Tasks</h2>

              <ul className="List">
                {CompletedTasks.map((name, key) => {
                  return (
                    <div
                      className="ListDivision"
                      key={name._id}
                      onClick={() => {
                        reverseTransfer(name._id);
                      }}
                    >
                      <div className="TickMark">
                        <span
                          onClick={() => {
                            deleteCompletedTasks(name._id);
                          }}
                        >
                          ❌
                        </span>
                        &#160;&#160;&#160;&#160;&#160;&#160;☑️
                      </div>{" "}
                      <li className="TaskCompleted">{name.task.title}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default AdminDashboard;
