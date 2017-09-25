import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import { blueGrey500, white } from 'material-ui/styles/colors'

const styles = {
  nav: {
    background: white
  },
  btn: {
    color: blueGrey500
  },
  title: {
    color: blueGrey500,
    textTransform: 'uppercase',
    fontWeight: '100'
  },
  buttonContainer: {
    marginTop: '6px',
    marginRight: '6px'
  }
}

const NavButtons = () => (
  <div style={styles.buttonContainer}>
    <FlatButton
      label="View Posts"
      style={styles.btn}
      backgroundColor={white}
    />
    &nbsp;&nbsp;
    <FlatButton
      label="Add Post"
      style={styles.btn}
      backgroundColor={white}
    />
  </div>
)

class TopNav extends Component {
  render() {
    return (
      <div className="header">
        <div className="title">Readables</div>
        <ul>
          <li>Views Posts</li>
          <li>Add Post</li>
        </ul>
      </div>
    )
  }
}

export default TopNav
