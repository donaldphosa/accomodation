import React from 'react'
import './navbar.css'

function Navbar() {
  return (
    <nav className='navbar'>
        <h1>Air BnB</h1>
       <div className='btn'>
        <button>Login</button>
        <button>Register</button>
       </div>

    </nav>
  )
}

export default Navbar