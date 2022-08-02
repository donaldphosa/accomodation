import React,{useState} from 'react'
import './auth.css'


import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {auth }from '../../firebaseConfig'



function Auth({tab,setAccountAccess}) {



  return <div className='pop-up'>
   { tab==="login"&&<Login setAccountAccess={setAccountAccess}/>}
   { tab==='singup'&&<Register setAccountAccess={setAccountAccess}/>}
    </div>
}



const Login=({setAccountAccess})=>{

    
  
    const [loginEmail,setLoginEmail]=useState()
    const [loginPassword,setLoginPassword]=useState()

    const loguser = async() =>{
        try{
            const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
            
            
            }catch(error){
                console.log(error.message)
            }
    }
    

    return <div className='account-container'>
    <input placeholder='Email'
        onChange={(e)=>{
            setLoginEmail(e.target.value)
        }}
    />
    <input placeholder='Password' 
    type='password'
        onChange={(e)=>{
            setLoginPassword(e.target.value)
        }}
    />
    <button onClick={()=>{

    
        loguser()
        setAccountAccess()
        
     } }>Log in</button>
</div>
}

const Register=({setAccountAccess})=>{
    const [registerEmail,setRegisterEmail]=useState()
    const [registerPassword,setRegisterPassword]=useState()
    const [comfirmPassword,setComfirmPassword]=useState()

    const register = async() =>{
    
        try{
            if(registerPassword===comfirmPassword){
          await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
            }
        }catch(error){
            console.log(error.message)
        }
      
    }

    return  <div className='account-container'> 
        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <input placeholder='Name'/>
            <input placeholder='Surname'/>
        </div>        
    <input placeholder='Email'
        onChange={(e)=>{
            setRegisterEmail(e.target.value)
        }}
    />
    <input placeholder='Password'
    type='password'
    onChange={(e)=>{
        setRegisterPassword(e.target.value)
    }}
    />
    <input placeholder='Confirm Password'
    type='password'
    onChange={(e)=>{
        setComfirmPassword(e.target.value)
    }}
    />
<button
    onClick={()=>{
        register()
        setAccountAccess(false)
    }
    }
>Create Account</button>

</div>
}

export default Auth


// setAccountAccess(prev=>!prev)