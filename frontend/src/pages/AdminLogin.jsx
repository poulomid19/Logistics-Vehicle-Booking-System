import { useState } from "react";
import {toast, ToastContainer} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminLogin = () => {
   const navigate = useNavigate()
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.post("https://logistics-vehicle-booking-system-d67m.onrender.com/api/admin", 
        {email, password},
      {withCredentials: true}
    )
   toast.success(res.data.message); 
    setEmail("")
    setPassword("")
    navigate("/add")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data|| "something went wrong")
    }

  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    <ToastContainer autoClose={3000} position='top-right'/>
    </>
  )
}

export default AdminLogin