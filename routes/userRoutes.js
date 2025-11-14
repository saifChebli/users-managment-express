import express from 'express'
import { changePassword, createAccount, getProfile, login } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()


router.post("/signup" , createAccount)
router.post("/login" , login)

router.get("/me" , protect , getProfile)
router.put("/change-password" , protect , changePassword)






export default router