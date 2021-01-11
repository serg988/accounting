import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import clients from './data/clients.js'
import invoices from './data/invoices.js'
import Client from './models/clientModel.js'
import Invoice from './models/invoiceModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Invoice.deleteMany()
    await Client.deleteMany()

    const createdClients = await Client.insertMany(clients)

    const firstClient = createdClients[0].name

    const sampleInvoices = invoices.map((invoice) => {
      return { ...invoice, client: firstClient }
    })

    await Invoice.insertMany(sampleInvoices)

    console.log('Data inserted'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await Invoice.deleteMany()
    await Client.deleteMany()

    console.log('Data destroyed'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
