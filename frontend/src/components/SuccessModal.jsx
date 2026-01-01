import { CheckCircle } from "lucide-react";

const SuccessModal = ({booking, onClose}) => {
  return (
    <>
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-scaleIn">

        <div className="flex flex-col items-center text-center">
          <CheckCircle size={64} className="text-green-500 mb-4" />

          <h2 className="text-2xl font-bold text-gray-800">
            Booking Confirmed 🎉
          </h2>

          <p className="text-gray-600 mt-2">
            Your vehicle has been successfully booked.
          </p>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <p><b>Booking ID:</b> {booking._id}</p>
          <p><b>Vehicle:</b> {booking.vehicleId}</p>
          <p><b>From:</b> {booking.fromPincode}</p>
          <p><b>To:</b> {booking.toPincode}</p>
          <p><b>Start:</b> {new Date(booking.startTime).toLocaleString()}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Go to Home
          </button>

          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 py-2 rounded-lg"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default SuccessModal