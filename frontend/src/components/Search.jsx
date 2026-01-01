import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Availability from './Availability'
import BookingConfirm from './BookingConfirm'

const Search = () => {
     const [avaVehicle, setAvaVehicle] = useState([])
     const [duration, setDuration] = useState("")
     const [results,setResults] = useState(false)
     const [selected, setSelected] = useState(null)
     const [confirm, setConfirm] = useState(false)
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
    const submitHandler = (e) => {
  e.preventDefault();
  // console.log("clicked", form);


  if (
    form.capacityReq === "" ||
    isNaN(form.capacityReq) ||
    form.frompincode.trim() === "" ||
    form.topincode.trim() === "" ||
    form.start_time === ""
  ) {
    toast.error("Please fill all fields correctly");
    setResults(false);
    return;
  }

  const query = new URLSearchParams(form).toString();

  fetch(`https://logistics-vehicle-booking-system-d67m.onrender.com/api/vehicles/available?${query}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log("API RESPONSE 👉", data);

      if (data.success) {
        setAvaVehicle(data.availableVehicles);
        setDuration(data.estimatedRideDurationHours);
        setResults(true);
      } else {
        toast.error(data.message || "No vehicles found");
        setResults(false);
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Server error");
      setResults(false);
    });
};
  const bookingHandler = (vehicle) => {
    setSelected(vehicle)
    setConfirm(true)
  };
     
    
  return (
    <>
    
      {!results && !selected && (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Vehicle Booking Details
            </h2>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Capacity Required
                </label>
                <input
                  onChange={changeHandler}
                  type="number"
                  name="capacityReq"
                  value={form.capacityReq}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  From Pincode
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  name="frompincode"
                  value={form.frompincode}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  To Pincode
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  name="topincode"
                  value={form.topincode}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date & Time
                </label>
                <input
                  onChange={changeHandler}
                  type="datetime-local"
                  name="start_time"
                  value={form.start_time}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
              >
                Search Vehicles
              </button>
            </form>
          </div>
        </section>
      )}

      {results && !selected &&(
        <Availability
          vehicles={avaVehicle}
          duration={duration}
          bookingHandler={bookingHandler}
        />
      )}

  {selected && confirm && (
    <BookingConfirm vehicle = {selected} form = {form} duration = {duration} onCancel={() => setSelected(null)}/>
  )}

<ToastContainer autoClose={3000} position='top-right'/>
    </>
  )
}

export default Search