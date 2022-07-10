import React from 'react'
import Navbar from '../navbar/Navbar'
import './header.css'
import { GoLocation } from 'react-icons/go';
import { useState } from 'react';
import Moment from 'moment';
import {useNavigate} from 'react-router-dom'

function Header({info,setInfo}) {
 
  const [location,setLocation] = useState('all')
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState(0)
  const [type, setType] = useState('all')
  const navigate = useNavigate()

  const datesData={
    endDate: Moment().format("MM/DD/YYYY"),
    startDate: Moment().format("MM/DD/YYYY")
   }
const [dates,setDates]=useState(datesData)


function getNumberDays(){
    const startDate = new Date(dates.startDate)
    const endDate = new Date(dates.endDate)
const days = Math.ceil(Math.abs(startDate - endDate)/(1000*60*60*24))
  return days
}

function filterAccomodation(){
  const id = 'searched'
  const firstFiltered = info.filter((data)=>{
    if(location === 'all'){
      return data
    }
    return data.location.toLowerCase() === location.toLowerCase()
  })
const secondFiltered = firstFiltered.filter((filter)=>{
  if(price === 0){
    return firstFiltered
  }
  return filter.price <= price;
})
const thirdFiltered = secondFiltered.filter((filter)=>{
  if(ratings === 0){
    return secondFiltered
  }
  return filter.ratings <= ratings;
})
const forthFiltered = thirdFiltered.filter((filter)=>{
  if(type === 'all'){
    return thirdFiltered
  }
  return filter.type.toLocaleLowerCase() === type.toLocaleLowerCase();
})

setInfo(forthFiltered)
navigate(`/${id}`)

}


  return (
   <main className='hero-main'>
   <Navbar/>
   <section className='hero'>
        <h1>A lifetime discount? it's genius</h1>
        <p className='header-p'>Get an instants reward for your travels, – unlock instant savings of 10% or
              more with a free AIR BNB account</p>
        <button className='member-btn'>Open Account</button>
   </section>
   <div className='search-filter'>
   <div className='location'>
   <GoLocation fill='#000' fontSize='16px'/>
      <input onChange={(e)=>setLocation(e.target.value)} type='text' id='location' placeholder='Search Location'/>
      
   </div> 
   
    <select
    onChange={(e)=>setPrice(e.target.value)}
    
    >
      <option value='' label='Price' />
      <option value={1000} label='R 1 000' />
      <option value={1500} label='R 1 500' />
      <option value={2000} label='R 2 000' />
      <option value={2500} label='R 2 500' />
      <option value={3000} label='R 3 000' />
      <option value={3500} label='R 3 500' />
      <option value={4000} label='R 4 000' />
    </select>
    <select
    onChange={(e)=>setRatings(e.target.value)}
    >
      <option value='' label='Ratings' />
      <option value={3.5} label='3.5 stars' />
      <option value={4} label='4 stars' />
      <option value={4.5} label='4.5 stars' />
      <option value={5} label='5 stars' />
      <option value={5.5} label='5.5 stars' />
      <option value={5.7} label='5.7 stars' />
      <option value={6} label='6 stars' />
    </select>
    <select 
    onChange={(e)=>setType(e.target.value)}
    >
      <option value='' label='Accomodation Type' />
      <option value='hotel' label='Hotel' />
      <option value='apartment' label='Apartment' />
      <option value='resort' label='Resort' />
     
    </select>
    <div className='dates'>
      <input type='date' onChange={(e)=>setDates((prev)=>{return {...prev,startDate:e.target.value}})} value={dates.startDate} placeholder='Start Date'/>
      <span><p>To</p></span>
      <input type='date' onChange={(e)=>setDates((prev)=>{return {...prev,endDate:e.target.value}})} value={dates.endDate} placeholder='End Date'/>
    </div>
    <button className='search' onClick={filterAccomodation}>Search</button>
   </div>
   </main>
  )
}

export default Header