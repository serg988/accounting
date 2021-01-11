import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
// import { invoices } from '../invoices'
import { Table, InputGroup, FormControl } from 'react-bootstrap'
import EditModal from '../shared/UIElements/EditModal'
import { FormEdit } from '../shared/form/Form'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listInvoiceDetails } from '../actions/invoiceActions'

const SingleInvoice = ({ match }) => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const invoiceDetails = useSelector((state) => state.invoiceDetails)
  const { loading, error, invoice } = invoiceDetails

  useEffect(() => {
    dispatch(listInvoiceDetails(match.params.iid))
  }, [dispatch, match.params.iid])

  console.log(invoice)

  let content = null
  if (invoice) {
    const { number, client, lines, total } = invoice
    const handleShow = () => {
      setShowModal(true)
    }
    const handleClose = () => {
      setShowModal(false)
    }
    content = loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
        <EditModal
          showModal={showModal}
          closeModal={handleClose}
          title='Редактировать Запись'
          body={<FormEdit />}
        />
        <h2 className='text-center'>Счет № {number}</h2>
        <h5>Клиент: {client}</h5>
        <Table bordered hover size='sm'>
          <thead>
            <tr>
              <th style={{ width: '75%' }}>Оказанная услуга</th>
              <th style={{ width: '10%' }}>Количество</th>
              <th style={{ width: '15%' }}>Цена </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={Math.random()} onClick={handleShow}>
                <td>{line.jobDescription}</td>
                <td>{line.quantity}</td>
                <td>{line.cost}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Всего: </strong>
              </td>
              <td></td>
              <td>
                <strong>{total} руб.</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
  return content
}

export default withRouter(SingleInvoice)
