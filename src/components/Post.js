import React from 'react'
import Vote from './Vote'
import { toDateString } from '../util'
import { Link } from 'react-router-dom'

import '../css/Posts.css'

const Post = ({post, comments = []}) => (
  <section className="post-container" key={post.id}>
    <Vote total={post.voteScore} postId={post.id} isPost={true} />
    <div className="post-content">
      <Link to={`/post/${post.id}`}>{post.title}</Link>
      <p>{post.body}</p>
      <div className="details">
        By {post.author} on {toDateString(post.timestamp)}&nbsp;|&nbsp;
        { comments.length } Comments&nbsp;|&nbsp;
        { post.category }
      </div>
    </div>
  </section>
)

export default Post
