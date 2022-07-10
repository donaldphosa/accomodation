import React from 'react'
import './search.css'
import { GoLocation } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

function Search({data}) {
 const navigate = useNavigate()
  return (
    <div className='searched'>
      {
        data.map((data,index)=>{
          return <div className='container' key={index}>
            <img src={data.img}/>
            <div className='detail'>
            <h4>{data.name}</h4>
            <p className='ratings'>{data.ratings} Rating</p>
            <span>R {data.price.toFixed(2)}</span>
            <span><GoLocation/><p>{data.location}</p></span>
            <button
            onClick={()=>{
              navigate(`/accomodation/${data.id}`)
            }}
            className='action-button'>Availability</button>
            </div>
         
          </div>
        })
      }  
      
    </div>
  )
}

export default Search