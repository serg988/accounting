import React from 'react'

import { Modal } from 'react-bootstrap'

const EditModal = ({ showModal, closeModal, title, body }) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop='static'
        keyboard={false}
        size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </>
  )
}

export default EditModal
