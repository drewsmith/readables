import React, { Component } from 'react'
import Post from './Post'

import { connect } from 'react-redux'

import { fetchPost } from '../actions/posts'

class PostView extends Component {
  componentDidMount() {
    let { postId } = this.props.match.params
    if(postId) {
      this.props.loadPost(postId)
    }
  }
  render() {
    let { loading = false, post } = this.props
    return (
      <div>
        {loading && (
          <div>Loading</div>
        )}
        {post && (
          <Post post={post} categories={[]} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.posts.loading,
    post: state.posts.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPost: (postId) => dispatch(fetchPost(postId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
