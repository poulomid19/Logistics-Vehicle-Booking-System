const jwt = require("jsonwebtoken")
const authCheck = (req,res,next)=>{
const token = req.cookies.token
try {
  if(!token) return res.status(401).json({message: "not authenticated"})
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(decoded.role !=="admin") return res.status(403).json({message: "Not authorized to access"})
    
    req.admin = decoded    
    next()
} catch (error) {
    res.status(401).json({ message: "Invalid or expired token" })
}
}

module.exports = {authCheck}