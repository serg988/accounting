import React from 'react'
import { Form, Col } from 'react-bootstrap'

const FormEl = () => {
  return (
    <Form>
      <Form.Row>
        <Col xs={9}>
          <Form.Control as='textarea' placeholder='Описание услуги' />
        </Col>
        <Col>
          <Form.Control placeholder='Количество' />
        </Col>
        <Col>
          <Form.Control placeholder='Цена' />
        </Col>
      </Form.Row>
    </Form>
  )
}

export default FormEl
