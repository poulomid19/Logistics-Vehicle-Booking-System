import React from 'react'

const Availability = ({vehicles,duration,bookingHandler}) => {    
    if(!vehicles || vehicles.length===0) return <h3>There's no vehicle available for this destination</h3>
  return (
    <>
       <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-1/2 mb-20">
      <h2 className="text-2xl text-indigo-500 tracking-widest font-bold title-font mb-1">Available vehicles</h2>
    </div>
    <div className="flex flex-wrap justify-center gap-4">
        {vehicles.map((v)=>{
            return (
             <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60" key={v.newId}>
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Name:{v.name}</h2>
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Capacity:{v.capacitykg}</h2>
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Tyres:{v.tyres}</h2>
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Duration:{duration}hr</h2>
        <button onClick={()=>bookingHandler(v)} className="text-indigo-500 inline-flex items-center">Book Now
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button> 
      </div>
            )
        })}
    </div>
    </div>
    </section>

    </>
  )
}

export default Availability