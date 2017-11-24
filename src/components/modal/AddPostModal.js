import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalContainer from './ModalContainer'

import * as postActions from '../../actions/posts'
import * as categoryActions from '../../actions/categories'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import uuid from 'uuid'
import '../../css/AddPost.css'

const initialState = {
  title: '',
  author: '',
  body: '',
  category: '',
  error: false
}

class AddPostModal extends Component {
  state = initialState

  static propTypes = {
    post: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(initialState)
  }

  handleFormChange = event => this.setState({[event.target.name]: event.target.value})

  valid = () => {
    let { title, author, body, category } = this.state
    return (title && title.trim().length > 0) &&
      (author && author.trim().length > 0) &&
      (body && body.trim().length > 0) &&
      (category && category.trim().length > 0)
  }

  onPostSave = () => {
    if(!this.valid()) {
      this.setState({ error: true })
    } else {
      let { title, author, body, category } = this.state
      let { createPost, onClose } = this.props

      let id = uuid.v1()
      createPost({
        title: title,
        author: author,
        body: body,
        category: category,
        id: id,
        timestamp: Date.now()
      })
      .then(onClose)
      .then(() => window.location = `/${category}/${id}`)
    }
  }

  render() {
    let { isOpen, categories, onClose } = this.props
    let { title, author, body, category, error } = this.state

    return (
      <ModalContainer
        title="Add Post"
        saveText="Save Post"
        isOpen={isOpen}
        onSave={this.onPostSave}
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
            <input type="text" name="author" onChange={this.handleFormChange} value={author} />
          </div>
          <div className="field">
            <label>Text</label>
            <textarea name="body" onChange={this.handleFormChange} value={body} />
          </div>
          <div className="field">
            <label>Category</label>
            <select name="category" onChange={this.handleFormChange} value={category}>
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

export default connect(
  (state) => ({
    categories: state.categories
  }),
  (dispatch) => bindActionCreators(
    {...postActions, ...categoryActions},
    dispatch
  )
)(AddPostModal)
