import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { Formik, ErrorMessage, FieldArray, Field } from 'formik'
import { Form, Col, Button } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import SuccessModal from '../shared/UIElements/SuccessModal'
import TextError from '../shared/form/TextError'
import EditModal from '../shared/UIElements/EditModal'
import { FormNewClient } from '../shared/form/Form'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  createClient,
  newClientModalHide,
  newClientModalShow,
} from '../actions/clientActions'
import { createInvoice } from '../actions/invoiceActions'

const reqdFieldMsg = 'Обязательное поле'

const schema = yup.object({
  client: yup.string().required(reqdFieldMsg),
  vessel: yup.string().required(reqdFieldMsg),
  voyage: yup.string().required(reqdFieldMsg),
  bl: yup.string().required(reqdFieldMsg),
  container: yup.string().required(reqdFieldMsg),
})

const NewInvoice = () => {
  const [validData, setValidData] = useState({})
  const [showModal, setShowModal] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()
  const clientList = useSelector((state) => state.clientList)
  const { clients } = clientList

  const clientCreate = useSelector((state) => state.clientCreate)
  const { isNewClientModalShow, err } = clientCreate

  const invoiceList = useSelector((state) => state.invoiceList)
  const { nextInvoiceNumber } = invoiceList

  const invoiceCreate = useSelector((state) => state.invoiceCreate)
  const { invoice } = invoiceCreate

  const invoiceDetails = useSelector((state) => state.invoiceDetails)
  const { current } = invoiceDetails

  const onSubmit = (values) => {
    values.lines.map((line) => (line.subTotal = line.quantity * line.cost))

    const t = values.lines.map((line) => line.subTotal)
    const linesNumber = values.lines.length
    const total = t.reduce((a, b) => a + b)

    values = { ...values, total, linesNumber, number: nextInvoiceNumber }

    console.log(values)
    setValidData(values)
    dispatch(createInvoice(values))
    console.log(invoice);
    history.push('/') //////////////////////////////////////////////
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
                        <option key={client.name}>{client.name}</option>
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
                      {values.lines.map((line, index) => (
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
                              variant='outline-primary'
                              type='button'
                              onClick={() => {
                                arrayHelpers.remove(index)
                              }}
                              data-tip
                              data-for='minusTip'
                            >
                              <i className='fas fa-minus-circle'></i>
                            </Button>
                            <ReactTooltip
                              id='minusTip'
                              place='top'
                              effect='solid'
                            >
                              Удалить строку
                            </ReactTooltip>
                          </Form.Group>
                        </Form.Row>
                      ))}
                      <Form.Group>
                        <Button
                          variant='outline-success'
                          // className='btn btn-success'
                          type='button'
                          onClick={() => {
                            arrayHelpers.push('')
                          }}
                          data-tip
                          data-for='plusTip'
                        >
                          <i className='fas fa-plus-circle'></i>
                        </Button>
                        <ReactTooltip id='plusTip' place='right' effect='solid'>
                          Добавить строку
                        </ReactTooltip>
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
