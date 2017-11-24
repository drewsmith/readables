import React, { Component } from 'react'
import CategoryDrawer from './CategoryDrawer'
import Post from './Post'

import { connect } from 'react-redux'

import * as postActions from '../actions/posts'
import * as categoryActions from '../actions/categories'
import { bindActionCreators } from 'redux'

const ItemList = ({items, comments, onDeletePost}) => (
  <div>
    {items.length === 0
      ? <div className="no-data-found">No Posts Found</div>
      : items.map(post => (
        <Post
          key={post.id}
          post={post}
          comments={comments[post.id]}
          onDeletePost={onDeletePost}
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

  getPosts = () => this.props.category
    ? this.props.fetchPostsByCategory(this.props.category)
    : this.props.fetchPosts()

  componentDidMount() {
    let { fetchCategories } = this.props
    fetchCategories()
    this.getPosts()
  }

  handleSortChange = e => this.props.sortPostsBy(e.target.value)

  render() {
    let { items, comments, deletePost, fetchPostsByCategory, fetchPosts } = this.props
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
          : (
            <ItemList
              items={items}
              comments={comments}
              onDeletePost={deletePost}
            />
          )
        }

        {showCategories && (
          <CategoryDrawer
            toggleDrawer={this.toggleCategories}
            loadPostsByCategory={fetchPostsByCategory}
            loadAllPosts={fetchPosts}
          />
        )}
      </main>
    )
  }
}

export default connect(
  (state) => ({
    items: state.posts.items,
    comments: state.posts.comments,
    posts: state.posts
  }),
  (dispatch) => bindActionCreators(
    {...postActions, ...categoryActions},
    dispatch
  )
)(PostList)
