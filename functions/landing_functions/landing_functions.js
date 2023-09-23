import { useCallback } from 'react';
import { scrollTrigger } from '../vawzen/functions';

export function animations(about, collection) {
  const about_animation =  useCallback(
    scrollTrigger(about, (v) => {
      about.current.style.transform = `translateY(${v[0]}vw)`;
    }, [[0, 5]], 0, 0.5),
    [about]
  ) ;

  const collection_animation = collection.map((e, i) => {
    return useCallback(
      scrollTrigger(e, (v) => {
        const value = i % 2 === 0 ? v[0] : 100 - v[0];
        e.current.style.left = `${value}%`;
        e.current.style.transform = `translatex(-${value}%)`;
        if(i=== 0){
            console.log(v[0])
        }
      }, [[100, 0]], [0, 1], 0.5),
      [e]
    );
  });

  return [about_animation, 
    // ...collection_animation
];
}
