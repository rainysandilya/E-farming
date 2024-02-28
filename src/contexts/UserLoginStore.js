import React ,{useState} from 'react'
import { loginContext } from './loginContext';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';


function UserLoginStore({children}) {
    

    let [err,setErr]=useState("")
    let [currentUser,setCurrentUser]=useState([]);
    let [loginErr,setLoginErr]=useState("");
    let [userloginStatus,setUserLoginStatus]=useState(false)
    const loginUser=(userCredentialsObj)=>{
        axios.post("http://localhost:3500/user-api/user-login",userCredentialsObj).then(response=>{
            if(response.data.message==="success"){
                localStorage.setItem("token",response.data.token)
                setCurrentUser({...response.data.user})
                setLoginErr("")
                setUserLoginStatus(true)
            }
            else{
                setLoginErr(response.data.message)
            }
        }).catch(err=>{
            console.log("err in user login",err)
        })
    }


    const logoutUser=()=>{
        localStorage.clear();
        setUserLoginStatus(false)
        currentUser.usertype=""
        
    }

  return (
    <div>
        <loginContext.Provider value={[currentUser,loginErr,userloginStatus,loginUser,logoutUser]}>{children}</loginContext.Provider>
    </div>
  )
}

export default UserLoginStore