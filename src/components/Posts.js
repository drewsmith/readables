import React, { Component } from 'react'

import Vote from './Vote'
import CategoryDrawer from './CategoryDrawer'

import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

import '../css/Posts.css'

class Posts extends Component {
  state = {
    showCategories: false
  }

  toggleCategories = () => this.setState((state) => ({showCategories: !state.showCategories}))

  render() {
    let { posts } = this.props
    let { showCategories } = this.state
    return (
      <main>
        <section className="subheader">
          {posts.length} Posts for <span onClick={this.toggleCategories}>Category</span>
        </section>
        {posts && posts.map(post => (
          <section className="post-container" key={post.id}>
            <Vote total={post.votes}/>
            <div className="post-content">
              <a href="#">{post.title}</a>
              <div className="details">
                By {post.creator} on {post.createdOn} | 0 Comments
              </div>
            </div>
          </section>
        ))}
        {showCategories && (
          <CategoryDrawer toggleDrawer={this.toggleCategories} />
        )}
      </main>
    )
  }
}

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
