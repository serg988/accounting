import mongoose from 'mongoose'

const linesSchema = mongoose.Schema(
  {
    jobDescription: { type: String, required: true },
    quantity: { type: Number, required: true },
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const invoiceSchema = mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    client: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    vessel: {
      type: String,
      required: true,
    },
    voyage: {
      type: String,
      required: true,
    },
    bl: {
      type: String,
      required: true,
    },
    container: {
      type: String,
      required: true,
    },
    lines: [linesSchema],
    linesNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Invoice = mongoose.model('Invoice', invoiceSchema)
export default Invoice
