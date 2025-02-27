import { React, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dash() {
  const [OngoingTasks, setOngoingTasks] = useState([]);
  const [Description, setDescription] = useState("");
  const [CompletedTasks, setCompletedTasks] = useState([]);
  const [Input, setInput] = useState("");
  const [Name, setName] = useState("Sample Name");
  const [Request, setRequest] = useState(["name 1", "name 2", "name 3"]);
  const [Sample, setSample] = useState("");

  const navigate = useNavigate();

  const callUsername = async () => {
    try {
      console.log("Username function Called");

      const res = await fetch("api/username", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const UsersName = await res.json();

      if (res.status === 201) {
        setName(UsersName.UserName);
      }
    } catch (error) {
      console.log("Error in: " + error.stack);
    }
  };

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

      // const tempUser = await res.json();
      // console.log(tempUser);

      if (res.status !== 201) {
        const error = new Error(res.error);
        navigate(`/`);
        throw error;
      }

      //setUsers(res);
    } catch (error) {
      console.log(error);
      navigate(`/`);
    }
  };

  const fetchTasks = async () => {
    console.log("fetchTask Called");
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

      const Temp2 = data.filter((elem, ind) => {
        return elem.status === true;
      });
      setCompletedTasks(Temp2);
    } catch (error) {
      console.log(error);
    }
  };

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
      const res = await fetch("/api/completeTask", {
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
  const datatransferFE = async (key) => {
    try {
      console.log(OngoingTasks);
      const tempdata = OngoingTasks.filter((elem, id) => {
        return id !== key;
      });
      const tempdata2 = OngoingTasks.filter((elem, id) => {
        return id === key;
      });
      console.log("tem2 data: ", tempdata2);
      setOngoingTasks(tempdata);
      setCompletedTasks([...CompletedTasks, tempdata2[0]]);
    } catch (error) {
      console.log(error);
    }
  };

  const reverseTransfer = async (key) => {
    try {
      const res = await fetch("/api/redoTask", {
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
  const reverseTransferFE = async (key) => {
    try {
      console.log(CompletedTasks);
      const tempdata = CompletedTasks.filter((elem, id) => {
        return id !== key;
      });
      const tempdata2 = CompletedTasks.filter((elem, id) => {
        return id === key;
      });
      console.log("tem2 data: ", tempdata2);
      setCompletedTasks(tempdata);
      setOngoingTasks([...OngoingTasks, tempdata2[0]]);
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

  const deleteCompletedTasksFE = async (key) => {
    try {
      const temp10 = CompletedTasks.filter((elem, id) => {
        return key != id;
      });
      setCompletedTasks(temp10);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateDataTitle = async (key, updatedTask) => {
    try {
      const res = await fetch("/api/updateTask", {
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
    fetchTasks();
  }, [Sample]);

  useEffect(() => {
    calldashboardpage();
  }, []);

  useEffect(() => {
    callUsername();
  }, []);

  return (
    <div className="dashboard-main_background">
      <div className="navbarBackground">
        <div className="navbarBackground2"></div>
      </div>{" "}
      <nav>
        <ul id="navbar">
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
      <h2 className="dash-displayName">Hello, {Name} </h2>
      <div className="dash-main-div">
        <div className="dash-container">
          <div className="task-container">
            <div className="ongoing-tasks">
              <h2 className="TaskOngoingHeading">Ongoing Tasks</h2>

              <ul className="List">
                {OngoingTasks.map((name, key) => {
                  return (
                    <li className="dash-TaskOngoing" key={key}>
                      <div
                        className="checkbox"
                        onClick={() => {
                          dataTransfer(name._id);
                          datatransferFE(key);
                        }}
                      >
                        ☐&#160;&#160;&#160;&#160;&#160;
                      </div>{" "}
                      <div
                        className="WrittenContent"
                        spellCheck={false}
                        contentEditable={true}
                        onBlur={(e) => {
                          UpdateDataTitle(name._id, e.target.innerText);
                          console.log(e.target.innerText);
                        }}
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
                <button
                  className="dash-AddTaskButton"
                  onClick={() => {
                    AddTasks();
                  }}
                >
                  Add Task +{" "}
                </button>
              </div>
            </div>

            <div className="completed-tasks">
              <h2 className="TaskOngoingHeading">Completed Tasks</h2>

              <ul className="List">
                {CompletedTasks.map((name, key) => {
                  return (
                    <div className="ListDivision" key={key}>
                      <div className="TickMark">
                        <span
                          onClick={() => {
                            deleteCompletedTasks(name._id);
                            deleteCompletedTasksFE(key);
                          }}
                        >
                          ❌&#160;&#160;&#160;&#160;&#160;&#160;
                        </span>
                        <span
                          onClick={() => {
                            reverseTransfer(name._id);
                            reverseTransferFE(key);
                          }}
                        >
                          ✅
                        </span>
                      </div>{" "}
                      <li className="TaskCompleted">{name.task.title}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
