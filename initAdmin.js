import { connectDB } from "./config/db.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"


export const createAdmin = async () => {
    try {
        
        const adminExist = await User.findOne({role : "admin"})

        if(adminExist){
            process.exit()
        }
         
        const hashedPassword = await bcrypt.hash('admin123' , 10)
        const user = await User.create({ email : "admin@gmail.com" , fullName : "Admin" , password : hashedPassword , phoneNumber : 29323232 , role : "admin" })
        if (user) {
            console.log("Admin Created")
            process.exit()
        }
    } catch (error) {
        console.log(error)
    }
}


// connectDB()