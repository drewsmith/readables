import React, { Component } from 'react'

import CategoryDrawer from './CategoryDrawer'
import Post from './Post'

import { connect } from 'react-redux'

import { fetchPosts, fetchPostsByCategory } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

import '../css/Posts.css'

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
    let { items, comments, loading, category } = this.props.posts
    let { showCategories } = this.state

    return (
      <main>
        <section className="subheader">
          {items.length} Posts for <span className="category-link" onClick={this.toggleCategories}>{category}</span>
        </section>

        {loading && <div className="loading">Loading</div>}

        {!loading && items.length === 0 ? (
          <div className="no-data-found">No Posts Found</div>
        ) : items.map(post => <Post key={post.id} post={post} comments={comments[post.id]} />)}

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
