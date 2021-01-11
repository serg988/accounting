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

export default router
