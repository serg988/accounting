import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Modal, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listClients } from '../actions/clientActions'

import { listInvoices, deleteInvoice } from '../actions/invoiceActions'
import InvoiceItem from '../invoices/InvoiceItem'

const HomeScreen = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletedInvoiceId, setDeletedInvoiceId] = useState(null)
  const dispatch = useDispatch()
  const invoiceList = useSelector((state) => state.invoiceList)
  const { loading, error, invoices } = invoiceList

  const Login = useSelector((state) => state.Login)
  const { token } = Login


  useEffect(() => {
    dispatch(listClients())
  }, [dispatch])

  useEffect(() => {
    dispatch(listInvoices())
  }, [dispatch, token])

  const history = useHistory()

  const invoiceSelectHandler = (id) => {
    history.push('/invoice/' + id)
  }

  const handleClose = () => setShowDeleteModal(false)
  const deleteConfirmModal = (id) => {
    setDeletedInvoiceId(id)
    setShowDeleteModal(true)
  }

  const deleteInvoiceHandler = (id) => {
    dispatch(deleteInvoice(id))
    setShowDeleteModal(false)
  }
  return (
    <div className='table-container'>
      <h1 className='text-center mb-3'>Bartrans Logistics Account Assistant</h1>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить счет</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Отмена
          </Button>
          <Button
            variant='primary'
            onClick={() => deleteInvoiceHandler(deletedInvoiceId)}
          >
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
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
              <th style={{ width: '70%' }}>Клиент </th>
              <th style={{ width: '9%' }}>Сумма, ₽</th>
              <th style={{ width: '3%' }}></th>
              <th style={{ width: '3%' }}></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <InvoiceItem
                key={invoice._id}
                invoice={invoice}
                editHandler={invoiceSelectHandler}
                deleteHandler={() => deleteConfirmModal(invoice._id)}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default HomeScreen
