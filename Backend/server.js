const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const routes = require("./routes");
const seedAdmin = require("./seedAdmin");

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "https://logistics-vehicle-booking-system-two.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
    seedAdmin(); // runs ONCE
  })
  .catch(err => console.error(err));

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});