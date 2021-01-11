import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Invoice from '../models/invoiceModel.js'

//@desc: Fetch all invoices
//@route: GET api/invoices
//@access: public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const invoices = await Invoice.find({})
    res.json(invoices)
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
