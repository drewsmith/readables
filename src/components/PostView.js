import React, { Component } from 'react'
import Post from './Post'
import Comment from './Comment'
import Loading from './Loading'
import { connect } from 'react-redux'

import { fetchPost } from '../actions/posts'

const CommentList = ({comments = []}) => (
  <div>
    <div className="comments-divider">Comments ({comments.length})</div>
    {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
  </div>
)

class PostView extends Component {
  componentDidMount() {
    let { postId } = this.props.match.params
    if(postId) {
      this.props.loadPost(postId)
    }
  }
  render() {
    let { loading, post, comments } = this.props
    return (
      <div>
        {loading && <Loading />}
        {post && !loading && (
          <div>
            <Post post={post} comments={comments[post.id]} />
            {comments[post.id] && <CommentList comments={comments[post.id]} />}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.posts.loading,
    post: state.posts.post,
    comments: state.posts.comments
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadPost: (postId) => dispatch(fetchPost(postId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
