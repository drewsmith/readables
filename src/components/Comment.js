import React, { Component } from 'react'
import Vote from './Vote'
import PropTypes from 'prop-types'

import CommentModal from './modal/CommentModal'

import { connect } from 'react-redux'
import { voteComment, addComment, deleteComment } from '../actions/posts'

import { toDateString } from '../util'

class Comment extends Component {
  state = {
    openModal: false
  }

  toggleModal = () => this.setState((state) => ({ openModal: !state.openModal }))

  saveComment = (comment) => this.props.onAddComment(comment).then(this.toggleModal)

  deleteComment = () => this.props.onDeleteComment(this.props.comment.id)

  render() {
    let { comment, onVoteComment, postId } = this.props
    let { openModal } = this.state

    return (
      <div className="comment-container">
        <Vote
          total={comment.voteScore}
          voteId={comment.id}
          onVote={onVoteComment}
        />

        <div className="comment-content">
          {comment.body}
          <div className="details">
            By {comment.author} on {toDateString(comment.timestamp)}
          </div>
          <div className="comment-footer">
            <button onClick={this.toggleModal} className="footer-button">Edit</button>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <button onClick={this.deleteComment} className="footer-button">Delete</button>
          </div>
        </div>

        <CommentModal
          key={comment.id}
          isOpen={openModal}
          onClose={this.toggleModal}
          postId={postId}
          onSave={this.saveComment}
          comment={comment}
        />
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onVoteComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (comment) => dispatch(addComment(comment)),
  onVoteComment: (commentId, direction) => dispatch(voteComment(commentId, direction)),
  onDeleteComment: (commentId) => dispatch(deleteComment(commentId))
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(Comment)
