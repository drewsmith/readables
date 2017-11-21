import React from 'react'
import ModalContainer from './ModalContainer'
import AddPost from '../AddPost'

const AddPostModal = ({isOpen, onClose, onSave}) => (
  <ModalContainer
    title="Add Post"
    saveText="Save Post"
    isOpen={isOpen}
    onClose={onClose}
    onSave={onSave}
  >
    <AddPost />
  </ModalContainer>
)

export default AddPostModal
