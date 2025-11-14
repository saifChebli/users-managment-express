import jwt, { decode } from 'jsonwebtoken'
import User from '../models/User.js'


export const protect = async (req,res,next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) return res.status(401).json({message : "Not authorized , token is missing"})
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        console.log(decoded)
        
        req.user = {id : decoded.id , role : decoded.role}

        const user = await User.findById(decoded.id)

        if (!user) return res.status(401).json({message : "Not authorized , token is expired"})

        next()
    } catch (error) {
        console.log(error)
    }
}

