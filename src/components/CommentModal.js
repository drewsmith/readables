import React from 'react'
import Modal from 'react-modal'

import Close from 'material-ui-icons/Close'

import '../css/CommentModal.css'

const modalStyles = {
  content : {
    top: '100',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '500px',
    padding: '0'
  }
};

const CommentModal = ({isOpen, onClose, onSave}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={modalStyles}
    contentLabel="Modal"
  >
    <div className="modal-title-wrapper">
      <div className="modal-title">Add Comment</div>
      <Close onClick={onClose} color='#ffffff' className="close-modal-icon" />
    </div>

    <div className="modal-footer">
      <button className="modal-save-button">Save Comment</button>
    </div>
  </Modal>
)

export default CommentModal
