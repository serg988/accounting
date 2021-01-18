import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import InvoicePrint from '../invoices/InvoicePrint'
import AvrPrint from '../invoices/AvrPrint'
import { useReactToPrint } from 'react-to-print'
import { rubles } from 'rubles'

const PrintScreen = ({ data }) => {
  const history = useHistory()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const dispatch = useDispatch()
  const invoiceDetails = useSelector((state) => state.invoiceDetails)
  const { loading, error, invoice, current } = invoiceDetails
  const invoiceCreate = useSelector((state) => state.invoiceCreate)
  const { avrDate } = invoiceCreate
  const clientList = useSelector((state) => state.clientList)
  const { clients } = clientList

  console.log('CLIENTS', clients);
  if (clients.length === 0) {
    history.push('/')
    return <>.</>
  } 

  const address = clients.find((client) => client.name === current.client)
    .address


  const text = rubles(current.total)

  let date = new Date(current.createdAt).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {data === 'InvoicePrint' ? (
        <InvoicePrint current={current} date={date} ref={componentRef} />
      ) : (
        <AvrPrint
          current={current}
          date={avrDate}
          address={address}
          text={text}
          ref={componentRef}
        />
      )}
      <Row>
        <Button
          onClick={handlePrint}
          variant='outline-dark'
          size='lg'
          block
          style={{ width: '30%', margin: '2rem auto' }}
        >
          <i className='fas fa-print'></i> Печать
        </Button>
        <Button
          onClick={() => {
            history.goBack()
          }}
          variant='outline-primary'
          size='lg'
          block
          style={{ width: '30%', margin: '2rem auto' }}
        >
          <i className='fas fa-arrow-circle-left'></i> Назад
        </Button>
      </Row>
    </>
  )
}

export default PrintScreen
