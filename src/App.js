// import logo from './logo.svg';
import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import Watchlist from './components/Watchlist';

import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

import { useState, useEffect } from 'react';

function App() {

  // creating a state for the movies (lifting the movie state -> from MoviesGrid to App component)
  const [movies, setMovies] = useState([]);

  // creating a state for the watchlisted movies
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {

    fetch("movies.json")   // Async Operation
        .then(response => response.json())
        .then(data => setMovies(data));

    }, []);

  // creating a toggle
  const toggleWatchlist = (movieId) => {
    setWatchlist(prev => 
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );

    // Here, "prev" is refering to the previous state 
    // that we had!
  };


  return (
    <div className="App">

      <div className='container'>
        {/* Setting up the Header */}
        <Header></Header>
        {/* this tells React that we want to render
            the Header Component here. */}

        {/* Setting up the Router */}
        <Router>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/watchlist'>Watchlist</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path='/' element={<MoviesGrid movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />}></Route>
            <Route path='/watchlist' element={<Watchlist movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />}></Route>
          </Routes>
        </Router>
      </div>
      
      {/* Setting up the Footer */}
      <Footer></Footer>
      {/* since the footer should take the full width,
      so we don't add it inside the container. */}

    </div>
  );
}

export default App;