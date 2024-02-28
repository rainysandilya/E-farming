import React ,{useContext}from 'react'
import { Outlet , NavLink} from 'react-router-dom';
import './Rootlayout.css';
import { loginContext} from '../contexts/loginContext';

function Rootlayout() {
   
  const [currentUser, loginErr, userloginStatus, loginUser,logoutUser]  = useContext(loginContext); 

    
  return (
    <div>
        
     <ul className="nav d-flex flex-row justify-content-center b p-2 navbar ">
  {currentUser.usertype==='admin'?(
  <div className='d-flex flex-row'>
    <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Menu" >Menu</NavLink>
  </li>
    
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Addfooditems" >Addfooditems</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Login" onClick={logoutUser}>Logout</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Users" >Users</NavLink>
  </li>
  
  </div>)
  :currentUser.usertype==='user'?
  (
    <div className='d-flex flex-row'>
      <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Menu" >Menu</NavLink>
  </li>
    <li className="nav-item">
    <NavLink className='nav-link fs-2 text-white ' to="/" >Home</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Login" onClick={logoutUser}>Logout</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Aboutus" >Aboutus</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Cart" >Cart</NavLink>
  </li>
  
  </div>

  )
  :
  (
  <div className='d-flex flex-row'>
    <li className="nav-item">
    <NavLink className='nav-link fs-2 text-white ' to="/" >Home</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Login" >Login</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Register" >Register</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className='nav-link fs-2 text-white' to="/Aboutus" >Aboutus</NavLink>
  </li>
  </div>)
  }
</ul>
<div className="outlet-container">
    <Outlet/>
</div>
<div className='bg-dark bg-opacity-25 p-5 text-center'>
    <p >Contact us:08932-266355</p>
    <p >gmail:efarmerportal22@gmail.com</p>
</div>
    </div>
  )
}

export default Rootlayout