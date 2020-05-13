import React from 'react'
import{ Button } from 'antd'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './Layout'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/login/" exact component={Login}/>
      <Route path='/index/' component={AdminIndex}/>
    </Router>
  );
}

export default App;
