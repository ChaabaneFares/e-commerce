import { useCallback } from 'react';
import { scrollTrigger } from '../vawzen/functions';




export function animations(about, collection) {


}

export function about_desc(desc) {
  return Array.isArray(desc) ? desc.map((e, i) => i % 2 !== 0 ? <strong key={i}>{e}</strong> : e) : desc
}