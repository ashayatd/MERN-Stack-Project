import "./AdminDashboard.css";
import { React, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [OngoingTasks, setOngoingTasks] = useState([]);
  const [Description, setDescription] = useState("");

  const [CompletedTasks, setCompletedTasks] = useState([]);
  const [Input, setInput] = useState("");
  const [userName, setuserName] = useState([]);
  const [userToken, setuserToken] = useState("");
  const [Request, setRequest] = useState(["name 1","name 2","name 3" ]);

  const navigate = useNavigate();

  async function callAdminDashboard(){
    try {
      const res = await fetch("/admin/authenticate", {
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

  async function fetchUser(){
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
       console.log(Userentiredata);
       setuserName(Userentiredata);
      //  setuserID(Userentiredata.userCreated);
      //  console.log("username: ", userName);
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function makeAdmin(){
    try {
      console.log("UserToken 76:", userToken);
      const res = await fetch('/admin/makeadmin', {
        method:"POST",
        body: JSON.stringify({token: userToken}),
        header:{
          Accept:"application/json",
          "Content-type":"application/json"
        },
        credentials:"include",
      });
      if(res.status !== 201){
        console.log(`Error in Admin request`, res.status);
      }
      else if(res.status === 201){
        window.alert(res.msg);
      }

      } catch (error) {
      console.log("Error in Admin: ",error);
      }
  }

  async function fetchUserstasks(e){
    const x = (e.target.value);
    setuserToken(x);
    try {
      const url = "/admin/users-tasks/" + x;
      const tasks = await fetch(url, {
        method: "GET",
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
      console.log("error in fetchuser: ",error);
    }
  }

  async function DeleteCookie(){
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

  async function dataTransfer(key){
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

  async function reverseTransfer(key){
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
  };

  async function deleteCompletedTasks(key){
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
  };

  async function UpdateDataTitle(key, updatedTask){
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

  async function AddTasks(){
    const taskInput = {
      task: {
        title: Input,
        description: "",
      },
      status: false,
      userCreated: userToken,
    };

    setInput("");

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
    } 
    catch (error) {
      console.log(error.message);
    }
  };
  useEffect(()=>{
    fetchUser();
    callAdminDashboard();
  },[]);
  
  useEffect(() => {
    fetchUserstasks();
  }, [deleteCompletedTasks, reverseTransfer, dataTransfer]);

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
            <Link Link to="/" className="Link" onClick={()=>{DeleteCookie()}}>
              Logout
            </Link>
          </li>
          <li>
            <select>           
            {
              Request.map((elem, key)=>{
                return (<option key={key} className="optionTag">
                <div>{elem}&#160;&#160;&#160;</div>
                <div>
                  <div>✔️&#160;&#160;</div>
                  <div>❌</div>
                </div>
              </option>);
              })
            }
            </select>
          </li>
        </ul>
      </nav>

      <Outlet />
      <>
        <h2>Hello</h2>
        <div className="container">
            <div className="users">
              <h2 className="TaskOngoingHeading">Users</h2>
              <select className="listOfUsers"  onChange={(e)=>{fetchUserstasks(e)}}>
                <option>Select User</option>
                {
                  userName.map((date, key)=>{
                    return (
                    <option key={date.userCreated} value={date.token}
                    > {date.username}</option>
                    );
                  })
                }
              </select>
              <button className="admin-button" onClick={()=>{makeAdmin()}}>Make Admin</button>
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
                        contentEditable={true}
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
                <button className="AddTaskButton" onClick={()=>{AddTasks()}}>
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
