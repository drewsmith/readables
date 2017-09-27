import React, { Component } from 'react'
import Library from 'material-ui-icons/LocalLibrary'

class TopNav extends Component {
  render() {
    return (
      <header>
        <section>
          <Library className="library-icon" color="#444444" /> Readables
        </section>
        <ul>
          <li>View Posts</li>
          <li>Add Post</li>
        </ul>
      </header>
    )
  }
}

export default TopNav
