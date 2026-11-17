import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";


function Login ({setToken}){
const navigate = useNavigate();
const [username ,setUsername] = useState("");
const [password,setPassword]= useState("");


const handleLogin = async()=>{
 const response = await  axios.post("http://127.0.0.1:8000/tasks/api/login/",{
    username:username,
    password:password
  } 
  );
  const token = response.data.access;
  setToken(token);
  localStorage.setItem("access",token);
  localStorage.setItem("refresh",response.data.refresh);
  //console.log(response.data);
 //  await fetchTask(token);
   navigate("/dashboard");
   
};
return(

<div>
      <h1>Task Management</h1>
      <p>Please login to continue!</p>
      <p>Username</p>
       <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
       />
       <p>Password</p>
        <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
       />
       <button onClick={handleLogin}>Login</button>
       <Link to="/forgot-password">Forgot Password?</Link>    
      </div>
);





}

export default Login ;