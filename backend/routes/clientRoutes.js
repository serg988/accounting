import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Client from '../models/clientModel.js'

//@desc: Fetch all clients
//@route: GET api/clients
//@access: public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const clients = await Client.find({})
    res.json(clients)
  })
)

//@desc: Fetch single invoice
//@route: GET api/invoices/:id
//@access: public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id)
    if (invoice) {
      res.json(invoice)
    } else {
      res.status(404)
      throw new Error('Invoice not found')
    }
  })
)

// @desc    Post a new client
// @route   POST /api/clients
// @access  Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, address } = req.body

    const clientExists = await Client.findOne({ name })

    if (clientExists) {
      res.status(400)
      throw new Error('Такой клиент уже существует')
    }

    const client = await Client.create({
      name, address
    })

    if (client) {
      res.status(201).json({
        _id: client._id,
        name: client.name,
      })
    } else {
      res.status(400)
      throw new Error('Invalid client data')
    }
  })
)

export default router
