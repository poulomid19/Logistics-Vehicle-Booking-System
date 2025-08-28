import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Availability from './Availability'

const Search = () => {
     const [avaVehicle, setAvaVehicle] = useState([])
     const [duration, setDuration] = useState("")
     const [results,setResults] = useState(false)
    const [form, setForm] = useState({
        capacityReq:"",
        frompincode:"",
        topincode:"",
        start_time:""
    })
    const changeHandler=(e)=>{
        const {name,value} = e.target
        setForm((prev)=>({
         ...prev, [name]:value
        }))
    }
    const submitHandler =(e)=>{
        const query = new URLSearchParams(form).toString()
        e.preventDefault()
        fetch(`http://localhost:3000/api/vehicles/available?${query}`)
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data)
            if(data.success){
                setAvaVehicle(data.availableVehicles)
                setDuration(data.estimatedRideDurationHours)
                setResults(true)
                setBookingmsg(data.message)
            }
            else{
                toast.error(data.message)
                setAvaVehicle([])
            }
        })
       .catch((err)=>{
        console.log(err)})
    }
    let id=1;
    const bookingHandler  =(vehicle)=>{
        fetch("http://localhost:3000/api/bookings",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                vehicleId:vehicle._id,
                fromPincode: form.frompincode,
                toPincode: form.topincode,
                startTime:form.start_time,
                customerId:id++
            })
        })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.success){
        toast.success(data.message)}
        else{
            toast.error(data.message)
        }
    })
    }
     
    
  return (
    <>
       <div className="relative mb-4 w-1/2 mx-auto mt-20">
  <form onSubmit={submitHandler}>
    <label htmlFor="capacityReq" className="leading-7 text-sm text-gray-600">Capacity Required</label>
    <input onChange={changeHandler} type="number" id="capacityReq" name="capacityReq" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={form.capacityReq}/>
    
    <label htmlFor="frompincode" className="leading-7 text-sm text-gray-600">From Pincode</label>
    <input onChange={changeHandler} type="text" id="frompincode" name="frompincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={form.frompincode}/>
    
    <label htmlFor="topincode" className="leading-7 text-sm text-gray-600">To Pincode</label>
    <input onChange={changeHandler} type="text" id="topincode" name="topincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={form.topincode}/>
    
    <label htmlFor="start_time" className="leading-7 text-sm text-gray-600">Date and Time</label>
    <br/>
    <input onChange={changeHandler} type='datetime-local' name='start_time' className="leading-7 text-sm text-gray-600" value={form.start_time}/>
    <button className='w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-5' type='submit'>Search</button>
  </form>
  </div>
  {results &&
  <Availability vehicles={avaVehicle} duration={duration} bookingHandler={bookingHandler}/>
}
<ToastContainer autoClose={3000} position='top-right'/>
    </>
  )
}

export default Search