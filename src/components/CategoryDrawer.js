import React, { Component } from 'react'

import Cancel from 'material-ui-icons/Cancel'

import { connect } from 'react-redux'

import '../css/CategoryDrawer.css'

class CategoryDrawer extends Component {
  state = {}

  render() {
    let { categories, toggleDrawer } = this.props

    return (
      <div className="category-drawer">
        <Cancel className="close-icon" onClick={toggleDrawer} />
        <ul>
          <li>Categories</li>
          {categories && categories.map(category => (
            <li key={category}>{category}</li>
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
