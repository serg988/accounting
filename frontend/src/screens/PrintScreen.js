import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import InvoicePrint from '../invoices/InvoicePrint'
import AvrPrint from '../invoices/AvrPrint'
import { useReactToPrint } from 'react-to-print'

const PrintScreen = ({ data }) => {
   const componentRef = useRef()
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   })

  const dispatch = useDispatch()
  const invoiceDetails = useSelector((state) => state.invoiceDetails)
  const { loading, error, invoice, current } = invoiceDetails
  console.log(current)
  let date = new Date(current.createdAt).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  console.log(date)
  return (
    <>
      {data === 'InvoicePrint' ? (
        <InvoicePrint current={current} date={date} ref={componentRef} />
      ) : (
        <AvrPrint current={current} date={date} ref={componentRef} />
      )}

      <Button
        onClick={handlePrint}
        variant='outline-dark'
        size='lg'
        block
        style={{ width: '50%', margin: '2rem auto' }}
      >
        <i class='fas fa-print'></i> Печать
      </Button>
    </>
  )
}

export default PrintScreen
