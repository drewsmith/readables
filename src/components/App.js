import React from 'react';
import '../css/App.css';

import Posts from './Posts'
import AddPost from './AddPost'
import TopNav from './TopNav'

import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <TopNav />
      <Route exact path="/" component={Posts} />
      <Route exact path="/add" component={AddPost} />
    </div>
  </BrowserRouter>
)

export default App;
