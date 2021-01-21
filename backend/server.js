import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import connectDB from '../config/db.js'

import invoiceRoutes from './routes/invoiceRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json({ extended: false }))

// app.get('/', (req, res) => {
//   res.send('API is running....')
// })

app.use('/api/users', usersRoutes)

app.use('/api/invoices', invoiceRoutes)

app.use('/api/clients', clientRoutes)


const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
