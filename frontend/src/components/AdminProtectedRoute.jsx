import axios from 'axios'
import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const AdminProtectedRoute = () => {
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
     axios.get("http://localhost:3000/api/admincheck", { withCredentials: true })
     .then(()=>{
        setIsAdmin(true)
        setLoading(false)
     })
     .catch(()=>{
         setIsAdmin(false)
        setLoading(false)
     })
    },[])

    if (loading) return <p>Loading...</p>;
  return (
    <>
      {isAdmin ? <Outlet /> : <Navigate to="/admin" />}
    </>
  )
}

export default AdminProtectedRoute