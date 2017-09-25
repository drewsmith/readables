import React from 'react'
import Vote from './Vote'
const Home = () => (
  <div>
    <div className="subheader">
      0 Posts for Category
    </div>
    <div className="post-container">
      <Vote/>
      <div className="post-content">
      Content
      </div>
    </div>
    <div className="post-container">
      <Vote/>
      <div className="post-content">
      Content
      </div>
    </div>

  </div>
)

export default Home
