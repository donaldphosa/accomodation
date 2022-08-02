import Home from './pages/home/Home';
import Header from './components/header/Header'
import Search from './pages/search/Search'
import UploadHotels from './pages/upload-hotels/UploadHotels';
import './App.css';


import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Accomodation from './pages/accomodation/Accomodation';
import Auth from './pages/auth/Register-login';
import { db } from './firebaseConfig';
import {getDocs,collection} from 'firebase/firestore'
import BookedHistory from './pages/booking-history/BookedHistory';


const hotelref = collection(db,'hotels')
function App() {
  const [info, setInfo] = useState([])
  const [accountAccess,setAccountAccess] = useState(false)
  const [tab,setTab]=useState("login")
  const [logged,setLogged] = useState(false)
  const [searchInfo,setSearchInfo] = useState([])

  // authontication details 

  useEffect(()=>{
    const getHotels = async ()=>{
      const hotels = await getDocs(hotelref)
      setInfo(hotels.docs.map((docs)=>({
        ...docs.data(),id:docs.id
      })))
    }
 
    getHotels()
  },[])

  

  return (
    <div className="App">
      <Header 
      setLogged={setLogged} 
      logged={logged} 
      setInfo={setInfo} 
      setTab={setTab} 
      tab={tab} 
      setAccountAccess={setAccountAccess} 
      Data={info}
      setSearchInfo={setSearchInfo}
      />
      {accountAccess&&<Auth setAccountAccess={setAccountAccess} tab={tab}/>}
      <Routes>
        <Route path='/' element={<Home info={info} />}/>
        <Route path='/:id' element={<Search data={searchInfo}/>}/>
        <Route path='/Accomodation/:accomodation' element={<Accomodation Accomodation={info}/>}/>
        <Route path='/add' element={<UploadHotels/>}/>
        <Route path='/history' element={<BookedHistory info={info}/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
