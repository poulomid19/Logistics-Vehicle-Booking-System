import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
const Add = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name:"",
        capacitykg:"",
        tyres:""
    })
    const changeHandler = (e)=>{
        const {name,value} = e.target
        setData((prev)=>({
            ...prev, [name]:value
        }))
    }
     const submitHandler =(e)=>{
        e.preventDefault()
        fetch("https://logistics-vehicle-booking-system-d67m.onrender.com/api/add",{
            method:'POST',
            headers:
            {
                "Content-Type":"application/json"
            },
            credentials: "include",
            body:JSON.stringify(data)
        })
        .then(res=> res.json())
        .then((data)=>{
          // console.log(data)
          toast.success(data.message)
        })
        
      setData({
      name: "",
      capacitykg: "",
      tyres: "",
      })
        .catch((err)=>{
            console.log(err)
            toast.error(err.message || "something went wrong")
        })
     }
    const handleLogout = async () => {
  try {
    const res = await axios.post("https://logistics-vehicle-booking-system-d67m.onrender.com/api/logout", null, { withCredentials: true });
    toast.success(res.data?.message || "Logged out successfully");
    navigate("/admin"); 
  } catch (error) {
   
    toast.error( error.message || "Something went wrong");
  }
};

  return (
    <>
     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
  {/* Header Section */}
  <div className="w-full max-w-3xl flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-indigo-600">Welcome Admin</h1>
    <button
      onClick={handleLogout} 
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
    >
      Logout
    </button>
  </div>

  {/* Form Card */}
  <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl text-indigo-500 font-bold mb-6 text-center tracking-wide">
      Add Vehicle
    </h2>

    <form onSubmit={submitHandler} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          value={data.name}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="capacitykg" className="block text-sm font-medium text-gray-600 mb-1">
          Capacity (kg)
        </label>
        <input
          type="number"
          name="capacitykg"
          onChange={changeHandler}
          value={data.capacitykg}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="tyres" className="block text-sm font-medium text-gray-600 mb-1">
          Tyres
        </label>
        <input
          type="number"
          name="tyres"
          onChange={changeHandler}
          value={data.tyres}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
      >
        Add Vehicle
      </button>
    </form>
  </div>
</div>
       <ToastContainer autoClose={3000} position='top-right'/>
    </>
  )
}

export default Add