import React from 'react'
import { useDispatch } from 'react-redux'
import { ErrorMessage, Formik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { createClient } from '../../actions/clientActions'
import TextError from './TextError'

export const FormNewClient = (props) => {
  const dispatch = useDispatch()
  const initialValues = {
    newClient: '',
  }
  function onSubmit(values) {
    dispatch(createClient({ name: values.newClient, address: values.address }))
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
