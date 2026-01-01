import { toast, ToastContainer } from "react-toastify"
import { estimatedCost } from "../utils/cost"
import axios from "axios"
import SuccessModal from "./SuccessModal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const BookingConfirm = ({vehicle, form, duration, onCancel}) => {
    const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const [booking, setBooking] = useState(null)
  const capacity = Number(vehicle.capacitykg)
  const durationOf = Number(duration)
  const price = estimatedCost(capacity,durationOf)

  const bookingConfirmation = async()=>{
    try {
          const res = await axios.post("http://localhost:3000/api/bookings", 
        {
        vehicleId: vehicle._id, 
        fromPincode:form.frompincode, 
        toPincode: form.topincode,
        startTime: form.start_time,
        customerId: crypto.randomUUID()
      })
      // toast.success(res.data.message)
      setBooking(res.data.booking)
      setSuccess(true)
    } catch (error) {
      // console.log(error.response.data.message || "something went wrong")
      toast.error(error.response.data.message || "something went wrong")
    }

  }
  const closeHandle = ()=>{
   setSuccess(false)
   navigate("/")
  }
  return (
    <>
     <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Confirm Your Booking
        </h2>

        <div className="space-y-2">
          <p><b>Vehicle:</b> {vehicle.name}</p>
          <p><b>Capacity:</b> {vehicle.capacitykg} kg</p>
          <p><b>Tyres:</b> {vehicle.tyres}</p>
          <p><b>Duration:</b> {duration} hrs</p>
          <p><b>From:</b> {form.frompincode}</p>
          <p><b>To:</b> {form.topincode}</p>
          <p><b>Start Time:</b> {new Date(form.start_time).toLocaleString()}</p>
        </div>
         <p className="text-lg font-bold text-green-600 mt-2">
                Estimated Cost: ₹{price}
          </p>

        <div className="flex gap-4 mt-6">
          <button className="flex-1 bg-green-600 text-white py-2 rounded" onClick={bookingConfirmation}>
            Confirm Booking
          </button>

          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Change Vehicle
          </button>
        </div>
      </div>
    </div>

    {success && booking && (
      <SuccessModal booking={booking} onClose={closeHandle}/>
    )}
    </>
  )
}

export default BookingConfirm