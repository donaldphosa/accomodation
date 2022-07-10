import React from 'react'
import './hotels.css'
import { GoLocation } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';


function Hotels({img,location,price,name,id}) {
  const navigate = useNavigate()
  return (
    <main className='acc-card'>
       <img src={img} alt="" />
     <div className="hotel-details">
        <h5>{name}</h5>
        <p>R {price}</p>
        <span><GoLocation/><p>{location}</p></span>
        <button
        onClick={()=>{
          navigate(`/accomodation/${id}`)
        }}
        >view details</button>
     </div>
    </main>
  )
}

export default Hotels