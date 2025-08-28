const express = require("express")
const app = express()
const port = 3000
const routes = require("./routes")
const cors = require("cors")
const mongoose = require("mongoose")
app.use(cors())
app.use(express.json({extended:true}))
app.use("/api", routes)

mongoose.connect("mongodb://127.0.0.1:27017/vehicleBooking")

app.listen((port),()=>{
    console.log(`app running at http://localhost:${port}`)
})