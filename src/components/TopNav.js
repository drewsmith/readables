import React, { Component } from 'react'

class TopNav extends Component {
  render() {
    return (
      <div className="header">
        <div className="title">Readables</div>
        <ul>
          <li>View Posts</li>
          <li>Add Post</li>
        </ul>
      </div>
    )
  }
}

export default TopNav
