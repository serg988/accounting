import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listInvoices } from '../actions/invoiceActions'
import InvoiceItem from '../invoices/InvoiceItem'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const invoiceList = useSelector((state) => state.invoiceList)
  const { loading, error, invoices } = invoiceList

  useEffect(() => {
    dispatch(listInvoices())
  }, [dispatch])

  const history = useHistory()
  const invoiceSelectHandler = (id) => {
    history.push('/invoice/' + id)
  }

  return (
    <div className='table-container'>
      <h2 className='text-center mb-3'>Bartrans Logistics Account Assistant</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
      )}
    </div>
  )
}

export default HomeScreen
