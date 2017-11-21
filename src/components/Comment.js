import React from 'react'
import Vote from './Vote'
import { toDateString } from '../util'

const Comment = ({comment, onVote}) => (
  <div className="comment-container">
    <Vote total={comment.voteScore} voteId={comment.id} onVote={onVote} />
    <div className="comment-content">
      {comment.body}
      <div className="details">
        By {comment.author} on {toDateString(comment.timestamp)}
      </div>
    </div>
  </div>
)

export default Comment
