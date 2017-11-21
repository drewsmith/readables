import React from 'react'
import Modal from 'react-modal'

import Close from 'material-ui-icons/Close'

import '../../css/Modal.css'

const styles = {
  overlay : {
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    padding: '0 !important',
    border: 0,
    display: 'flex',
    flexDirection: 'column'
  }
}

const ModalContainer = ({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
  title = '',
  saveText = 'Save',
  children
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={styles}
    contentLabel="Modal"
  >
    <div className="modal-title-wrapper">
      <div className="modal-title">{title}</div>
      <Close onClick={onClose} color='#ffffff' className="close-modal-icon" />
    </div>
    <div className="modal-body">
      {children}
    </div>
    <div className="modal-footer">
      <button className="modal-save-button">{saveText}</button>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  </Modal>
)

export default ModalContainer
