"use client"
import { useLayoutEffect, useRef } from "react"
import { scrollEvent, scrollTrigger } from '@/functions/vawzen/functions'

import About from "./landing_page/2_about/about"

export default function Home() {
  const about = useRef(null);

  useLayoutEffect(
    scrollEvent([
      innerWidth > 600 ? scrollTrigger(about, (v) => {
        about.current.style.transform = `translateY(${v[0]}vw)`
        console.log('aze');
      }, [[0, 5]], 0, [0.5]) : null,

    ]), [])

  return (
    <main >
      <div style={{ height: '100vw' }} />
      <About ref={about} />
      <div style={{ height: '100vw' }} />
    </main>
  )
}
