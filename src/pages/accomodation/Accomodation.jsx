import React,{ useState,useEffect }  from 'react'
import './accomodation.css'
import { useParams } from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import { db } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom';
import { collection,updateDoc, doc, addDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";


const Accomodation = ({Accomodation}) => {
  const param = useParams()
  const [model,setModel]=useState(false)
    // getting user email
    const [user, setUser] = useState();
  
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
     
    }, [user]);
  //well................................................................. 
  
  const [accomodation,setAccomodation]=useState(Accomodation.filter((acc)=>{
    return acc.id === param.accomodation
   }))

   const updateStatus = async (id, status)=>{
    const taskdoc = doc(db,"hotels", id);
    const newField = {status:"booked"};
    await updateDoc(taskdoc,newField).then(()=>{
      updateHotel({...accomodation[0],userName:user.email})
    })
  }


// add booked hotels to the 
const hotelref = collection(db,'booked')
  const updateHotel = async(hotel)=>{
     await addDoc(hotelref,{...hotel,status:'booked'}).then(()=>{
      setModel(true)
     })
}


  return (<>
    {accomodation&&<div className='accomodation-card'>
      <img  src={accomodation[0].img} alt=''/>
      <div className='accomodation-details'>
        <h5>{accomodation[0].name}</h5>
        <p>R {accomodation[0].price}</p>
        <p style={{color:"orange", display:"flex",alignItems:"center"}}><GoLocation/>{accomodation[0].location}</p>
        <span>{accomodation[0].status}</span>
        <span>{accomodation[0].ratings} star {accomodation.type}</span>
        <button className='book-acc' onClick={()=>{
          const answer = window.confirm('confirm booking?')
          if(answer){
          updateStatus(accomodation[0].id,accomodation[0].status)
          }
          }}>Book Accomodation</button>
          {model&&<Model/>}
      </div>
    </div>}</>
  )
}

export default Accomodation


const Model = (status)=>{
  const navigate = useNavigate()

  return<div className='model'>
    <h3>Wish you a very nice adventure</h3>
    <p>your hotel booked successfully</p>
    <button
      onClick={()=>{
        navigate('/')
        window.location.reload()
      }}
    >Ok</button>
  </div>
}

