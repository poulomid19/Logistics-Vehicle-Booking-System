import React, { useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'
const Add = () => {
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
        fetch("http://localhost:3000/api/add",{
            method:'POST',
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then((data)=>{
            if(!data.success){
                toast.error(data.message)
            }
            else{
                toast.success(data.message)
            }
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err.message)
        })
     }
  return (
    <>
     <div className="relative mb-4 w-1/2 mx-auto mt-20">
     <h2 className="text-2xl text-indigo-500 tracking-widest font-bold title-font mb-1">Add vehicle</h2>
    <form onSubmit={submitHandler}>
       <label htmlFor='name'>Name</label>
       <input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='text' name="name" onChange={changeHandler} value={data.name}/>
       <label htmlFor='capacitykg'>Capacitykg</label>
       <input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='number' name="capacitykg"  onChange={changeHandler} value={data.capacitykg}/>
       <label htmlFor='tyres'>Tyres</label>
       <input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type='number' name="tyres" onChange={changeHandler} value={data.tyres}/>

       <button className='w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-5' type='submit'>Add</button>
       </form>
       </div>
       <ToastContainer autoClose={3000} position='top-right'/>
    </>
  )
}

export default Add