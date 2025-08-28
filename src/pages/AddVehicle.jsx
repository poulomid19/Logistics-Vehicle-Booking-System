import React from 'react'
import Add from '../components/Add'
import {Link} from 'react-router-dom'
const AddVehicle = () => {
  return (
    <div>
        <Add/>
         <div className="relative mb-4 w-1/2 mx-auto mt-20">
       <h2 className="text-2xl text-indigo-500 tracking-widest font-bold title-font mb-1">Want to book a vehicle?</h2>
       <Link to='/book'><button className="bg-indigo-500 inline-flex items-center px-1 py-1 text-white">Click Here</button></Link>
       </div>
    </div>
  )
}

export default AddVehicle