import React, { useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { invoices } from '../invoices'
import { Table, InputGroup, FormControl } from 'react-bootstrap'
import EditModal from '../shared/UIElements/EditModal'
import Form from '../shared/form/Form'

const SingleInvoice = (props) => {
  const [showModal, setShowModal] = useState(false)
  const iid = props.match.params.iid
  const invoice = invoices.filter((inv) => inv.id === +iid)
  console.log(invoice[0])
  const { id, customerName, lines, invoiceTotal } = invoice[0]

  const handleShow = () => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <>
      <EditModal
        showModal={showModal}
        closeModal={handleClose}
        title='Редактировать Запись'
        body={<Form />}
      />
      <h2 className='text-center'>Счет № {id}</h2>
      <h5>Клиент: {customerName}</h5>
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
              <strong>{invoiceTotal} руб.</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default withRouter(SingleInvoice)
