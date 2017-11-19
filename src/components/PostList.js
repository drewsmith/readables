import React, { Component } from 'react'
import CategoryDrawer from './CategoryDrawer'
import Vote from './Vote'

import { toDateString } from '../util'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchPosts, fetchPostsByCategory } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

import '../css/Posts.css'

const Post = ({post, comments = []}) => (
  <section className="post-container" key={post.id}>
    <Vote total={post.voteScore} postId={post.id}/>
    <div className="post-content">
      <Link to={`/post/${post.id}`}>{post.title}</Link>
      <div className="details">
        By {post.author} on {toDateString(post.timestamp)}&nbsp;|&nbsp;
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

const mapStateToProps = (state) => ({
    posts: state.posts
})

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
