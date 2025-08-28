import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import AddVehicle from './pages/AddVehicle'
import SearchandBook from './pages/SearchandBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddVehicle/>}/>
          <Route path='/book' element={<SearchandBook/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
