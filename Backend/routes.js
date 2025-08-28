const express = require("express")
const router = express.Router()
const Vehicle = require('./model/vehicle')
const Bookings = require("./model/booking")
router.post("/add", async(req,res)=>{
    try {
        const {name,capacitykg,tyres} = req.body
    const newvehicles = new Vehicle({name,capacitykg,tyres})
    await newvehicles.save()
    res.status(201).json({success:true,message:"vehicle added successfully"})
    } catch (error) {
         res.status(400).json({success:false,message:"something went wrong"})
    }
    
})

router.get("/vehicles/available", async(req,res)=>{
    const {capacityReq,frompincode,topincode,start_time} =req.query
    const estimatedRideDurationHours = Math.abs(parseInt(topincode) - parseInt(frompincode)) %24  
    const startTime = new Date(start_time)
    const endTime = new Date(startTime.getTime() + estimatedRideDurationHours*60*60*1000)
    
    const vehicles = await Vehicle.find({capacitykg: {$gte: parseInt(capacityReq)}})

    const availableVehicles = [];
  for (const v of vehicles) {
    const conflict = await Bookings.findOne({
      vehicleId: v._id,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } }
      ]
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


module.exports= router