import React, { Component } from 'react'
import Post from './Post'
import Comment from './Comment'
import Loading from './Loading'
import CommentModal from './modal/CommentModal'

import Add from 'material-ui-icons/Add'

import { connect } from 'react-redux'
import { fetchPost, votePost, voteComment } from '../actions/posts'
import { sortByVoteScore } from '../util'

const iconStyles = {
  plus: {
    width: 14,
    height: 14,
    verticalAlign: 'middle'
  },
  text: {
    lineHeight: '20px',
    padding: '4px 5px 0 5px'
  }
}

class CommentList extends Component {
  state = {
    openModal: false
  }

  toggleModal = () => this.setState((state) => ({ openModal: !state.openModal }))

  render() {
    let { comments, onVoteComment } = this.props
    let { openModal } = this.state
    return (
      <div>
        <div className="comments-divider">
          Comments ({comments.length})
          <button className="add-comment-button" onClick={this.toggleModal}>
            <Add color="#455A64" style={iconStyles.plus} />
            <span style={iconStyles.text}>Add Comment</span>
          </button>
        </div>

        {comments.sort(sortByVoteScore).map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onVote={onVoteComment}
          />
        ))}

        <CommentModal isOpen={openModal} onClose={this.toggleModal} />
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
    let { loading, post, comments, onVotePost, onVoteComment } = this.props
    return (
      <div>
        {loading && <Loading />}
        {post && !loading && (
          <div>
            <Post post={post} comments={comments[post.id]} onVote={onVotePost} />
            {comments[post.id] && <CommentList comments={comments[post.id]} onVoteComment={onVoteComment} />}
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
  loadPost: (postId) => dispatch(fetchPost(postId)),
  onVotePost: (postId, direction) => dispatch(votePost(postId, direction)),
  onVoteComment: (commentId, direction) => dispatch(voteComment(commentId, direction))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
