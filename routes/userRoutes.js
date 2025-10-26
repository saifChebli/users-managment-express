import express from 'express'
import { createAccount } from '../controllers/userController.js'


const router = express.Router()


router.post("/signup" , createAccount)










export default router