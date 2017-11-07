import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Library from 'material-ui-icons/LocalLibrary'

class TopNav extends Component {
  render() {
    return (
      <header>
        <section>
          <Library className="library-icon" color="#455A64" /> Readables
        </section>
        <ul>
          <li><Link to="/">View Posts</Link></li>
          <li><Link to="/add">Add Post</Link></li>
        </ul>
      </header>
    )
  }
}

export default TopNav
