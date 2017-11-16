import React, { Component } from 'react'

import Vote from './Vote'

const dateString = (timestamp) => (
  new Date(timestamp).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
)

const Post = ({post, comments = []}) => (
  <section className="post-container" key={post.id}>
    <Vote total={post.voteScore}/>
    <div className="post-content">
      <a href="#">{post.title}</a>
      <div className="details">
        By {post.author} on {dateString(post.timestamp)}&nbsp;|&nbsp;
        { comments.length } Comments&nbsp;|&nbsp;
        { post.category }
      </div>
    </div>
  </section>
)

export default Post
