import React, { Component } from 'react'

import CloseIcon from 'material-ui/svg-icons/content/clear'

import { white, blueGrey900, grey700, cyan900 } from 'material-ui/styles/colors'

import SelectField from 'material-ui/SelectField'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

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
    posts: [],
    openDrawer: false
  }

  toggleDrawer = () => this.setState((state) => ({openDrawer: !state.openDrawer}))

  render() {
    let { posts, openDrawer } = this.state
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
        </Drawer>
      </div>
    )
  }
}

export default Posts
