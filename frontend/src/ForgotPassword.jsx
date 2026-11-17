import { useState } from "react";
import axios from "axios"; 

function ForgotPassword(){

    const[email ,setEmail] = useState("");
    const [message, setMessage] = useState("");
     
    const  handleReset = async()=>{
      console.log(email);
      try{
         const response = await axios.post("http://127.0.0.1:8000/tasks/api/forgot-password/",
        {
            "email":email
        }
      )
       console.log(response.data.message);
       setMessage(response.data.message);
    }
      catch(error){
        console.log(error.response?.data)
      }
      
    };

    return(
        <div>
            <h1>Frgot Password</h1>
            <p>Enter your email</p>
            <input
              value={email}
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <button onClick={handleReset}>Send Reset Link</button>
            <p>{message}</p>
        </div>
    )
}

export default ForgotPassword;