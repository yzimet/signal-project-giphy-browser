import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGifs } from './gifsSlice';
import { RootState } from '../../app/store';
import styles from './GifsGrid.module.css';

export default function GifsGrid() {
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
    <div>
      {gifs.map((gif) => (
        <img
          key={gif.id}
          src={gif.images.fixed_height.url}
          width={gif.images.fixed_height.width}
          height={gif.images.fixed_height.height}
          alt={gif.title}
          title={gif.title}
        />
      ))}
    </div>
  );
}
