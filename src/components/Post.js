import React, { Component } from 'react'
import Vote from './Vote'
import AddPostModal from './modal/AddPostModal'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { votePost, deletePost, createPost } from '../actions/posts'
import { toDateString } from '../util'

import PropTypes from 'prop-types'

import '../css/Posts.css'

class Post extends Component {
  state = {
    openModal: false
  }

  toggleModal = () => this.setState((state) => ({openModal: !state.openModal}))

  handleDelete = () => {
    this.props.onDeletePost(this.props.post.id)
    window.location = '/'
  }

  render() {
    let { post, comments, onVotePost } = this.props
    let { openModal } = this.state
    return (
      <section className="post-container" key={post.id}>
        <Vote
          total={post.voteScore}
          voteId={post.id}
          onVote={onVotePost}
        />
        <div className="post-content">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
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
  comments: PropTypes.object,
  onVotePost: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired
}

Post.defaultProps = {
  comments: []
}

const mapStateToProps = (state) => {
  return {
    comments: state.posts.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePost: (post) => dispatch(createPost(post)),
    onVotePost: (postId, direction) => dispatch(votePost(postId, direction)),
    onDeletePost: (postId) => dispatch(deletePost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
