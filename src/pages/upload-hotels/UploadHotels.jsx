import React,{ useState } from 'react'
import { storage, db } from '../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import './uploadHotels.css'

import {addDoc,collection} from 'firebase/firestore'






function UploadHotels (){
    const hotelref = collection(db,'hotels')
    const [imageUpload,setImageUpload]=useState(null)

    const [hotelInfo, setHotelInfo] = useState( {
        name:'',
        img:"temp",
        location:"",
        ratings: '',
        price:'',
        type:'',
        status:'availabe'
    });

    // clean list of images url


    const updateHotel = async()=>{
        await addDoc(hotelref,hotelInfo)
    }

    const upload = async ()=>{
        if(imageUpload === null){
            return
        }else{
            const imageRef = ref(storage,`images/${imageUpload.name}`)
            await uploadBytes(imageRef,imageUpload).then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((url)=>{
                    setHotelInfo(prev=>{
                        return {...prev,img:url.toString()}
                    })
                    
                }).then(()=>{
                    updateHotel()
                    alert('done')
                })
            })

        }
    }


   
  return (
    <div className='upload-hotel' >
        <h2>upload Hotel Information</h2>
       
        <input 
            name='name' 
            placeholder='Hotel Name'
            onChange={(e)=>{
                setHotelInfo((prev)=>{
                    return {...prev,[e.target.name]:e.target.value}
                })
            }}
            />

        <input 
            name='price' 
            placeholder='price'
            onChange={(e)=>{
                setHotelInfo((prev)=>{
                    return {...prev,[e.target.name]:e.target.value}
                })
            }}
            />
        <input 
            name='ratings' 
            placeholder='ratings'
            onChange={(e)=>{
                setHotelInfo((prev)=>{
                    return {...prev,[e.target.name]:e.target.value}
                })
            }}
            />

        <input 
            name='location' 
            placeholder='location'
            onChange={(e)=>{
                setHotelInfo((prev)=>{
                    return {...prev,[e.target.name]:e.target.value}
                })
            }}
            />

        <input 
            name='type' 
            placeholder='hotel, apartment, resort'
            onChange={(e)=>{
                setHotelInfo((prev)=>{
                    return {...prev,[e.target.name]:e.target.value}
                })
            }}
        
        />
         <input 
        type='file'
        onChange={(e)=>{
            setImageUpload(e.target.files[0])
        }}
        />
        
        <button 
        onClick={()=>{
          if(Object.keys(hotelInfo).every((k) => hotelInfo[k])){//return true if all keys have value
            upload()
            
          }
        }
    }
        >upload</button>
      
    </div>
  )
}

export default UploadHotels

// 