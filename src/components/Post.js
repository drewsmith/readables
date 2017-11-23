import React, { Component } from 'react'
import Vote from './Vote'
import AddPostModal from './modal/AddPostModal'

import * as actions from '../actions/posts'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { toDateString } from '../util'

import PropTypes from 'prop-types'

import '../css/Posts.css'

class Post extends Component {
  state = {
    openModal: false
  }

  toggleModal = () => this.setState((state) => ({ openModal: !state.openModal }))

  handleDelete = () => {
    let {  deletePost, post } = this.props
    deletePost(post.id)
    window.location = '/'
  }

  render() {
    let { post, comments, votePost } = this.props
    let { openModal } = this.state
    return (
      <section className="post-container" key={post.id}>
        <Vote
          total={post.voteScore}
          voteId={post.id}
          onVote={votePost}
        />
        <div className="post-content">
          <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
          <p>{post.body}</p>
          <div className="details">
            By {post.author} on {toDateString(post.timestamp)}&nbsp;|&nbsp;
            { comments.length } Comments&nbsp;|&nbsp;
            { post.category }&nbsp;|&nbsp;
            <button className="footer-button" onClick={this.toggleModal}>Edit</button>&nbsp;|&nbsp;
            <button className="footer-button" onClick={this.handleDelete}>Delete</button>
          </div>
        </div>
        <AddPostModal
          key={post.id}
          isOpen={openModal}
          post={post}
          onClose={this.toggleModal}
        />
      </section>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array,
  votePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

Post.defaultProps = {
  comments: []
}

export default connect(
  () => ({}),
  (dispatch) => bindActionCreators(actions, dispatch)
)(Post)
