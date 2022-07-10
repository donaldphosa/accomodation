import Home from './pages/home/Home';
import Header from './components/header/Header'
import Search from './pages/search/Search'
import './App.css';

import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Data from './Data';
import Accomodation from './pages/accomodation/Accomodation';


function App() {
  const [info, setInfo] = useState(Data)
  const id = 0;
  return (
    <div className="App">
      <Header info={info} setInfo={setInfo}/>
      <Routes>
        <Route path='/' element={<Home info={info} />}/>
        <Route path='/:id' element={<Search data={info}/>}/>
        <Route path='/Accomodation/:accomodation' element={<Accomodation Accomodation={info}/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
