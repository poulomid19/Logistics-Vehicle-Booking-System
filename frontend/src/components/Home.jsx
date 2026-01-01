import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
           <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            Book a Vehicle Effortlessly
          </h1>
          <p className="text-lg mb-8">
            Search and book vehicles based on capacity, route, and schedule.
            Fast, reliable, and hassle-free transportation at your fingertips.
          </p>
          <Link to={"/book"}>
          <button
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            Book a Vehicle
          </button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home