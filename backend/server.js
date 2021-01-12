import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import connectDB from './config/db.js'

import invoiceRoutes from './routes/invoiceRoutes.js'
import clientRoutes from './routes/clientRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.use('/api/invoices', invoiceRoutes)

app.use('/api/clients', clientRoutes)

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
