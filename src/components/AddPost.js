import React, { Component } from 'react'
import { fetchCategories } from '../actions/categories'
import { createPost } from '../actions/posts'
import { connect } from 'react-redux'
import uuid from 'uuid'
import '../css/AddPost.css'

class AddPost extends Component {
  state = {
    title: '',
    author: '',
    text: '',
    category: '',
    errors: []
  }

  componentDidMount() {
    this.props.loadCategories()
  }

  validateForm = () => {
    let { title, author, text, category } = this.state
    let errors = []

    if(title === '') errors.push('title')
    if(author === '') errors.push('author')
    if(text === '') errors.push('text')
    if(category === '') errors.push('category')

    this.setState({errors: errors})
  }

  handleAddPost = () => {
    this.validateForm()

    let { errors, title, author, text, category } = this.state
    if (errors.length === 0) {

      let post = {
        id: uuid.v1(),
        title: title,
        author: author,
        body: text,
        category: category,
        timestamp: Date.now()
      }

      this.props.createPost(post)
    }
  }

  handleFormChange = (event) => this.setState({[event.target.name]: event.target.value})

  isError = (field) => this.state.errors.indexOf(field) >= 0

  render() {
    let { title, author, text, category } = this.state
    let { categories } = this.props
    return (
      <div className="add-post">
        <div className={`field ${this.isError('title') ? 'error' : ''}`}>
          <label>Title</label>
          <input type="text" name="title" onChange={this.handleFormChange} value={title} />
        </div>
        <div className={`field ${this.isError('author') ? 'error' : ''}`}>
          <label>Author</label>
          <input type="text" name="author" onChange={this.handleFormChange} value={author} />
        </div>
        <div className={`field ${this.isError('text') ? 'error' : ''}`}>
          <label>Text</label>
          <textarea name="text" onChange={this.handleFormChange} value={text} />
        </div>
        <div className={`field ${this.isError('text') ? 'error' : ''}`}>
          <label>Category</label>
          <select name="category" onChange={this.handleFormChange} value={category}>
            <option>Select a category</option>
          {categories.items && categories.items.map(cat => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
          </select>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    createPost: (post) => dispatch(createPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost)
