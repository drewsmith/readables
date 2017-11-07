import React, { Component } from 'react'
import '../css/AddPost.css'

class AddPost extends Component {
  state = {
    formData: {
      title: '',
      author: '',
      text: ''
    },
    errors: []
  }

  handleAddPost = () => {
    let { formData } = this.state
    let errors = Object.keys(formData).filter(key => formData[key] === '')
    this.setState({errors: errors})
  }

  handleFormChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    this.setState((state) => ({
      [state.formData[name]]: value
    }))
  }

  isError = (field) => this.state.errors.indexOf(field) >= 0

  render() {
    let { formData } = this.state
    return (
      <div className="add-post">
        <div className={`field ${this.isError('title') ? 'error' : ''}`}>
          <label>Title</label>
          <input type="text" name="title" onChange={this.handleFormChange} value={formData.title} />
        </div>
        <div className={`field ${this.isError('author') ? 'error' : ''}`}>
          <label>Author</label>
          <input type="text" name="author" onChange={this.handleFormChange} value={formData.author} />
        </div>
        <div className={`field ${this.isError('text') ? 'error' : ''}`}>
          <label>Text</label>
          <textarea name="text" onChange={this.handleFormChange} value={formData.text} />
        </div>
        <button className="add-post-button" onClick={this.handleAddPost}>Add Post</button>
      </div>
    )
  }
}

export default AddPost
