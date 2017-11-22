import React, { Component } from 'react'
import CategoryDrawer from './CategoryDrawer'
import Post from './Post'
import { connect } from 'react-redux'

import { fetchPosts, fetchPostsByCategory, sortPostsBy } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

const ItemList = ({items, comments}) => (
  <div>
    {items.length === 0
      ? <div className="no-data-found">No Posts Found</div>
      : items.map(post => (
        <Post
          key={post.id}
          post={post}
          comments={comments[post.id]}
        />
      ))
    }
  </div>
)

class PostList extends Component {
  state = {
    showCategories: false
  }

  toggleCategories = () => this.setState((state) => ({showCategories: !state.showCategories}))

  componentDidMount() {
    let { loadCategories, loadPosts } = this.props
    loadCategories()
    loadPosts()
  }

  handleSortChange = e => this.props.sortPosts(e.target.value)

  render() {
    let { loadPostsByCategory, loadPosts, items, comments } = this.props
    let { loading, category, sortMethod } = this.props.posts
    let { showCategories } = this.state

    return (
      <main>
        <section className="subheader">
          {items.length} Posts for <span className="category-link" onClick={this.toggleCategories}>{category}</span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          Sort By:&nbsp;
          <select value={sortMethod} onChange={this.handleSortChange}>
            <option value="voteScore">Vote Score</option>
            <option value="createDate">Create Date</option>
          </select>
        </section>
        {loading
          ? <div className="loading">Loading</div>
          : <ItemList items={items} comments={comments} /> }

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
    items: state.posts.items,
    comments: state.posts.comments,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    loadPosts: () => dispatch(fetchPosts()),
    loadPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    sortPosts: (sortMethod) => dispatch(sortPostsBy(sortMethod))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
