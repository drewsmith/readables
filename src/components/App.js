import React from 'react';
import '../css/App.css';

import Posts from './Posts'
import TopNav from './TopNav'
import Home from './Home'

import { BrowserRouter, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <TopNav />
      <Route exact path="/" component={Home} />
    </div>
  </BrowserRouter>
)

export default App;
