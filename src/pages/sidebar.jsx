import React,{useContext, useState} from 'react'
import "./header.css";
import Store from './context';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const {toggle1,handleToggle1} = useContext(Store)
  const [profile,setProfile] = useState(false)
  
  return (
    <>
    
<div className={`sidebar ${toggle1?'collapsed':''}`}>
<i className='fa-solid fa-bars' onClick={handleToggle1}></i>
  <h4  onClick={(prev)=>setProfile(!prev)} className='icon'><Link to="/profile" style={{color:'skyblue',textDecoration:'none',fontSize:'1em'}}><i className="fa-solid fa-user icon" ></i>Profile</Link></h4>

  <h4><i className="fa-solid fa-inbox icon"></i>Inbox</h4>
  <h4><i className="fa-brands fa-rocketchat icon"></i>Chat</h4>
  <h4><i className="fa-solid fa-gear icon"></i>Setting</h4>

  <h4><i className="fas fa-sign-out-alt icon"></i>Log out</h4>
  </div>
    
    </>
  )
}

export default Sidebar;