import React, { Component } from 'react'
import CategoryDrawer from './CategoryDrawer'
import Post from './Post'
import { connect } from 'react-redux'

import { fetchPosts, fetchPostsByCategory, sortPostsBy, votePost } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

const ItemList = ({items, comments, onVote}) => (
  <div>
    {items.length === 0
      ? <div className="no-data-found">No Posts Found</div>
      : items.map(post => (
        <Post
          key={post.id}
          post={post}
          comments={comments[post.id]}
          onVote={onVote} />
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
    let { loadPostsByCategory, loadPosts, votePost } = this.props
    let { items, loading, category, sortMethod } = this.props.posts
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
          : <ItemList onVote={votePost} {...this.props.posts} /> }

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

const mapStateToProps = (state) => ({
    posts: state.posts
})

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    loadPosts: () => dispatch(fetchPosts()),
    loadPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    sortPosts: (sortMethod) => dispatch(sortPostsBy(sortMethod)),
    votePost: (postId, direction) => dispatch(votePost(postId, direction))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
