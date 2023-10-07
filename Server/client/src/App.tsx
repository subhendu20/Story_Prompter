import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import './App.css'
import Signup from './Components/Signup';
import Login from './Components/Login';


import Header from './Components/Header';
import Home from './Components/Home';
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux';
import { selectStatus, chageLogOut, chageLogIn } from './Action';
import Sidebar from './Components/Sidebar';
import Booklist from './Components/Booklist';


const App: React.FC = () => {

  const logStatus = useSelector(selectStatus);
  const dispatch = useDispatch();


  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const token_check = await sessionStorage.getItem('uid')

      if (token_check) {
        await dispatch(chageLogIn());
      }
      else {
        await dispatch(chageLogOut());

      }
    };

    checkLoginStatus();

  }, [logStatus])




  return (

    <div id="App" >

      <Router>

        <div id="log-window" className='none'>
          <p>Do you Want to log out?</p>
          <button onClick={async () => {
            await sessionStorage.removeItem('uid')

            await dispatch(chageLogOut())

            $('#log-window').toggleClass('none')
          }}>Log out</button>
          <button onClick={() => {
            $('#log-window').toggleClass('none')
          }}>Cancel</button>

        </div>
        {
          (logStatus) ? <React.Fragment>


            <Header />
            <Routes>



              <Route path='/' element={<Home />} />
              <Route path='/buybooks' element={<Booklist />} />





            </Routes>
            <Sidebar />



          </React.Fragment> :

            <Routes>



              <Route path='/signup' element={<Signup />} />
              <Route path='/' element={<Login />} />





            </Routes>

        }
      </Router>
    </div>
  )
}

export default App
