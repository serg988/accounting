import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAvrDate, setAvrDateModalOff} from '../../actions/invoiceActions'

import { Form, FormControl, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const PickDateModal = ({ showModal, closeModal, title, body }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  // const [avrDate, setAvrDate] = useState(new Date())

  const changeHandler = (e) => {
    const date = new Date(e.target.value).toLocaleDateString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    dispatch(setAvrDate(date))
    dispatch(setAvrDateModalOff())
    history.push('/invoices/AvrPrint')
  }

  // console.log(avrDate)
  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop='static'
        keyboard={false}
        size='sm'
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type='date'
                name='avrDate'
                // value={avrDate}
                onChange={changeHandler}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default PickDateModal
