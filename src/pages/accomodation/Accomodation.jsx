import React from 'react'
import './accomodation.css'
import { useParams } from 'react-router-dom'

const Accomodation = ({Accomodation}) => {

  const param = useParams()
  const accomodation = Accomodation[parseInt(param.accomodation)-1]
  

  return (
    <div className='accomodation-card'>
      <img  src={`.${accomodation.img}`} alt=''/>
      <div>
        <h5>{accomodation.name}</h5>
        <span>Availabe</span>
      </div>
    </div>
  )
}

export default Accomodation