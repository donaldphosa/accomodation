import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { auth,db } from '../../firebaseConfig'
import { getDocs,collection,deleteDoc, doc, updateDoc } from 'firebase/firestore'
import './history.css'



function BookedHistory({info}) {
    const [user, setUser] = useState();
    const [booked,setBooked] = useState()
  
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
     
    }, [user])
    const collectionRef = collection(db,'booked');
    useEffect(()=>{
        let data = []
        
        getDocs(collectionRef).then((snapshot)=>{
          
            snapshot.docs.forEach(item=>{
                data.push(item.data());
            })
        })
        setBooked(data)
    },[])

    function deleteHistory(id){
        getDocs(collectionRef).then((snapshot)=>{
          
            snapshot.docs.forEach(item=>{
                if(item.data().id === id){
                    let docRef = doc(db,'booked',item.id);
                    deleteDoc(docRef);
                }
                
            })
        })
    }

    function cancelHistory(id){
        getDocs(collectionRef).then((snapshot)=>{
          
            snapshot.docs.forEach(item=>{
                if(item.data().id === id){
                    let docRef = doc(db,'booked',item.id);
                    updateDoc(docRef,{status:'cancel'});
                }
                
            })
        })
    }

  return (
    <>
   {user&& <div className=" padd">
        {
           booked&& booked.map((item,index)=>{
                return ( <div className='container' key={index}>
                <img src={item.img}/>
                <div className='detail'>
                <h4>{item.name}</h4>
                <p className='ratings'>{item.ratings} Rating</p>
                <span>R {item.price}</span>
                <span><p>{item.location}</p></span>
                <button
                style={{width:'150px'}}
                onClick={(e)=>item.status === 'booked'?cancelHistory(item.id):deleteHistory(item.id)}
                >{item.status === 'booked'?'cancel':'delete'}</button>
                </div>
             
              </div>)
            })
        }
    </div>}
    </>
  )
}

export default BookedHistory