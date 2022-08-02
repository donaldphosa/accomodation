import React, { useEffect, useState } from 'react'
import Card from '../../components/services/Card'
import MailList from '../../components/mailList/MailList'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';
import './home.css'
import Hotels from '../../components/hotels/Hotels'

function Home({info}) {
  
  const [index, setIndex] = useState(0)
  const [hotel, setHotel] = useState([])
  const [resort, setResort] = useState([])
  const [apartment, setApartment] = useState([])

  useEffect(()=>{
    setHotel(info.filter((filter)=>{return filter.type === 'hotel' }))
    setResort(info.filter((filter)=>{return filter.type === 'resort' }))
    setApartment(info.filter((filter)=>{return filter.type === 'Apartment' }))
  setInterval(() => {
    setIndex(Math.floor(Math.random()*7))
    return
  }, 15000);
},[info])
 
  return (
    <>
  
    <div className='services-main'>
   
      <div className="services">  
     
      <Card length={hotel.length} img={hotel[index]?.img} type={hotel[index]?.type}/>
      <Card length={resort.length} img={resort[index]?.img} type={resort[index]?.type}/>
      <Card length={apartment.length} img={apartment[index]?.img} type={apartment[index]?.type}/>
     
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
          
     {info.map((data, index)=>{
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