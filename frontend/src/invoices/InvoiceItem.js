import React from 'react'

const InvoiceItem = ({ invoice, onClick }) => {
  return (
      <tr onClick={()=>onClick(invoice.id)}>
      <td>{invoice.id}</td>
      <td>{invoice.date.toString()}</td>
      <td>{invoice.customerName}</td>
      <td>${invoice.invoiceTotal}</td>
    </tr>
  )
}

export default InvoiceItem
