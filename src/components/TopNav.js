import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AddPostModal from './modal/AddPostModal'
import Library from 'material-ui-icons/LocalLibrary'

class TopNav extends Component {
  state = {
    openModal: false
  }

  toggleModal = () => this.setState((state) => ({openModal: !state.openModal}))

  render() {
    let { openModal } = this.state
    return (
      <header>
        <section>
          <Library className="library-icon" color="#455A64" /> Readables
        </section>
        <ul>
          <li><Link to="/">View All Posts</Link></li>
          <li><span onClick={this.toggleModal}>Add Post</span></li>
        </ul>
        <AddPostModal
          isOpen={openModal}
          onClose={this.toggleModal}
        />
      </header>
    )
  }
}

export default TopNav
