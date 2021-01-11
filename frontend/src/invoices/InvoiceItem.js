import React from 'react'

const InvoiceItem = ({ invoice, onClick }) => {
  return (
    <tr onClick={() => onClick(invoice._id)}>
      <td>{invoice.number}</td>
      <td>{invoice.createdAt.toString().substr(0, 10)}</td>
      <td>{invoice.client}</td>
      <td>${invoice.total}</td>
    </tr>
  )
}

export default InvoiceItem
