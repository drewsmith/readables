import React from 'react'
import Vote from './Vote'
import { toDateString } from '../util'

const Comment = ({comment}) => (
  <div className="comment-container">
    <Vote total={comment.voteScore} commentId={comment.id} />
    <div className="comment-content">
      {comment.body}
      <div className="details">
        By {comment.author} on {toDateString(comment.timestamp)}
      </div>
    </div>
  </div>
)

export default Comment
