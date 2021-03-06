import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Register, ComicDetail, Comics, Profile, CharacterDetail, Characters, Favorite } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/comic/:id" component={ ComicDetail } />
        <Route exact path="/comics" component={ Comics } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/characters" component={ Characters } />
        <Route exact path="/character/:id" component={ CharacterDetail } />
        <Route exact path="/favorite" component={ Favorite } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
