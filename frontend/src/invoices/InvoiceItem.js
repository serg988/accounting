import React from 'react'

const InvoiceItem = ({ invoice, editHandler, deleteHandler }) => {
  return (
    <tr>
      <td>{invoice.number}</td>
      <td>{invoice.createdAt.toString().substr(0, 10)}</td>
      <td>{invoice.client}</td>
      <td>{invoice.total}</td>
      <td onClick={() => editHandler(invoice._id)}>
        <i
          className='fas fa-eye'
          style={{ color: 'green', cursor: 'pointer' }}
        ></i>
      </td>
      <td onClick={() => deleteHandler(invoice._id)}>
        <i
          className='far fa-trash-alt'
          style={{ color: 'red', cursor: 'pointer' }}
        ></i>
      </td>
    </tr>
  )
}

export default InvoiceItem
