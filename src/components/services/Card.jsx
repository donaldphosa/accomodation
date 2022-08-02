import React from 'react'
import './card.css'

function Card({img, type,length}) {
  return (
    <div className='card'>
      <img src={img} alt=''/>
      <div className='details'>
        <h4 className='p'>{type}</h4>
        <p className='p'>{length} Properties</p>
        <p className='p'>Starting from R 1, 000</p>
      </div>
    </div>
  )
}

export default Card