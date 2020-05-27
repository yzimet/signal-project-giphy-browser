import React from 'react';
import './App.css';
import GifsGrid from './features/gifsGrid/GifsGrid';
import SearchForm from './features/searchForm/SearchForm';
import InfiniteScrollLoader from './features/gifsGrid/InfiniteScrollLoader';

function App() {
  return (
    <div className="App">
      <header className="App-header">Giphy Browser</header>
      <SearchForm />
      <GifsGrid />
      <InfiniteScrollLoader />
    </div>
  );
}

export default App;
