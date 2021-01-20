import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { Formik, ErrorMessage, FieldArray, Field } from 'formik'
import ReactTooltip from 'react-tooltip'
import { Form, Col, Button } from 'react-bootstrap'
import TextError from '../shared/form/TextError'

import { updateInvoice } from '../actions/invoiceActions'

const reqdFieldMsg = 'Обязательное поле'

const schema = yup.object({
  vessel: yup.string().required(reqdFieldMsg),
  voyage: yup.string().required(reqdFieldMsg),
  bl: yup.string().required(reqdFieldMsg),
  container: yup.string().required(reqdFieldMsg),
})

const EditInvoice = () => {
  const [validData, setValidData] = useState({})
  const history = useHistory()

  const dispatch = useDispatch()

  const invoiceDetails = useSelector((state) => state.invoiceDetails)
  const { current } = invoiceDetails

  const onSubmit = (values) => {
    values.lines.map((line) => (line.subTotal = line.quantity * line.cost))

    const t = values.lines.map((line) => line.subTotal)
    const linesNumber = values.lines.length
    const total = t.reduce((a, b) => a + b)

    values = { ...values, total, linesNumber }
    setValidData(values)
    dispatch(updateInvoice(values))
    history.push('/') //////////////////////////////////////////////
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnChange={false}
        initialValues={current}
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
              {/* {err && <Message variant='danger'>{err}</Message>} */}
              {current ? (
                <Form noValidate onSubmit={handleSubmit}>
                  <h1>Редактирование счета № {current.number}</h1>
                  <h3>Клиент: {current.client}</h3>
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
                          <ReactTooltip
                            id='plusTip'
                            place='right'
                            effect='solid'
                          >
                            Добавить строку
                          </ReactTooltip>
                        </Form.Group>
                      </>
                    )}
                  />

                  <Button type='submit' variant='outline-primary'>
                    <i className='far fa-save'></i> Сохранить
                  </Button>
                  <Button
                    onClick={() => {
                      history.goBack()
                    }}
                    variant='outline-secondary'
                    style={{ marginLeft: '2rem' }}
                  >
                    <i className='fas fa-arrow-circle-left'></i> Назад
                  </Button>
                </Form>
              ) : (
                <div>Выберете счет для редактирования заново</div>
              )}
            </>
          )
        }}
      </Formik>
    </>
  )
}

export default EditInvoice
