import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalContainer from './ModalContainer'

import * as actions from '../../actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const initialState = post => ({
  title: post.title,
  body: post.body,
  error: false
})

class UpdatePostModal extends Component {
  state = initialState(this.props.post)

  static propTypes = {
    post: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState(initialState(nextProps.post))
  }

  handleFormChange = event => this.setState({[event.target.name]: event.target.value})

  valid = () => {
    let { title, body } = this.state
    return (title && title.trim().length > 0) &&
      (body && body.trim().length > 0)
  }

  onPostEdit = () => {
    if(!this.valid()) {
      this.setState({ error: true })
      return
    }
    let { title, body } = this.state
    let { editPost, onClose, post } = this.props

    editPost(title, body, post.id).then(onClose)
  }

  render() {
    let { isOpen, onClose, post } = this.props
    let { title, body, error } = this.state

    return (
      <ModalContainer
        title="Update Post"
        saveText="Update Post"
        isOpen={isOpen}
        onSave={this.onPostEdit}
        onClose={onClose}
      >
        <div className="add-post">
          {error && (
            <div className="error">All fields are required</div>
          )}
          <div className="field">
            <label>Title</label>
            <input type="text" name="title" onChange={this.handleFormChange} value={title} />
          </div>
          <div className="field">
            <label>Author</label>
            <h3>{post.author}</h3>
          </div>
          <div className="field">
            <label>Text</label>
            <textarea name="body" onChange={this.handleFormChange} value={body} />
          </div>
          <div className="field">
            <label>Category</label>
            <h3>{post.category}</h3>
          </div>
        </div>
      </ModalContainer>
    )
  }
}

export default connect(
  () => ({}),
  (dispatch) => bindActionCreators(actions, dispatch)
)(UpdatePostModal)
