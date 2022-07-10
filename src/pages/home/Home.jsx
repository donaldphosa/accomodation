import React, { useEffect, useState } from 'react'
import Card from '../../components/services/Card'
import MailList from '../../components/mailList/MailList'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';

import Data from '../../Data'
import './home.css'
import Hotels from '../../components/hotels/Hotels'

function Home({info}) {
  const [data,setData] = useState(info)
  const [index, setIndex] = useState(0)
  const [hotel, setHotel] = useState(data.filter((filter)=>{return filter.type === 'Hotel' }))
  const [resort, setResort] = useState(data.filter((filter)=>{return filter.type === 'Resort' }))
  const [apartment, setApartment] = useState(data.filter((filter)=>{return filter.type === 'Apartment' }))
useEffect(()=>{
  setInterval(() => {
    setIndex(Math.floor(Math.random()*7))
    return
  }, 15000);
},[])
 
  return (
    <>
  
    <div className='services-main'>
   
      <div className="services">  
     
      <Card img={hotel[index].img} type={hotel[index].type}/>
      <Card img={resort[index].img} type={resort[index].type}/>
      <Card img={apartment[index].img} type={apartment[index].type}/>
     
      </div>
     
      </div>
      <div className='hotels'>
        <h3>Browse Our most luxarous homes </h3>

        <Splide  options={ {
        
        pagination: true,
        perPage: 3,
        drag: "free",
        arrows: false,
        gap   : "10px",

        
      } }>
          
     {data.map((data, index)=>{
         return(
            <SplideSlide key={index}>
             <Hotels {...data}/>
               
            </SplideSlide>
         );
     })}
    </Splide>
        
        </div>
      <MailList/>
    
    </>
  )
}

export default Home