import React from 'react'
import ModalContainer from './ModalContainer'

const CommentModal = ({isOpen, onClose, onSave}) => (
  <ModalContainer
    title="Add Comment"
    saveText="Save Comment"
    isOpen={isOpen}
    onClose={onClose}
    onSave={onSave}
  >
    <div>
      comment
    </div>
  </ModalContainer>
)

export default CommentModal
