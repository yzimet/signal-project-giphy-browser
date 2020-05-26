import React from 'react';
import './App.css';
import GifsGrid from './features/gifsGrid/GifsGrid';
import SearchForm from './features/searchForm/SearchForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">Giphy Browser</header>
      <SearchForm />
      <GifsGrid />
    </div>
  );
}

export default App;
