import User from "../models/User.js";





export const createAccount = async (req,res) => {

 const { email , fullName , password , phoneNumber  } = req.body

  try {

    // Check if user already exists

    const existUser = await User.findOne({ email })

    if (existUser) return res.status(400).json({ message : "User exist !" })

    const user = await User.create({ email , fullName , password , phoneNumber })

    res.status(201).json({message : "User created successfully" , user})

  } catch (error) {
    res.status(500).json({message : "Internal server error"})
  }
}