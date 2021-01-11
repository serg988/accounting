import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import axios from 'axios'
// import { invoices } from '../invoices'
import InvoiceItem from '../invoices/InvoiceItem'

const HomeScreen = () => {
  const [invoices, setInvoices] = useState([])
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState(0)

  useEffect(() => {
    const fetchedInvoices = async () => {
      const { data } = await axios('/api/invoices')
      console.log(data)
      setInvoices(data)

      const lastNumber = await data.reduce((prev, current) =>
        prev.number > current.number ? prev : current
      )
      const nextNumber = lastNumber.number + 1
      console.log(nextNumber)
      setNextInvoiceNumber(nextNumber)
    }
    fetchedInvoices()
  }, [])

  // useEffect(() => {
  //   const next = invoices.reduce((prev, current) =>
  //     prev.number > current.number ? prev : current
  //   )
  //   setNextInvoiceNumber(next)
  // }, [invoices])

  console.log(nextInvoiceNumber)
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
              key={invoice._id}
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
