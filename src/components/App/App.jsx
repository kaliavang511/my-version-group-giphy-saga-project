import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import GifList from '../GifList/GifList';
import Search from '../Search/Search';

function App() {
  return (
    <div>
      <h1>Giphy Search!</h1>
      
      <Router>
        {/* Route for Search Component */}
        <Route path="/" exact>
          <Search />
          <GifList />
        </Route>
        
        {/* Route for Favorites Component */}
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Router>


      
    </div>
  );
}

export default App;

