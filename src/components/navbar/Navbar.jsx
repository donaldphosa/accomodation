import React from "react";
import { useState, useEffect } from "react";
import "./navbar.css";

import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import {Navigate, useNavigate} from 'react-router-dom'


function Navbar({ setAccountAccess, setTab, tab, logged, setLogged }) {
  const [user, setUser] = useState();
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user) {
      setLogged(true);
    }
  }, [user]);

  return (
    <nav className="navbar">
      <h1>Air BnB</h1>

      {logged ? (
        <UserProfile user={user}/>
      ) : (
        <div className="btn">
          <button
            onClick={() => {
              if (tab === "login") {
                setAccountAccess((prev) => !prev);
              }
              setTab("login");
            }}
            style={{ backgroundColor: "white" }}
          >
            Login
          </button>
          <button
            onClick={() => {
              if (tab === "singup") {
                setAccountAccess((prev) => !prev);
              }
              setTab("singup");
            }}
            style={{ backgroundColor: "white" }}
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
}

const UserProfile = ({user}) => {

  const [active,setActive] = useState(false)
  const logout = async () => {
    await signOut(auth).then(()=>{
      navigate('/');
    });
  };
  const navigate = useNavigate()
  return (
    <div className="user">
     
      <p>history</p>
      <p
      onClick={()=>{
        navigate('/history')
        window.location.reload()
      }}
      >Booked</p>
      <p
        onClick={()=>{
          setActive(prev=>!prev)
        }}
      >Settings</p>
      <div className="sett" style={active?{display:'flex'}:{display:'none'}}>
      <p style={user.email === 'donaldbossd@gmail.com'?{}:{display:'none'}}
        onClick={()=>{
          navigate('/add')
        }}
      >Add Hotel</p>


<p
        onClick={() => {
          logout();
          window.location.reload();
        }}
      >
        log out
      </p>
      </div>
    </div>
  );
};

export default Navbar;
