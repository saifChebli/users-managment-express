import User from "../models/User.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";

export const getAllUsers = async (req,res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({message : "Internal server error"})
  }
}

export const getUserById = async (req,res) => {
  const userId = req.params.id
  try {
    
  } catch (error) {
    
  }
}

export const createAccount = async (req,res) => {

 const { email , fullName , password , phoneNumber  } = req.body

  try {
 
    if (!email || !fullName || !password || !phoneNumber){
      return res.status(400).json({message : "All Fields are required !"})
    }
    
    if (!validator.isEmail(email)) return res.status(400).json({message : "Invalid Email !"})

    if (!validator.isLength(password , {min : 7})) return res.status(400).json({message : "Invalid Password !"})

    if (!validator.isLength(fullName , {min : 3})) return res.status(400).json({message : "Invalid FullName !"})
    
    if (!validator.isMobilePhone(phoneNumber , ["ar-TN"])) return res.status(400).json({message : "Invalid Phone Number !"})

    // Check if user already exists


    const existUser = await User.findOne({ email })

    if (existUser) return res.status(400).json({ message : "User exist !" })
    
  
    const hashedPassword = await bcrypt.hash(password , 10)
    const user = await User.create({ email , fullName , password : hashedPassword , phoneNumber })

    res.status(201).json({message : "User created successfully" , user})

  } catch (error) {
    console.log(error)
    res.status(500).json({message : "Internal server error"})
  }
}


export const login = async (req,res) => {

  const { email , password } = req.body

  try {
    if (!validator.isEmail(email)) return res.status(400).json({message : "Invalid Email !"})

      
      const user = await User.findOne({email})
      if (!user) return res.status(401).json({ message : "Invalid credentials" })
        
        const match = await bcrypt.compare(password , user.password)
      
        if(!match) return res.status(401).json({ message : "Invalid credentials" })

    // TODO

    const token = generateToken({id : user._id , role : user.role})
    console.log(token)
    res.status(200).json({
      id : user._id,
      name: user.name,
      email: user.email,
      token
    })
  } catch (error) {
    console.log(error)
      res.status(500).json({message : "Internal server error"})
  }
}



export const getProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(400).json({message : "User not found !"})

      res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({message : "Internal server error"})
  }
}


export const changePassword = async (req,res) => {

  const { currentPassword , newPassword } = req.body

  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(400).json({message : "User not found !"})

    const matched = await bcrypt.compare(currentPassword , user.password)

    if (!matched) return res.status(401).json({message : "Current password is incorrect !"})
   
    const hashedNewPass = await bcrypt.hash(newPassword , 10)
    user.password = hashedNewPass

    await user.save()
  } catch (error) {
     console.log(error)
     res.status(500).json({message : "Internal server error"})
  }
}