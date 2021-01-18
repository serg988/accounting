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

// @desc    Post a new client
// @route   POST /api/clients
// @access  Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      number,
      client,
      vessel,
      voyage,
      bl,
      container,
      lines,
      total,
      linesNumber,
    } = req.body

    const invoice = await Invoice.create({
      number,
      client,
      vessel,
      voyage,
      bl,
      container,
      lines,
      total,
      linesNumber,
    })

    if (invoice) {
      res.status(201).json({
        _id: invoice._id,
      })
    } else {
      res.status(400)
      throw new Error('Invalid invoice data')
    }
  })
)

// @desc    Update an invoice
// @route   PUT /api/invoices/:id
// @access  Private/Admin
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {
      number,
      client,
      vessel,
      voyage,
      bl,
      container,
      lines,
      total,
      linesNumber,
    } = req.body

    const invoice = await Invoice.findById(req.params.id)

    if (invoice) {
      invoice.number = number
      invoice.client = client
      invoice.vessel = vessel
      invoice.voyage = voyage
      invoice.bl = bl
      invoice.container = container
      invoice.lines = lines
      invoice.total = total
      invoice.linesNumber = linesNumber

      const updatedInvoice = await invoice.save()
      res.json(updatedInvoice)
    } else {
      res.status(404)
      throw new Error('Invoice not found')
    }
  })
)
router.delete(
  '/:id',
asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    await invoice.remove()
    res.json({ message: 'Invoice removed' })
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
}))

export default router
