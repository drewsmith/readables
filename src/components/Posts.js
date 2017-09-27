import React from 'react'
import Vote from './Vote'

import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

import '../css/Posts.css'

const Posts = () => (
  <main>
    <section className="subheader">
      0 Posts for Category
    </section>
    <section className="post-container">
      <Vote/>
      <div className="post-content">
        <a href="#">This is an article that is a link.</a>
        <div className="details">
          By Your Mom, March 27, 2000 | 0 Comments
        </div>
      </div>
    </section>
  </main>
)

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (post) => dispatch(addPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
