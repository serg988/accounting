import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik, ErrorMessage, FieldArray } from 'formik'
import { Form, Col, Button } from 'react-bootstrap'
import SuccessModal from '../shared/UIElements/SuccessModal'
import TextError from '../shared/form/TextError'

// const PASSWORD_PATTERN = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$/
const reqdFieldMsg = 'Обязательное поле'
// const invalidPwdMsg =
//   'Password must contain atleast eight characters, at least one letter and one number.'
const schema = yup.object({
  customer: yup.string().required(reqdFieldMsg),
  vessel: yup.string().required(reqdFieldMsg),
  voyage: yup.string().required(reqdFieldMsg),
  bl: yup.string().required(reqdFieldMsg),
  container: yup.string().required(reqdFieldMsg),
})

const customers = ['TSRY', 'Фортуна', 'ИП Скакун']

const NewInvoice = () => {
  const [validData, setValidData] = useState({})
  const [showModal, setShowModal] = useState(false)

  const onSubmit = (values) => {
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
          customer: '',
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
          const addLinesHandler = () => {}
          console.log(values.lines)

          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md='8'>
                  <Form.Label>Клиент - выбор из списка</Form.Label>
                  <Form.Control
                    as='select'
                    type='text'
                    name='customer'
                    {...getFieldProps('customer')}
                    isInvalid={errors.customer && touched.customer}
                  >
                    <option></option>
                    {customers.map((customer) => (
                      <option key={customer}>{customer}</option>
                    ))}
                  </Form.Control>
                  <ErrorMessage name='customer' component={TextError} />
                </Form.Group>
                <Form.Group>
                  <Button className='btn-success' style={{ marginTop: '31px' }}>
                    или - Новый клиент
                  </Button>
                </Form.Group>
              </Form.Row>

              <Form.Row>
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

              <Form.Label>Позиции счета</Form.Label>
              <FieldArray name='lines'>
                {(fieldArrayProps) => {
                  console.log(fieldArrayProps)
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { lines } = values
                  return (
                    <div>
                      {lines.map((line, index) => (
                        <>
                          <Form.Control
                            type='text'
                            name={`lines.${index}.jobDescription`}
                            {...getFieldProps(`line.${index}.jobDescription`)}
                          />
                          <Form.Control
                            type='text'
                            name={`lines.${index}.quantity`}
                            {...getFieldProps(`line.${index}.quantity`)}
                          />
                          <Form.Control
                            type='text'
                            name={`lines.${index}.cost`}
                            {...getFieldProps(`line.${index}.cost`)}
                          />
                          <Button
                            onClick={() => {
                              remove(index)
                            }}
                          >
                            -
                          </Button>
                          <Button
                            onClick={() => {
                              push('')
                            }}
                          >
                            +
                          </Button>
                        </>
                      ))}
                    </div>
                  )
                }}
              </FieldArray>

              {/* <Form.Row>
                <Form.Group as={Col} xs={8}>
                  <Form.Label>Описание услуги</Form.Label>
                  <Form.Control
                    as='textarea'
                    type='text'
                    name='lines.jobDescription'
                    // placeholder='Описание услуги'
                    {...getFieldProps('jobDescription')}
                    isInvalid={errors.jobDescription && touched.jobDescription}
                  />
                  <ErrorMessage name='jobDescription' component={TextError} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Количество</Form.Label>
                  <Form.Control
                    type='text'
                    name='lines.quantity'
                    {...getFieldProps('quantity')}
                    isInvalid={errors.quantity && touched.quantity}
                  />
                  <ErrorMessage name='quantity' component={TextError} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Цена</Form.Label>
                  <Form.Control
                    type='text'
                    name='lines.cost'
                    {...getFieldProps('cost')}
                    isInvalid={errors.cost && touched.cost}
                  />
                  <ErrorMessage name='cost' component={TextError} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Button
                    className='btn-small btn-success'
                    style={{ marginTop: '31px' }}
                    onClick={addLinesHandler}
                  >
                    +
                  </Button>
                </Form.Group>
              </Form.Row> */}

              <Button type='submit'>Submit</Button>
            </Form>
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
