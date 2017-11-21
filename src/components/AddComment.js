import React from 'react'

const AddComment = () => (
  <div className="add-post">
    <div className="field">
      <label>Name</label>
      <input type="text" name="name" />
    </div>
    <div className="field">
      <label>Comment</label>
      <textarea name="comment" />
    </div>
  </div>
)

export default AddComment
