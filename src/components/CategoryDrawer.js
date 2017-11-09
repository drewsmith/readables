import React, { Component } from 'react'
import Cancel from 'material-ui-icons/Cancel'
import { connect } from 'react-redux'
import '../css/CategoryDrawer.css'

class CategoryDrawer extends Component {

  handleAllClick = () => {
    let { toggleDrawer, loadAllPosts } = this.props
    loadAllPosts()
    toggleDrawer()
  }

  handleCategoryClick(categoryName) {
    let { toggleDrawer, loadPostsByCategory } = this.props
    loadPostsByCategory(categoryName)
    toggleDrawer()
  }

  render() {
    let { categories, toggleDrawer } = this.props
    return (
      <div className="category-drawer">
        <Cancel className="close-icon" onClick={toggleDrawer} color="#9E9E9E" />
        <ul>
          <li>Categories</li>
          {categories.loading && (
            <li>Loading...</li>
          )}
          <li onClick={this.handleAllClick}>All</li>
          {categories.items && categories.items.map(category => (
            <li key={category.name} onClick={() => this.handleCategoryClick(category.name)}>{category.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(
  mapStateToProps
)(CategoryDrawer)
