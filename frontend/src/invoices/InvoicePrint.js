import React from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CompanyDetailsTable from '../shared/tables/CompanyDetailsTable'
import { rubles } from 'rubles'
import classes from './InvoicePrint.module.css'

const InvoicePrint = () => {
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
  const text = rubles(current.total)

  return (
    <div className={classes.InvoicePrint}>
      <CompanyDetailsTable style={{ width: '100)' }} />
      <h2 className='text-center my-4'>
        Счет № {invoice.number} от {date}
      </h2>
      <div>
        <strong>Заказчик: {current.client}</strong>
      </div>
      <div>
        <strong>Плательщик: {current.client}</strong>
      </div>
      <br />
      <span className='mt-5'>Судно: {current.vessel}</span>
      <span className='ml-5'>Рейс: {current.voyage}</span>
      {current.bl && <div>Коносамент: {current.bl}</div>}
      {current.container.length < 14 ? (
        <span>Контейнер №: {current.container}</span>
      ) : (
        <span>Контейнеры №: {current.container}</span>
      )}
      <span style={{ float: 'right' }}>Валюта: рубли</span>

      <Table className={classes.mainTable} size='sm'>
        {/* <thead > */}
        <tr>
          <th style={{ width: '70%' }}> Наименование товара </th>
          <th> Ед. изм. </th>
          <th> Количество </th>
          <th> Цена </th>
          <th> Сумма </th>
        </tr>
        {/* </thead> */}
        <tbody>
          {current.lines.map((line) => (
            <tr key={line._id}>
              <td>{line.jobDescription}</td>
              <td>Шт.</td>
              <td>{line.quantity}</td>
              <td>{line.cost.toFixed(2)}</td>
              <td>{line.subTotal.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan='4' style={{ textAlign: 'right' }}>
              <strong>Итого:</strong>
            </td>
            <td>
              <strong>{current.total.toFixed(2)}</strong>
            </td>
          </tr>
          <tr>
            <td colSpan='4' style={{ textAlign: 'right' }}>
              <strong>Без налога НДС:</strong>
            </td>
            <td>
              <strong></strong>
            </td>
          </tr>
          <tr>
            <td colSpan='4' style={{ textAlign: 'right' }}>
              <strong>Всего к оплате:</strong>
            </td>
            <td>
              <strong>{current.total.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className='mt-5'>
        <strong>
          <span style={{ float: 'left' }}>Руководитель предприятия:</span>
          <span style={{ marginLeft: '50%' }}>Попов С.В.</span>
        </strong>
      </div>
    </div>
  )
}

export default InvoicePrint