import express from 'express'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { createAdmin } from './initAdmin.js'

const app = express()

const port = process.env.PORT

app.use(express.json())

// Connect to MongoDB
connectDB()



app.use(userRoutes)

// app.use("/api/users" , userRoutes)


app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})