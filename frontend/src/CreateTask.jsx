import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTask({token,fetchTask ,selectedtask}){
//console.log(selectedtask);
const navigate = useNavigate();
const [title,setTitle] =useState("");
const [description,setDescription] = useState("");
const [status,setStatus] = useState("pending");
const [priority ,setPriority] = useState("medium");

useEffect(()=>{
    if (selectedtask){
      setTitle(selectedtask.title);
      setDescription(selectedtask.description);
      setPriority(selectedtask.priority);
      setStatus(selectedtask.status);
    }
    else{
        setTitle("");
        setDescription("");
        setPriority("medium");
        setStatus("pending");
    }
      
},[selectedtask])


const handleCreateTask = async()=>{
   console.log("Selected task:", selectedtask);
   console.log("gid",token);
    const data ={
    title :title,
    description :description,
    status : status,
    priority :priority
    }
  if(selectedtask===null){
  const response = await axios.post("http://127.0.0.1:8000/tasks/api/create/",
    data
  ,
    {
        headers:{
            Authorization :`Bearer ${token}`
        }
    }
);}
  else{
    const response = await axios.put(`http://127.0.0.1:8000/tasks/api/update/${selectedtask.id}`,
    data
  ,
    {
        headers:{
            Authorization :`Bearer ${token}`
        }
    });
    console.log("Update response:", response.data);
  }
  fetchTask(token);
  navigate("/dashboard");
};
     return(
        <>
        <div>
         <h2>Create a Task</h2>
         <input
           type="text"
           placeholder="title"
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
         />
         <input
           type="text"
           placeholder="description"
           value={description}
           onChange={(e)=>setDescription(e.target.value)}
         />
          <select  value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value ="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
            <select
               value={priority}
               onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>       
            
        </div>
        <button onClick={()=>handleCreateTask()}>Create task</button>
        </>
    );



}

export default CreateTask;