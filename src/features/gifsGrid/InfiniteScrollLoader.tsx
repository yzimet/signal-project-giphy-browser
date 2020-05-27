import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { incrementPage } from './gifsSlice';

export default function InfiniteScrollLoader() {
  const dispatch = useDispatch();

  const observedRef = useCallback(
    (node: Element | null) => {
      if (node !== null) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                dispatch(incrementPage());
              }
            });
          },
          {
            root: null,
            threshold: 0.0,
          }
        );
        observer.observe(node);
      }
    },
    [dispatch]
  );

  return <h1 ref={observedRef}>Loading&hellip;</h1>;
}
