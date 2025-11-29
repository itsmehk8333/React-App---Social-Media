import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RouterPage from './Routes/RouterPage'
import Navbar from './Components/Navbar/NavbarComponent'

function App() {
  return (
    <>
    <Navbar />
      <RouterPage />
    </>
  )
}

export default App
