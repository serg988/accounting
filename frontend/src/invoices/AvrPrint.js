import React from 'react'
import { Table } from 'react-bootstrap'
import classes from './InvoicePrint.module.css'

class InvoicePrint extends React.PureComponent {
  render() {
    return (
      <div className={classes.InvoicePrint}>
        <p>Исполнитель: ООО "БАРТРАНС ЛОГИСТИКА"</p>
        <p>Адрес: 353900 г.Новоросийск ул. Мира 3, телефон +7 8617 628577</p>
        <br />
        <p>Заказчик: {this.props.current.client}</p>
        <p>Адрес: {this.props.address}</p>

        {/* {this.props.text}
        {this.props.date} */}

        <h2 className='text-center my-4' style={{ fontWeight: '700' }}>
          АКТ ВЫПОЛНЕННЫХ РАБОТ № {this.props.current.number} от{' '}
          {this.props.date}
        </h2>

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
          <thead>
            <tr>
              <th style={{ width: '70%' }}> Наименование работы(услуги) </th>
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
        <p>Сумма прописью: {this.props.text}</p>
        <p>
          Вышеперечисленные услуги выполнены полностью и в срок. Заказчик
          претензий по объёму, качеству и срокам оказания услуг не имеет.
        </p>
        {this.props.size !== 'sm' && (
          <>
            <br />
            <br />
            <br />
          </>
        )}
        <div className='mt-5'>
          <strong>
            <span style={{ float: 'left' }}>Руководитель предприятия:</span>
            <span style={{ marginLeft: '50%' }}>Попов С.В.</span>
          </strong>
        </div>
      </div>
    )
  }
}

export default InvoicePrint
