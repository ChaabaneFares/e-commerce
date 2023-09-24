import { useCallback } from 'react';
import { scrollTrigger } from '../vawzen/functions';

export function animations(about, collection) {
  if (!window.innerWidth) return
  const about_animation = innerWidth > 600 ? useCallback(
    scrollTrigger(about, (v) => {
      about.current.style.transform = `translateY(${v[0]}vw)`;
    }, [[0, 5]], 0, 0.5),
    [about]
  ) : null

  const collection_animation = collection.map((e, i) => {
    const condition = innerWidth > 1024
    const values = condition ? [[100, 0], [47.5, 0]] : [[125, 0], [-125, 0]]
    return useCallback(
      scrollTrigger(e, (v) => {
        if (condition) {
          const values = i % 2 === 0 ? v : [100 - v[0], 47.5 - v[1]];
          e.current.style.left = `calc(${values[0]}% - ${values[1]}%)`;
        } else {
          e.current.style.left = `${i % 2 === 0 ? v[0] : v[1]}%`;
        }
      }, values, [0, 0.25], [0.5, 1], true),
      [e]
    );
  });

}
