import React from 'react'
import { toDateString } from '../util'

const Comment = ({comment}) => (
  <div className="comment-container">
    <div className="comment-content">
      {comment.body}
      <div className="details">
        By {comment.author} on {toDateString(comment.timestamp)}
      </div>
    </div>
  </div>
)

export default Comment
