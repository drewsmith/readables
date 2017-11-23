import React from 'react'
import PropTypes from 'prop-types'
import Cancel from 'material-ui-icons/Cancel'

import { connect } from 'react-redux'

import '../css/CategoryDrawer.css'

const cancelColor = '#9E9E9E'

const CategoryDrawer = ({ categories, toggleDrawer }) => (
  <div className="category-drawer">
    <Cancel
      className="close-icon"
      onClick={toggleDrawer}
      color={cancelColor}
    />
    <ul>
      <li>Categories</li>
      {categories.loading && (
        <li>Loading...</li>
      )}
      <li onClick={() => window.location = '/'}>All</li>
      {categories.items && categories.items.map(category => (
        <li key={category.name} onClick={() => window.location = `/${category.name}`}>{category.name}</li>
      ))}
    </ul>
  </div>
)

CategoryDrawer.propTypes = {
  categories: PropTypes.array.isRequired,
  toggleDrawer: PropTypes.func.isRequired
}

export default connect(
  (state) => ({categories: state.categories})
)(CategoryDrawer)
