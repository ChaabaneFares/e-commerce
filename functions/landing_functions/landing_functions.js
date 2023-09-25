import { useCallback } from 'react';
import { scrollTrigger } from '../vawzen/scroll-interaction';
import { draging, extract_num, prevTranslate, nextTranslate } from '../vawzen/drag-interaction';



export function animations(windowSize, about, collection, arrivals) {


  const about_animation = useCallback(
    scrollTrigger(about, (v) => {
      about.current.style.transform = `translateY(${v[0]}vw)`;
    }, [[0, 5]], 0, 0.5),
    [about]
  );


  const collection_animation = collection.map((e, i) => {
    const condition = windowSize > 1024
    const values = condition ? [[100, 0], [47.5, 0]] : [[125, 0], [-125, 0]]
    useCallback(
      scrollTrigger(e.ref, (v) => {
        if (condition) {
          const values = i % 2 === 0 ? v : [100 - v[0], 47.5 - v[1]];
          e.ref.current.style.left = `calc(${values[0]}% - ${values[1]}%)`;
        } else {
          e.ref.current.style.left = `${i % 2 === 0 ? v[0] : v[1]}%`;
        }
      }, values, [0, 0.25], [0.5, 1]),
      [e]
    );
  });

  arrivals_animation(arrivals, windowSize)
  return
}

export function about_desc(desc) {
  return Array.isArray(desc) ? desc.map((e, i) => i % 2 !== 0 ? <strong key={i}>{e}</strong> : e) : desc
}

export function arrivals_init(_ref) {
  return () => {
    const element = _ref.current
    const childrens = element.children
    const mid_ground = (childrens.length * childrens[0].clientWidth) / 2
    element.style.transform = `translatex(${-mid_ground}px)`
  }
}

export function arrivals_hover(event) {
  if (innerWidth > 768) {
    const hover = event.type === 'mouseenter'
    event.currentTarget.children[2].style.transform = hover && !draging ? 'none' : 'translatey(150%)'
  }
}



function arrivals_animation(arrivals, windowSize) {

  let start = extract_num(nextTranslate)
  if (start === 0 && arrivals.current) {
    const element = arrivals.current
    const childrens = element.children
    const mid_ground = (childrens.length * childrens[0].clientWidth) / 2
    start = -mid_ground
  }
  useCallback(
    scrollTrigger(arrivals, (v) => {
      if (arrivals.current.style.transition !== 'transform 0.7s ease-out 0s') {
        arrivals.current.style.transition = 'transform 0.7s ease-out'
      }
      arrivals.current.style.transform = `translateX(${v[0]}px)`
    }, [[start, start - (windowSize * 0.3)]], 0, 0),
    [arrivals]
  );
}