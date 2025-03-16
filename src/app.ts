import express from 'express'
const app = express()
require('./database/connection')
require('dotenv').config()

app.use(express.json())

// routes
import userRoute from './routes/userRoute'
// Adding to pipeline
app.use(userRoute)

export default app