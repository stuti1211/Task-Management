import { useState } from "react"
import { Routes, Route } from "react-router-dom";
import CreateTask from "./CreateTask";
import Login from "./Login";
import Dashboard from "./Dashboard";
import axios from "axios";


function App() {

 const [tasks,setTasks] = useState([]);
 const [token, setToken] = useState("");
 const [selectedtask , setSelectedtask] = useState(null);
  
 const fetchTask = async(token)=>{
    const response = await axios.get("http://127.0.0.1:8000/tasks/api/",
    {
        headers:{
        Authorization: `Bearer ${token} `
        }
    }
    );
    console.log(response.data);
    setTasks(response.data);
}

const handleDelete = async(id)=>{
   const token = localStorage.getItem("access");
   console.log("token",token);
   const response = await axios.delete(`http://127.0.0.1:8000/tasks/api/delete/${id}`,
     {
      headers:{
        Authorization :`Bearer ${token}`
      }
     }
   );
   console.log(response.data);
}
  return (
    <Routes>
    <Route path="/login" element={<Login setToken={setToken}/>} />
    <Route path="/dashboard" element={<Dashboard  token={token} tasks={tasks} fetchTask={fetchTask} setSelectedtask={setSelectedtask} handleDelete={handleDelete}/>} />
    <Route path="/create-task" element={<CreateTask token={token} fetchTask={fetchTask} selectedtask={selectedtask}/>} />
    </Routes>
  )
}

export default App