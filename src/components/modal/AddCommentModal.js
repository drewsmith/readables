import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

import * as actions from '../../actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ModalContainer from './ModalContainer'

const initialState = {
  author: '',
  body: '',
  error: false
}

class CommentModal extends Component {
  state = initialState

  componentWillReceiveProps(nextProps) {
    this.setState(initialState)
  }

  handleFormChange = event => this.setState({ [event.target.name]: event.target.value })

  valid = () => {
    let { author, body } = this.state
    return (author && author.trim().length > 0) &&
      (body && body.trim().length > 0)
  }

  onCommentSave = () => {
    if(!this.valid()) {
      this.setState({ error: true })
      return
    }

    let { author, body } = this.state
    let { postId, addComment, onClose } = this.props

    addComment({
      id: uuid.v1(),
      timestamp: Date.now(),
      parentId: postId,
      author: author,
      body: body
    })
    .then(onClose)
  }

  render() {
    let { isOpen, onClose } = this.props
    let { error, author, body } = this.state

    return (
      <ModalContainer
        title="Add Comment"
        saveText="Save Comment"
        isOpen={isOpen}
        onClose={onClose}
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
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
}

export default connect(
  () => ({}),
  (dispatch) => bindActionCreators(actions, dispatch)
)(CommentModal)
