import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalContainer from './ModalContainer'

import { fetchCategories } from '../../actions/categories'
import { createPost } from '../../actions/posts'
import { connect } from 'react-redux'

import uuid from 'uuid'
import '../../css/AddPost.css'

const defaultPost = {
  title: '',
  author: '',
  body: '',
  category: ''
}

class AddPostModal extends Component {
  state = {
    post: this.props.post,
    errors: false
  }

  componentDidMount() {
    let { loadCategories } = this.props
    loadCategories()
  }

  handleFormChange = (event) => {
    let { name, value } = event.target
    this.setState((state) => ({
      post: {
        ...state.post,
        [name]: value
      }
    }))
  }

  valid = () => {
    let { post } = this.state
    return (post.title && post.title.trim().length > 0) &&
      (post.author && post.author.trim().length > 0) &&
      (post.body && post.body.trim().length > 0) &&
      (post.category && post.category.trim().length > 0)
  }

  onPostSave = () => {
    if(!this.valid()) {
      this.setState({ error: true })
    } else {
      let { post } = this.state

      if(!post.id) post.id = uuid.v1()
      if(!post.timestamp) post.timestamp = Date.now()

      this.props.addPost(post)
        .then(this.closeModal)
        .then(() => window.location = `/post/${post.id}`)
    }
  }

  closeModal = () => {
    let { onClose } = this.props
    this.setState((state) => ({
      post: state.post.id ? state.post : defaultPost,
      error: false
    }))
    onClose()
  }

  render() {
    let { isOpen, categories } = this.props
    let { post, error } = this.state

    return (
      <ModalContainer
        title={`${post.id ? 'Update' : 'Add'} Post`}
        saveText={`${post.id ? 'Update' : 'Save'} Post`}
        isOpen={isOpen}
        onSave={this.onPostSave}
        onClose={this.closeModal}
      >
        <div className="add-post">
          {error && (
            <div className="error">All fields are required</div>
          )}
          <div className="field">
            <label>Title</label>
            <input type="text" name="title" onChange={this.handleFormChange} value={post.title} />
          </div>
          <div className="field">
            <label>Author</label>
            <input type="text" name="author" onChange={this.handleFormChange} value={post.author} />
          </div>
          <div className="field">
            <label>Text</label>
            <textarea name="body" onChange={this.handleFormChange} value={post.body} />
          </div>
          <div className="field">
            <label>Category</label>
            <select name="category" onChange={this.handleFormChange} value={post.category}>
              <option>Select a category</option>
            {categories.items && categories.items.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
            </select>
          </div>
        </div>
      </ModalContainer>
    )
  }
}

AddPostModal.propTypes = {
  post: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

AddPostModal.defaultProps = {
  post: defaultPost,
  isOpen: false
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    addPost: (post) => dispatch(createPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostModal)
