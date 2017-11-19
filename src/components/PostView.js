import React, { Component } from 'react'

import { connect } from 'react-redux'

import { fetchPost } from '../actions/posts'

class Post extends Component {
  componentDidMount() {

  }
  render() {
    let { post } = this.props
    return (
      <div className="post-wrapper">
        {post.title}
      </div>
    )
  }
}

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
          <Post post={post} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  post: state.posts.post
})

const mapDispatchToProps = (dispatch) => ({
  loadPost: (postId) => dispatch(fetchPost(postId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
