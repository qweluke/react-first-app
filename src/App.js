import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Schedule from './components/Schedule'

const App = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/schedule' component={Schedule}/>
    </Switch>
);

export default App
