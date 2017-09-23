import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import { blueGrey900, white, lightGreen500 } from 'material-ui/styles/colors'

const styles = {
  nav: {
    background: white,
    color: blueGrey900
  },
  btn: {
    color: blueGrey900
  },
  title: {
    color: blueGrey900,
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
      <AppBar
        title="Readables"
        titleStyle={styles.title}
        showMenuIconButton={false}
        iconElementRight={<NavButtons/>}
        style={styles.nav}
      />
    )
  }
}

export default TopNav
