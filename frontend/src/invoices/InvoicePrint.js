import React from 'react'
import { Table } from 'react-bootstrap'
import CompanyDetailsTable from '../shared/tables/CompanyDetailsTable'
import classes from './InvoicePrint.module.css'

class InvoicePrint extends React.PureComponent {
  render() {
    return (
      <div className={classes.InvoicePrint}>
        <CompanyDetailsTable style={{ width: '100)' }} />
        <h2 className='text-center my-4' style={{ fontWeight: '700' }}>
          Счет № {this.props.current.number} от {this.props.date}
        </h2>

        <p>Заказчик: {this.props.current.client}</p>

        <p>Плательщик: {this.props.current.client}</p>

        <br />
        <span className='mt-5'>Судно: {this.props.current.vessel}</span>
        <span className='ml-5'>Рейс: {this.props.current.voyage}</span>
        {this.props.current.bl && (
          <div>Коносамент: {this.props.current.bl}</div>
        )}
        {this.props.current.container.length < 14 ? (
          <span>Контейнер №: {this.props.current.container}</span>
        ) : (
          <span>Контейнеры №: {this.props.current.container}</span>
        )}
        <span style={{ float: 'right' }}>Валюта: рубли</span>

        <Table className={classes.mainTable} size={this.props.size}>
          <thead >
          <tr>
            <th style={{ width: '70%' }}> Наименование товара </th>
            <th> Ед. изм. </th>
            <th> Количество </th>
            <th> Цена </th>
            <th> Сумма </th>
          </tr>
          </thead>
          <tbody>
            {this.props.current.lines.map((line) => (
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
                <strong>{this.props.current.total.toFixed(2)}</strong>
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
                <strong>{this.props.current.total.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className='mt-5'>
          {this.props.size !== 'sm' && (
            <>
              <br />
              <br />
              <br />
            </>
          )}
          <span style={{ float: 'left' }}>Руководитель предприятия:</span>
          <span style={{ marginLeft: '50%' }}>Попов С.В.</span>
        </div>
      </div>
    )
  }
}

export default InvoicePrint
