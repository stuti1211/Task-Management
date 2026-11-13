import  {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({tasks ,token ,fetchTask ,setSelectedtask}){
const navigate = useNavigate();

useEffect(()=>{
    fetchTask(token);
},[token])

return(
  <div>
        <h2>Dashboard</h2>
        <button onClick={() => navigate("/create-task")}>Create Task</button>
        {tasks.map((task ,index)=>(
          <ul key={index}>
            <li>{task.title}</li>
            <li>{task.description}</li>
            <li>{task.status}</li>
            <button onClick ={()=> {setSelectedtask(task);
             navigate("/create-task");
             }}>Edit</button>
          </ul>
        ))} 
         
     </div>
)
}


export default Dashboard;