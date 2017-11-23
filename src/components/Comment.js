import React, { Component } from 'react'
import Vote from './Vote'
import PropTypes from 'prop-types'

import CommentModal from './modal/CommentModal'

import * as actions from '../actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { toDateString } from '../util'

class Comment extends Component {
  state = {
    openModal: false
  }

  toggleModal = () => this.setState((state) => ({ openModal: !state.openModal }))

  saveComment = (comment) => this.props.addComment(comment).then(this.toggleModal)

  deleteComment = () => this.props.deleteComment(this.props.comment.id)

  render() {
    let { comment, voteComment, postId } = this.props
    let { openModal } = this.state

    return (
      <div className="comment-container">
        <Vote
          total={comment.voteScore}
          voteId={comment.id}
          onVote={voteComment}
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
  addComment: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

export default connect(
  () => ({}),
  (dispatch) => bindActionCreators(actions, dispatch)
)(Comment)
