import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import * as yup from 'yup'
import { Formik, ErrorMessage, FieldArray, Field } from 'formik'
import { Form, Col, Button } from 'react-bootstrap'
import SuccessModal from '../shared/UIElements/SuccessModal'
import TextError from '../shared/form/TextError'
import EditModal from '../shared/UIElements/EditModal'
import { FormNewClient } from '../shared/form/Form'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  createClient,
  listClients,
  newClientModalHide,
  newClientModalShow,
} from '../actions/clientActions'

const reqdFieldMsg = 'Обязательное поле'

const schema = yup.object({
  client: yup.string().required(reqdFieldMsg),
  vessel: yup.string().required(reqdFieldMsg),
  voyage: yup.string().required(reqdFieldMsg),
  bl: yup.string().required(reqdFieldMsg),
  container: yup.string().required(reqdFieldMsg),
})

// const clients = ['TSRY', 'Фортуна', 'ИП Скакун']

const NewInvoice = () => {
  const [validData, setValidData] = useState({})
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()
  const clientList = useSelector((state) => state.clientList)
  const { loading, error, clients } = clientList

  const clientCreate = useSelector((state) => state.clientCreate)
  const { isNewClientModalShow, err } = clientCreate

  useEffect(() => {
    dispatch(listClients())
  }, [dispatch])

  const onSubmit = (values) => {
    console.log(values)
    const subTotal = values.lines.map((line) => line.quantity * line.cost)
    const total = subTotal.reduce((a, b) => a + b)
    console.log(total)
    values = { ...values, total }
    console.log(values)
    setValidData(values)
    setShowModal(true)
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnChange={false}
        initialValues={{
          client: '',
          vessel: '',
          voyage: '',
          bl: '',
          container: '',
          lines: [
            {
              jobDescription: '',
              quantity: '',
              cost: '',
            },
          ],
          linesNumber: [''],
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          getFieldProps,
          values,
          touched,
          errors,
        }) => {
          return (
            <>
              {err && <Message variant='danger'>{err}</Message>}
              <EditModal
                showModal={isNewClientModalShow}
                closeModal={() => dispatch(newClientModalHide())}
                title='Введите название компании'
                body={<FormNewClient />}
              />
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row className='mb-2'>
                  <Form.Group as={Col} md='8'>
                    <Form.Label>Клиент - выбор из списка</Form.Label>
                    <Form.Control
                      as='select'
                      type='text'
                      name='client'
                      {...getFieldProps('client')}
                      isInvalid={errors.client && touched.client}
                    >
                      <option></option>
                      {clients.map((client) => (
                        <option key={client}>{client}</option>
                      ))}
                    </Form.Control>
                    <ErrorMessage name='client' component={TextError} />
                  </Form.Group>
                  <Form.Group>
                    <Button
                      className='btn-secondary'
                      style={{ marginTop: '31px' }}
                      onClick={() => dispatch(newClientModalShow())}
                    >
                      или - Новый клиент
                    </Button>
                  </Form.Group>
                </Form.Row>

                <Form.Row className='mb-2'>
                  <Form.Group as={Col} md='8'>
                    <Form.Label>Судно</Form.Label>
                    <Form.Control
                      type='text'
                      name='vessel'
                      // placeholder='Название судна'
                      {...getFieldProps('vessel')}
                      isInvalid={errors.vessel && touched.vessel}
                    />
                    <ErrorMessage name='vessel' component={TextError} />
                  </Form.Group>
                  <Form.Group as={Col} md='4'>
                    <Form.Label>Номер рейса</Form.Label>
                    <Form.Control
                      type='text'
                      name='voyage'
                      // placeholder='Номер рейса'
                      {...getFieldProps('voyage')}
                      isInvalid={errors.voyage && touched.voyage}
                    />
                    <ErrorMessage name='voyage' component={TextError} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md='4'>
                    <Form.Label>Коносамент</Form.Label>
                    <Form.Control
                      type='text'
                      name='bl'
                      // placeholder='Номер коносамента'
                      {...getFieldProps('bl')}
                      isInvalid={errors.bl && touched.bl}
                    />
                    <ErrorMessage name='bl' component={TextError} />
                  </Form.Group>
                  <Form.Group as={Col} md='8'>
                    <Form.Label>Номера контейнеров</Form.Label>
                    <Form.Control
                      type='text'
                      name='container'
                      // placeholder='Номера контейнеров'
                      {...getFieldProps('container')}
                      isInvalid={errors.container && touched.container}
                    />
                    <ErrorMessage name='container' component={TextError} />
                  </Form.Group>
                </Form.Row>

                <h5 className='text-center mt-5'>Позиции Счета</h5>

                <FieldArray
                  name='lines'
                  render={(arrayHelpers) => (
                    <>
                      {values.lines.map((friend, index) => (
                        <Form.Row key={index}>
                          {/** both these conventions do the same */}
                          <Form.Group as={Col} xs={9}>
                            <Field
                              as={Form.Control}
                              name={`lines[${index}].jobDescription`}
                              placeholder='Описание услуги'
                            />
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Field
                              as={Form.Control}
                              name={`lines.${index}.quantity`}
                              placeholder='Количество'
                            />
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Field
                              as={Form.Control}
                              name={`lines.${index}.cost`}
                              placeholder='Цена'
                            />
                          </Form.Group>
                          <Form.Group>
                            <Button
                              className='btn'
                              type='button'
                              onClick={() => {
                                arrayHelpers.remove(index)
                              }}
                            >
                              <i className='fas fa-minus-circle'></i>
                            </Button>
                          </Form.Group>
                        </Form.Row>
                      ))}
                      <Form.Group>
                        <Button
                          className='btn btn-success'
                          type='button'
                          onClick={() => {
                            arrayHelpers.push('')
                          }}
                        >
                          <i className='fas fa-plus-circle'></i>
                        </Button>
                      </Form.Group>
                    </>
                  )}
                />

                <Button type='submit'>Отправить</Button>
              </Form>
            </>
          )
        }}
      </Formik>
      <SuccessModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={validData}
      />
    </>
  )
}

export default NewInvoice
