import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGifs } from './gifsSlice';
import { RootState } from '../../app/store';
import styles from './GifsGrid.module.css';

export default function GifsGrid() {
  const dispatch = useDispatch();
  const { gifsById, isLoading, error, visibleGifs } = useSelector(
    (state: RootState) => state.gifs
  );
  const { query } = useSelector((state: RootState) => state.search);

  const limit = 10;
  const offset = 0;
  const gifs = visibleGifs.map((id) => gifsById[id]);

  useEffect(() => {
    dispatch(fetchGifs(query, limit, offset));
  }, [query, limit, offset, dispatch]);

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
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
