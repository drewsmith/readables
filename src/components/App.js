import React from 'react';
import '../css/App.css';

import PostList from './PostList'
import AddPost from './AddPost'
import TopNav from './TopNav'
import PostView from './PostView'

import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <TopNav />
      <Route exact path="/" component={PostList} />
      <Route exact path="/add" component={AddPost} />
      <Route exact path="/post/:postId" component={PostView} />
    </div>
  </BrowserRouter>
)

export default App;
