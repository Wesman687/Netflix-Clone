import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase'


const App = () => {
  const navigate = useNavigate()
  useNavigate('/login')
  useEffect(() => {
    onAuthStateChanged(auth, async(user)=> {
      
      if(user) {
        console.log("Logged In")
        //useNavigate('/')
      } else {
        console.log("Logged Out")
        //useNavigate('/login')
      }
    })
    
  }, [])
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />        
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App
