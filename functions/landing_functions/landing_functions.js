import { useCallback } from 'react';
import { scrollTrigger } from '../vawzen/scroll-interaction';
import { draging, extract_num, prevTranslate, nextTranslate } from '../vawzen/drag-interaction';



export function animations(ws, about, collection, arrivals) {
  about_animation(about)
  collection_animation(collection, ws)
  arrivals_animation(arrivals, ws)
}


function about_animation(about) {
  useCallback(
    scrollTrigger(about, (v) => {
      about.current.style.transform = `translateY(${v[0]}vw)`;
    }, [[0, 5]], 0, 0.5),
    [about]
  );
}

function collection_animation(collection, ws) {
  collection.map((e, i) => {
    const condition = ws > 1024
    const values = condition ? [[100, 0]] : [[125, 0], [-125, 0]]
    useCallback(
      scrollTrigger(e.ref, (v) => {
        if (condition) {
          e.ref.current.style.transform = `translatex(${i % 2 === 0 ? v[0] : 100 - v[0]}%)`
        } else {
          e.ref.current.style.transform = `translatex(${i % 2 === 0 ? v[0] : v[1]}%)`
        }
      }, values, [0, 0.25], [0.5, 1]),
      [e]
    );
  });
}

function arrivals_animation(arrivals, ws) {

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
    }, [[start, start - (ws * 0.3)]], 0, 0),
    [arrivals]
  );
}


export function about_desc(desc) {
  return Array.isArray(desc) ? desc.map((e, i) => i % 2 !== 0 ? <strong key={i}>{e}</strong> : e) : desc
}

// export function arrivals_init(_ref) {
//   return () => {
//     const element = _ref.current
//     const childrens = element.children
//     const mid_ground = (childrens.length * childrens[0].clientWidth) / 2
//     element.style.transform = `translatex(${-mid_ground}px)`
//   }
// }

export function arrivals_hover(event) {
  if (innerWidth > 768) {
    const hover = event.type === 'mouseenter'
    event.currentTarget.children[2].style.transform = hover && !draging ? 'none' : 'translatey(150%)'
  }
}