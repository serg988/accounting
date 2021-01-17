import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { ErrorMessage, Formik } from 'formik'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { createClient, listClients } from '../../actions/clientActions'
import TextError from './TextError'

// import { Formik, Form } from 'formik'

import FormikControl from './FormikControl'

const reqdFieldMsg = 'Обязательное поле'

export const FormNewClient = (props) => {
  const dispatch = useDispatch()
  const initialValues = {
    newClient: '',
  }
  function onSubmit(values) {
    dispatch(createClient({ name: values.newClient, address: values.address }))

    console.log(values.newClient)
  }
  return (
    <Formik {...{ initialValues, onSubmit }}>
      {({ getFieldProps, handleSubmit, errors, touched }) => (
        <form
          className='baseForm'
          onSubmit={handleSubmit}
          // validationSchema={schema}
        >
          <Form.Control
            type='text'
            placeholder='Введите название клиента'
            id='newClient'
            {...getFieldProps('newClient')}
            isInvalid={errors.newClient && touched.newClient}
          />
          <ErrorMessage name='newClient' component={TextError} />

          <Form.Control
            className='mt-2'
            type='text'
            placeholder='Введите адрес клиента'
            id='newClient'
            {...getFieldProps('address')}
            isInvalid={errors.newClient && touched.newClient}
          />
          <ErrorMessage name='newClient' component={TextError} />

          <Button className='mt-2' type='submit' disabled={errors.newClient}>
            Сохранить
          </Button>
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
