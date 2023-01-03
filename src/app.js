import express from "express";
import questionsRoutes from './routes/questions.routes.js'
import usersRoutes from './routes/users.routes.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())  // para el método post

app.use('/api', questionsRoutes)

app.use('/api', usersRoutes)

app.use((req, res)=>{res.status(404).json({message:'endpoint not found'})})


export default app