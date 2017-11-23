import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import ModalContainer from './ModalContainer'

const defaultComment = {
  body: '',
  author: ''
}

class CommentModal extends Component {
  state = {
    comment: this.props.comment,
    error: false
  }
/*
  componentWillReceiveProps(nextProps) {
    if(nextProps.comment && nextProps.comment !== this.state.comment) {
      this.setState({ comment: nextProps.comment })
    }
  }
*/
  handleFormChange = (event) => {
    let { name, value } = event.target
    this.setState((state) => ({
      comment: {
        ...state.comment,
        [name]: value
      }
    }))
  }

  valid = () => {
    let { comment } = this.state
    return (comment.author && comment.author.trim().length > 0) &&
      (comment.body && comment.body.trim().length > 0)
  }

  resetForm = () => {
    this.setState({
      comment: defaultComment,
      error: false
    })
  }

  onCommentSave = () => {
    if(!this.valid()) {
      this.setState({error: true})
    } else {
      let { comment } = this.state

      if(!comment.id) comment.id = uuid.v1()
      if(!comment.timestamp) comment.timestamp = Date.now()
      if(!comment.paretnId) comment.parentId = this.props.postId

      this.props.onSave(comment)
      this.resetForm()
    }
  }

  closeModal = () => {
    let { onClose } = this.props
    this.resetForm()
    onClose()
  }

  render() {
    let { isOpen } = this.props
    let { comment, error } = this.state

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
            <input type="text" name="author" onChange={this.handleFormChange} value={comment.author} />
          </div>
          <div className="field">
            <label>Comment</label>
            <textarea name="body" onChange={this.handleFormChange} value={comment.body} />
          </div>
        </div>
      </ModalContainer>
    )
  }
}

PropTypes.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object
}

PropTypes.defaultProps = {
  comment: defaultComment
}

export default CommentModal
