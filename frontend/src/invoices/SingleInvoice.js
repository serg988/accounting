import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listInvoiceDetails,
  setCurrentInvoice,
} from '../actions/invoiceActions'

const SingleInvoice = ({ match }) => {
  const dispatch = useDispatch()
  const invoiceDetails = useSelector((state) => state.invoiceDetails)
  const { loading, error, invoice } = invoiceDetails

  const history = useHistory()

  useEffect(() => {
    dispatch(listInvoiceDetails(match.params.iid))
  }, [dispatch, match.params.iid])

  console.log(invoice)

  let content = null
  if (invoice) {
    const {
      number,
      client,
      vessel,
      voyage,
      bl,
      container,
      lines,
      total,
    } = invoice

    const editHandler = (invoice) => {
      console.log('IIIIII', invoice)
      dispatch(setCurrentInvoice(invoice))
      history.push('/invoices/edit')
    }

    const copyHandler = (invoice) => {
      console.log('IIIIII', invoice)
      dispatch(setCurrentInvoice(invoice))
      history.push('/invoices/copy')
    }

    const printHandler = (invoice) => {
      dispatch(setCurrentInvoice(invoice))
      history.push('/invoices/print')
    }

    content = loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
        <h2 className='text-center'>Счет № {number}</h2>
        <h4>Клиент: {client}</h4>
        <Table bordered hover size='sm'>
          <tbody>
            <tr>
              <td>Судно: </td>
              <td>{vessel}</td>
            </tr>
            <tr>
              <td>Номер рейса: </td>
              <td>{voyage}</td>
            </tr>
            <tr>
              <td>Номер коносамента:</td>
              <td>{bl}</td>
            </tr>
            <tr>
              <td>Номера контейнеров:</td>
              <td>{container}</td>
            </tr>
          </tbody>
        </Table>
        <Table bordered striped hover size='sm'>
          <thead>
            <tr>
              <th style={{ width: '70%' }}>Оказанная услуга</th>
              <th style={{ width: '10%' }}>Количество</th>
              <th style={{ width: '10%' }}>Цена </th>
              <th style={{ width: '10%' }}>Сумма </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={Math.random()}>
                <td>{line.jobDescription}</td>
                <td>{line.quantity}</td>
                <td>{line.cost}</td>
                <td>{line.subTotal}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Всего: </strong>
              </td>
              <td></td>
              <td></td>
              <td>
                <strong>{total} руб.</strong>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant='outline-primary'
          onClick={() => editHandler(invoice)}
          data-tip
          data-for='editTip'
        >
          <i class='far fa-edit'></i>
        </Button>
        <ReactTooltip id='editTip' place='top' effect='solid'>
          Редактировать счет
        </ReactTooltip>
        <Button
          variant='outline-info'
          className='ml-3'
          onClick={() => copyHandler(invoice)}
          data-tip
          data-for='copyTip'
        >
          <i class='far fa-copy'></i>
        </Button>
        <ReactTooltip id='copyTip' place='bottom' effect='solid'>
          Копировать счет
        </ReactTooltip>
        <Button
          variant='outline-success'
          className='ml-5'
          onClick={() => printHandler(invoice)}
          data-tip
          data-for='printTip'
        >
          <i class='fas fa-print'></i>
        </Button>
        <ReactTooltip id='printTip' place='left' effect='solid'>
          Сформировать счет для печати
        </ReactTooltip>
        <Button
          variant='outline-dark'
          className='ml-3'
          onClick={() => printHandler(invoice)}
          data-tip
          data-for='printAvrTip'
        >
          <i class='fab fa-buysellads'></i>
        </Button>
        <ReactTooltip id='printAvrTip' place='right' effect='solid'>
          Сформировать АВР для печати
        </ReactTooltip>
      </>
    )
  }
  return content
}

export default withRouter(SingleInvoice)
