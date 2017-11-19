import React, { Component } from 'react'
import Post from './Post'

import { connect } from 'react-redux'

import { fetchPost } from '../actions/posts'

class PostView extends Component {
  componentDidMount() {
    let { params = {}, loadPost } = this.props
    let { postId } = params

    if(postId) {
      loadPost(postId)
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
    loading: state.loading,
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPost: () => dispatch(fetchPost()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
