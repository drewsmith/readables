import React from 'react'
import { Link } from 'react-router-dom'
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
    <Vote total={post.voteScore} postId={post.id}/>
    <div className="post-content">
      <Link to={`/post/${post.id}`}>{post.title}</Link>
      <div className="details">
        By {post.author} on {dateString(post.timestamp)}&nbsp;|&nbsp;
        { comments.length } Comments&nbsp;|&nbsp;
        { post.category }
      </div>
    </div>
  </section>
)

export default Post
