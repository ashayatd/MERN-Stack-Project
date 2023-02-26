import "./AdminDashboard.css";
import { React, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [OngoingTasks, setOngoingTasks] = useState([]);
  const [Description, setDescription] = useState("");
  const [Name, setName] = useState("Sample Name");
  const [CompletedTasks, setCompletedTasks] = useState([]);
  const [Input, setInput] = useState("");
  const [userName, setuserName] = useState([]);
  const [userToken, setuserToken] = useState("");
  const [Request, setRequest] = useState([]);
  const [Event, setEvent] = useState("");
  const [Clicked, setClicked] = useState("");

  const navigate = useNavigate();

  async function callAdminDashboard() {
    try {
      const res = await fetch("/admin/authenticate", {
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
    } catch (error) {
      console.log(error);
      navigate(`/`);
    }
  }

  async function fetchrequests() {
    try {
      const res = await fetch("/admin/fetchrequests", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          credentials: "include",
        },
      });
      const data = await res.json();
      console.log("fetchData", data);
      setRequest(data);
    } catch (error) {
      console.log("error fetching request", error);
    }
  }

  async function createUser(elem) {
    const data = {
      _id: elem._id,
      email: elem.email,
      username: elem.username,
      password: elem.password,
      role: "admin",
      __v: 0,
    };

    try {
      const res = await fetch("/admin/admincreateuser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.log("fetcherror:", error);
    }
  }

  async function deleteUser(elem) {
    const data = {
      _id: elem._id,
      email: elem.email,
      username: elem.username,
      password: elem.password,
      role: "admin",
      __v: 0,
    };
    try {
      const res = await fetch("/admin/admindeleteuser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (res.status === 201) {
        console.log("Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function AddTaskClicked() {
    AddTasksApi();
    // sendemail();
    setClicked("abcd");
  }

  const callUsername = async () => {
    try {
      const res = await fetch("/admin/username", {
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
      console.log("Error in: " + error);
    }
  };

  async function fetchUser() {
    try {
      const res = await fetch("/admin/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 201) {
        const Userentiredata = await res.json();
        setuserName(Userentiredata);
        //  setuserID(Userentiredata.userCreated);
        //  console.log("username: ", userName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function makeAdmin() {
    try {
      console.log("UserToken 76:", userToken);
      const res = await fetch("/admin/makeadmin", {
        method: "POST",
        body: JSON.stringify({ token: userToken }),
        header: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (res.status !== 201) {
        console.log(`Error in Admin request`, res.status);
      } else if (res.status === 201) {
        window.alert(res.msg);
      }
    } catch (error) {
      console.log("Error in Admin: ", error);
    }
  }

  async function fetchUserstasks(e) {
    console.log("fetch user task called");
    const x = e.target.value;
    setuserToken(x);

    if (e.target.value === "5011") {
      setOngoingTasks([]);
      setCompletedTasks([]);
      return window.alert("Please Select User");
    }

    try {
      const url = "/admin/users-tasks/" + x;
      const tasks = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
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
      console.log("error in fetchuser: ", error);
    }
  }

  async function DeleteCookie() {
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
  }

  async function dataTransfer(key) {
    try {
      console.log(OngoingTasks);
      const tempdata = OngoingTasks.filter((elem, id) => {
        return id !== key;
      });
      const tempdata2 = OngoingTasks.filter((elem, id) => {
        return id === key;
      });
      console.log("tem2 data: ", tempdata2);
      // let tmp = OngoingTasks.splice(key,1);
      // const newArr = [...tmp];
      // setOngoingTasks(newArr);
      // console.log(newArr);
      setOngoingTasks(tempdata);
      setCompletedTasks([...CompletedTasks, tempdata2[0]]);
    } catch (error) {
      console.log(error);
    }
  }

  async function dataTransferApi(key) {
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
  }

  async function reverseTransferApi(key) {
    try {
      const res = await fetch("/admin/reverse-task", {
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
  }

  async function reverseTransfer(key) {
    try {
      console.log(CompletedTasks);
      const tempdata = CompletedTasks.filter((elem, id) => {
        return id !== key;
      });
      const tempdata2 = CompletedTasks.filter((elem, id) => {
        return id === key;
      });
      console.log("tem2 data: ", tempdata2);
      // let tmp = OngoingTasks.splice(key,1);
      // const newArr = [...tmp];
      // setOngoingTasks(newArr);
      // console.log(newArr);
      setCompletedTasks(tempdata);
      setOngoingTasks([...OngoingTasks, tempdata2[0]]);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCompletedTasks(key) {
    try {
      const res = await fetch("/admin/admindeleteTask", {
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
  }

  async function deleteTask(key) {
    const temp10 = CompletedTasks.filter((elem, id) => {
      return key != id;
    });
    setCompletedTasks(temp10);
  }

  async function UpdateDataTitle(key, updatedTask) {
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
  }

  async function AddTasksApi() {
    if (Event === "") {
      window.alert("Please select a User.");
    }
    const taskInput = {
      task: {
        title: Input,
        description: "",
      },
      status: false,
      userCreated: userToken,
    };

    try {
      const AddTasksResp = await fetch("/admin/adminaddtask", {
        method: "POST",
        body: JSON.stringify(taskInput),
        headers: {
          Accept: "application/json",
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
  }

  // async function AddTasks(){
  //   setOngoingTasks([...OngoingTasks, Input]);
  // }

  // const sendemail = async () => {
  //   try {
  //     const res = await fetch("/admin/sendemail", {
  //       method: "POST",
  //       body: JSON.stringify({ email: " ashay.tamrakar@gmail.com" }),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    callUsername();
    fetchUser();
    callAdminDashboard();
    fetchUserstasks(Event);
  }, []);

  useEffect(() => {
    fetchUserstasks(Event);
  }, [userName, Clicked]);

  useEffect(() => {
    fetchrequests();
  }, []);

  return (
    <div className="reg-main_background">
      <div className="admin-navbarBackground">
        <div className="admin-navbarBackground2"></div>
      </div>{" "}
      <nav>
        <img src="https://productsinsights.com/wp-content/uploads/2023/02/image_2023-02-26_003602374-removebg-preview-e1677352754630.png" 
        className="logo"/>
        <ul id="admin-reg-navbar">
          <li>
            <Link Link to="/about" className="reg-Link">
              About
            </Link>
          </li>
          <li>
            <Link
              Link
              to="/"
              className="reg-Link"
              onClick={() => {
                DeleteCookie();
              }}
            >
              Logout
            </Link>
          </li>
          <li className="bell">
            <i class="bi bi-bell"></i>
          </li>
        </ul>
      </nav>
      <Outlet />
      <>
        <h2 className="displayName">Hello, {Name}</h2>
        <div className="container">
          <div className="users">
            <h2 className="TaskOngoingHeading">Users</h2>
            <select
              className="reg-select-tag"
              onChange={(e) => {
                setEvent(e);
                fetchUserstasks(e);
              }}
            >
              <option value={"5011"}>Select User</option>
              {userName.map((date, key) => {
                return (
                  <option key={date.userCreated} value={date.token}>
                    {" "}
                    {date.username}
                  </option>
                );
              })}
            </select>
            <button
              className="admin-button"
              onClick={() => {
                makeAdmin();
              }}
            >
              Make Admin
            </button>

            <div className="request-panel">
              {Request.map((eleme, key) => {
                return (
                  <div key={key} className="request-item">
                    <div>{eleme.username}</div>
                    <div className="request-acc-rej">
                      <button
                        onClick={() => {
                          createUser(eleme);
                        }}
                      >
                        ✔️
                      </button>
                      <button
                        onClick={() => {
                          deleteUser(eleme);
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="task-container">
            <div className="ongoing-tasks">
              <h2 className="TaskOngoingHeading">Ongoing Tasks</h2>

              <ul className="List">
                {OngoingTasks.map((name, key) => {
                  return (
                    <li className="TaskOngoing" key={key}>
                      <div
                        className="checkbox"
                        onClick={() => {
                          dataTransferApi(name._id);
                          dataTransfer(key);
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
                  className="AddTaskButton"
                  onClick={() => {
                    AddTaskClicked();
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
                          className="cross"
                          onClick={() => {
                            deleteCompletedTasks(name._id);
                            deleteTask(key);
                          }}
                        >
                          ❌
                        </span>
                        <span
                          className="blue-tick"
                          onClick={() => {
                            reverseTransferApi(name._id);
                            reverseTransfer(key);
                          }}
                        >
                          {" "}
                          &#160;&#160;&#160;&#160;&#160;&#160;✅
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
      </>
    </div>
  );
}

export default AdminDashboard;
