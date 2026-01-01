import React from "react";

const Availability = ({ vehicles, duration, bookingHandler }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      {(!vehicles || vehicles.length === 0) ? (
        <p className="text-red-600 text-2xl font-bold text-center">
          🚫 No vehicles found for this route
        </p>
      ) : (
        <div className="flex flex-col gap-16">
        <p className="text-blue-600 text-2xl font-bold text-center">Available vehicles for this route</p>
        <div className="flex flex-wrap justify-center gap-4">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="border rounded p-4 shadow w-72 text-center"
            >
              <p className="font-bold text-lg">{v.name}</p>
              <p>Capacity: {v.capacitykg}</p>
              <p>Duration: {duration} hrs</p>
              <button
                onClick={() => bookingHandler(v)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        </div>
      )}
    </section>
  );
};

export default Availability;
