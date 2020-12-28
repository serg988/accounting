import React from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { invoices } from '../invoices'
import InvoiceItem from '../invoices/InvoiceItem'

const HomeScreen = () => {
  const history = useHistory()
  const invoiceSelectHandler = (id) => {
    history.push('/invoice/' + id)
  }

  return (
    <div className='table-container'>
      <h2 className='text-center mb-3'>Bartrans Logistics Account Assistant</h2>
      <Table bordered hover size='sm'>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>#</th>
            <th style={{ width: '10%' }}>Дата</th>
            <th style={{ width: '75%' }}>Клиент </th>
            <th style={{ width: '10%' }}>Сумма </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <InvoiceItem
              key={invoice.id}
              invoice={invoice}
              onClick={invoiceSelectHandler}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default HomeScreen
