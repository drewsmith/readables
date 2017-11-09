import React, { Component } from 'react'

import Vote from './Vote'
import CategoryDrawer from './CategoryDrawer'

import { connect } from 'react-redux'

import { fetchPosts, fetchPostsByCategory } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

import '../css/Posts.css'

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

class Posts extends Component {
  state = {
    showCategories: false
  }

  toggleCategories = () => this.setState((state) => ({showCategories: !state.showCategories}))

  componentDidMount() {
    let { loadCategories, loadPosts } = this.props
    loadCategories()
    loadPosts()
  }

  render() {
    let { loadPostsByCategory, loadPosts } = this.props
    let { items, comments, loading } = this.props.posts
    let { showCategories } = this.state

    return (
      <main>
        <section className="subheader">
          {items.length} Posts for <span className="category-link" onClick={this.toggleCategories}>Category</span>
        </section>

        {loading && <div className="loading">Loading</div>}

        {items && items.map(post => <Post key={post.id} post={post} comments={comments.filter(comment => comment.parentId === post.id)} />)}

        {showCategories && (
          <CategoryDrawer
            toggleDrawer={this.toggleCategories}
            loadPostsByCategory={loadPostsByCategory}
            loadAllPosts={loadPosts} />
        )}
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    loadPosts: () => dispatch(fetchPosts()),
    loadPostsByCategory: (category) => dispatch(fetchPostsByCategory(category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
