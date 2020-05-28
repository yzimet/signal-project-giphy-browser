import React, { useState } from 'react';
import './App.css';
import GifsGrid from './features/gifsGrid/GifsGrid';
import SearchForm from './features/searchForm/SearchForm';
import InfiniteScrollLoader from './features/gifsGrid/InfiniteScrollLoader';
import Modal from './features/modal/Modal';
import { Gif } from './api/giphyAPI';

function App() {
  const [fullscreenGif, setFullscreenGif] = useState<Gif | null>(null);

  const handleOpenModal = (gif: Gif) => {
    setFullscreenGif(gif);
  };

  const handleCloseModal = () => {
    setFullscreenGif(null);
  };

  return (
    <div className="App">
      <header className="App-header">Giphy Browser</header>
      <SearchForm />
      <GifsGrid onGifClick={handleOpenModal} />
      <InfiniteScrollLoader />
      <Modal isOpen={!!fullscreenGif} onClose={handleCloseModal}>
        {fullscreenGif && (
          <>
            <p>{fullscreenGif.title}</p>
            <img
              src={fullscreenGif.images.original.url}
              alt={fullscreenGif.title}
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default App;
