import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Schedule from './components/Schedule'
import MovieInfo from './components/MovieInfo'
import './assets/css/app.css';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/schedule' component={Schedule}/>
            <Route path='/:imdb' component={MovieInfo}/>
        </Switch>
    </BrowserRouter>
);

export default App
