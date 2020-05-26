import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuery } from './searchSlice';
import { RootState } from '../../app/store';
import styles from './SearchForm.module.css';

export default function SearchForm() {
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.search);
  const [value, setValue] = useState(query);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(changeQuery(value));
      }}
    >
      <input
        className={styles.textbox}
        aria-label="Set search query"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input className={styles.button} type="submit" value="Search" />
    </form>
  );
}
