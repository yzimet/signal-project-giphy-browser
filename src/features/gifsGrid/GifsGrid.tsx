import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGifs } from './gifsSlice';
import { RootState } from '../../app/store';
import styles from './GifsGrid.module.css';
import { Gif } from '../../api/giphyAPI';

interface IGifsGridProps {
  onGifClick: (gif: Gif) => void;
}

export default function GifsGrid(props: IGifsGridProps) {
  const { onGifClick } = props;
  const dispatch = useDispatch();
  const { gifsById, error, visibleGifs, page } = useSelector(
    (state: RootState) => state.gifs
  );
  const { query } = useSelector((state: RootState) => state.search);

  const limit = 10;
  const offset = (page - 1) * limit;
  const gifs = visibleGifs.map((id) => gifsById[id]);

  useEffect(() => {
    dispatch(fetchGifs(query, limit, offset));
  }, [query, limit, offset, page, dispatch]);

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {gifs.map((gif) => (
        <div
          key={gif.id}
          className={styles.gif}
          onClick={() => onGifClick(gif)}
        >
          <img
            src={gif.images.fixed_height.url}
            width={gif.images.fixed_height.width}
            height={gif.images.fixed_height.height}
            alt={gif.title}
            title={gif.title}
          />
        </div>
      ))}
    </div>
  );
}
