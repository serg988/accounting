import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import { Form, Col, Button } from 'react-bootstrap'
import { createClient, listClients } from '../../actions/clientActions'

export const FormEdit = () => {
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

export const FormNewClient = (props) => {
  const dispatch = useDispatch()
  const initialValues = {
    newClient: '',
  }
  function onSubmit(values) {
    dispatch(createClient({ name: values.newClient }))
    
    console.log(values.newClient)
  }
  return (
    <Formik {...{ initialValues, onSubmit }}>
      {({ getFieldProps, handleSubmit }) => (
        <form className='baseForm' onSubmit={handleSubmit} noValidate>
          <Form.Control
            type='text'
            placeholder='Введите название клиента и нажмите Enter'
            id='newClient'
            {...getFieldProps('newClient')}
          />
        </form>
      )}
    </Formik>
  )
}

// export const FormNewClient = () => {
//   return (
//     <Form>
//       <Form.Row>
//         <Form.Control as={Col} placeholder='Новый Клиент' />
//         <Button
//           className='btn btn-success ml-2'
//           type='submit'
//           variant='primary'
//         >
//           Сохранить
//         </Button>
//       </Form.Row>
//     </Form>
//   )
// }
