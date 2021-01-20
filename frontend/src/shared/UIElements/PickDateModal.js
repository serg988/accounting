import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAvrDate, setAvrDateModalOff} from '../../actions/invoiceActions'

import { Form, Modal } from 'react-bootstrap'

const PickDateModal = ({ showModal, closeModal, title, body }) => {
  const history = useHistory()
  const dispatch = useDispatch()
 
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
