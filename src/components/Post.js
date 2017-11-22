import React, { Component } from 'react'
import Vote from './Vote'

import { toDateString } from '../util'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { votePost } from '../actions/posts'

import '../css/Posts.css'

class Post extends Component {
  render() {
    let { post, comments = [], onVotePost } = this.props
    return (
      <section className="post-container" key={post.id}>
        <Vote total={post.voteScore} voteId={post.id} onVote={onVotePost} />
        <div className="post-content">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
          <p>{post.body}</p>
          <div className="details">
            By {post.author} on {toDateString(post.timestamp)}&nbsp;|&nbsp;
            { comments.length } Comments&nbsp;|&nbsp;
            { post.category }&nbsp;|&nbsp;
            <button className="footer-button">Edit</button>&nbsp;|&nbsp;
            <button className="footer-button">Delete</button>
          </div>
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVotePost: (postId, direction) => dispatch(votePost(postId, direction))
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(Post)
