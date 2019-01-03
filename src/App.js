import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import MoviePage from './components/MoviePage'
import TvPage from "./components/TvPage";
import TvSeasonEpisodesPage from "./components/TvSeasonEpisodesPage";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/movie/:id' component={MoviePage}/>
            <Route exact path='/tv/:id' component={TvPage}/>
            <Route exact path='/tv/:id/season/:seasonNum/episodes' component={TvSeasonEpisodesPage}/>
        </Switch>
    </BrowserRouter>
);

export default App
