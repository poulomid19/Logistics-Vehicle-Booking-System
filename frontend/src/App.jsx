import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import AddVehicle from './pages/AddVehicle'
import SearchandBook from './pages/SearchandBook'
import AdminLogin from './pages/AdminLogin'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import Home from './components/Home'

function App() {

  return (
    <>
   <BrowserRouter>
  <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path="/book" element={<SearchandBook />} />

    <Route path="/admin" element={<AdminLogin />} />

    <Route element={<AdminProtectedRoute />}>
      <Route path="/add" element={<AddVehicle />} />
    </Route>

  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
