import React, { Component } from 'react'
import Library from 'material-ui-icons/LocalLibrary'

class TopNav extends Component {
  render() {
    return (
      <div className="header">
        <div className="title">
          <Library className="library-icon" color="#444444" /> Readables
        </div>
        <ul>
          <li>View Posts</li>
          <li>Add Post</li>
        </ul>
      </div>
    )
  }
}

export default TopNav
