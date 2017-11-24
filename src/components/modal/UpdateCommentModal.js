import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalContainer from './ModalContainer'

import * as actions from '../../actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const initialState = comment => ({
  body: comment.body,
  error: false
})

class UpdateCommentModal extends Component {
  state = initialState(this.props.comment)

  static propTypes = {
    comment: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState(initialState(nextProps.comment))
  }

  onEdit = () => {
    let { comment, onClose, editComment } = this.props
    let { body } = this.state

    if(!body || body.trim().length === 0) {
      this.setState({ error: true })
      return
    }

    editComment(comment.id, body).then(onClose)
  }

  handleFormChange = event => this.setState({ [event.target.name]: event.target.value })

  render() {
    let { isOpen, comment, onClose } = this.props
    let { error, body } = this.state

    return (
      <ModalContainer
        title="Update Comment"
        saveText="Update Comment"
        isOpen={isOpen}
        onClose={onClose}
        onSave={this.onEdit}
      >
        <div className="add-post">
          {error && (
            <div className="error">Comment body is required</div>
          )}
          <div className="field">
            <label>Name</label>
            <h3>{comment.author}</h3>
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

export default connect(
  () => ({}),
  (dispatch) => bindActionCreators(actions, dispatch)
)(UpdateCommentModal)
