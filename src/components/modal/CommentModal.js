import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import ModalContainer from './ModalContainer'

const initialState = (comment) => ({
  author: comment.author || '',
  body: comment.body || '',
  error: false
})

class CommentModal extends Component {
  state = initialState(this.props.comment)

  componentWillReceiveProps(nextProps) {
    this.setState(initialState(nextProps.comment))
  }

  handleFormChange = (event) => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  valid = () => {
    let { author, body } = this.state
    return (author && author.trim().length > 0) &&
      (body && body.trim().length > 0)
  }

  resetForm = () => {
    this.setState({
      comment: {},
      error: false
    })
  }

  onCommentSave = () => {
    if(!this.valid()) {
      this.setState({error: true})
    } else {
      let { author, body } = this.state
      let { comment, postId } = this.props
      this.props.onSave({
        id: comment.id || uuid.v1(),
        timestamp: comment.timestamp || Date.now(),
        parentId: comment.parentId || postId,
        author: author,
        body: body
      })
    }
  }

  closeModal = () => {
    //this.resetForm()
    this.props.onClose()
  }

  render() {
    let { isOpen, comment } = this.props
    let { error, author, body } = this.state
    
    return (
      <ModalContainer
        title={`${comment.id ? 'Update' : 'Add'} Comment`}
        saveText={`${comment.id ? 'Update' : 'Save'} Comment`}
        isOpen={isOpen}
        onClose={this.closeModal}
        onSave={this.onCommentSave}
      >
        <div className="add-post">
          {error && (
            <div className="error">All fields are required</div>
          )}
          <div className="field">
            <label>Name</label>
            <input type="text" name="author" onChange={this.handleFormChange} value={author} />
          </div>
          <div className="field">
            <label>Comment</label>
            <textarea name="body" onChange={this.handleFormChange} value={body} />
          </div>
        </div>
      </ModalContainer>
    )
  }
}

CommentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
}

export default CommentModal
