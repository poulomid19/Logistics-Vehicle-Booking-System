const express = require("express")
const router = express.Router()
const Vehicle = require('./model/vehicle')
const Bookings = require("./model/booking")
const {authController} = require("./controller/authcontroller")
const {authCheck} = require("./middleware")

router.post("/add", authCheck, async(req,res)=>{
    try {
        const {name,capacitykg,tyres} = req.body
    const newvehicles = new Vehicle({name,capacitykg,tyres})
    await newvehicles.save()
    res.status(201).json({success:true,message:"vehicle added successfully"})
    } catch (error) {
         res.status(400).json({success:false,message:"something went wrong"})
    }
    
})

// router.get("/book/confirm", async(req,res)=>{
//   try {
//     const {fromPincode, toPincode, startTime, endTime} = req.query
//     await Bookings.create({fromPincode, toPincode, startTime, endTime})
//     res.status(201).json({message: "Booking confirmed"})
//   } catch (error) {
//     res.status(500).json({message: "Booking not confirmed", error})
//   }
// })

router.get("/vehicles/available", async(req,res)=>{
    const {capacityReq,frompincode,topincode,start_time} =req.query
  
    if (
      !capacityReq ||
      isNaN(capacityReq) ||
      !frompincode ||
      !topincode ||
      !start_time
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request"
      });
    }
       const capacity = Number(capacityReq);

    const estimatedRideDurationHours = Math.abs(parseInt(topincode) - parseInt(frompincode)) %24  
    const startTime = new Date(start_time)
    const endTime = new Date(startTime.getTime() + estimatedRideDurationHours*60*60*1000)
    
    const vehicles = await Vehicle.find({capacitykg: {$gte: parseInt(capacity)}})

    const availableVehicles = [];
  for (const v of vehicles) {
   const conflict = await Bookings.findOne({
  vehicleId: v._id,
  startTime: { $lt: endTime },
  endTime: { $gt: startTime }
});

    if (!conflict) availableVehicles.push(v);
  }


   res.json({success:true, message:"available vehicles",availableVehicles,estimatedRideDurationHours})
})

router.post("/bookings",async(req,res)=>{
    try {
    const { vehicleId,fromPincode, toPincode,startTime,customerId} = req.body

    if(!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) return res.json({success:false,message:"Missing all details"})
    
    const vehicle = await Vehicle.findById(vehicleId)    
    if(!vehicle) return res.status(404).json({success:false,message:"Vehicle not found"})   
   
    const estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) %24  

const start = new Date(startTime);
const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

   
  const conflict = await Bookings.findOne({
    vehicleId,
    $or: [
      { startTime: { $lt: end, $gte: start } },
      { endTime: { $gt: start, $lte: end } }
    ]
  });
     if(conflict) return res.status(409).json({success:false,message:"Vehicle already booked for this time"})

     const newbooking = new Bookings({vehicleId, fromPincode, toPincode, startTime: start, endTime: end, customerId });   
     await newbooking.save()

     res.status(201).json({success:true, message:"Vehicle booked successfully",booking:newbooking})
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
    }
})

router.post("/admin",authController)

router.get("/admincheck", authCheck, (req,res)=>{
  res.status(200).json({ message: "true" })
})

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  }).status(200).json({ message: "Logged out successfully" });
});


module.exports= router