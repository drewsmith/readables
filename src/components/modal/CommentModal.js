import React from 'react'
import ModalContainer from './ModalContainer'
import AddComment from '../AddComment'

const CommentModal = ({isOpen, onClose, onSave}) => (
  <ModalContainer
    title="Add Comment"
    saveText="Save Comment"
    isOpen={isOpen}
    onClose={onClose}
    onSave={onSave}
  >
    <AddComment />
  </ModalContainer>
)

export default CommentModal
