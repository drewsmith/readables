import React, { Component } from 'react'

import CloseIcon from 'material-ui/svg-icons/content/clear'

import { white, blueGrey900, grey700, cyan900 } from 'material-ui/styles/colors'

import SelectField from 'material-ui/SelectField'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import { connect } from 'react-redux'

import { addPost, getPosts } from '../actions/posts'
import { getCategories } from '../actions/categories'

const styles = {
  dropdown: {
    fontSize: '14px',
    textTransform: 'uppercase',
    color: blueGrey900,
    margin: '0 auto',
    textAlign: 'center'
  },
  nav: {
    padding: '30px',
    fontSize: '16px',
    fontWeight: '100',
    color: grey700
  },
  drawerLink: {
    color: cyan900,
    textDecoration: 'underline',
    fontWeight: '400',
    cursor: 'pointer'
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: '4px'
  }
}

class Posts extends Component {
  state = {
    openDrawer: false
  }

  toggleDrawer = () => this.setState((state) => ({openDrawer: !state.openDrawer}))

  render() {
    let { openDrawer } = this.state
    let { posts, categories } = this.props
    return (
      <div>
        <div style={styles.nav}>
          {posts.length} posts for <span style={styles.drawerLink} onClick={this.toggleDrawer}>Category</span>
        </div>
        <Drawer
          open={openDrawer}
          openSecondary={true}>
          <MenuItem onClick={this.toggleDrawer}>
            <CloseIcon style={styles.icon} />
            Close
          </MenuItem>
          <Divider />
          {categories.map(category => (
            <MenuItem key={category}>{category}</MenuItem>
          ))}
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newPost: (post) => dispatch(addPost(post)),
    posts: () => dispatch(getPosts()),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
