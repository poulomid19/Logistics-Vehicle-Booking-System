const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const adminSchema = require("../model/admin")

const authController = async(req,res)=>{
 try {
    const {email,password} = req.body
    const existEmail = await adminSchema.findOne({email})
    if(!existEmail) return res.status(401).json("Invalid credentials")
    const matchPsrd = await bcrypt.compare(password,existEmail.password) 
    if(!matchPsrd) return res.status(401).json("Invalid credentials") 
    
    const token = jwt.sign(
       {id: existEmail._id, role: existEmail.role},
       process.env.JWT_SECRET,
       {expiresIn: "1d"} 
    );
     res.cookie("token",token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
     }).json({ message: "Login successful" });
 } catch (error) {
    res.status(500).json({message: error})
 }
}

module.exports = {authController}