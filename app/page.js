"use client"
import { useEffect, useRef, useState } from "react"
import { resizeEvent, scrollTrigger, scrollEvent } from '@/functions/vawzen/functions'

import About from "./landing_page/2_about/about"
import Collection from "./landing_page/3_collection/collection"
import { animations } from "@/functions/landing_functions/landing_functions"
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const wrapper = [useRef(null), useRef(null)]

  const about = useRef(null);
  const collection = [useRef(null), useRef(null), useRef(null)];


  useEffect(scrollEvent(setScrollY), []);



  useEffect(resizeEvent(wrapper, animations(about, collection)), [scrollY]);


  return (
    <main ref={wrapper[0]} style={{ overflow: 'hidden' }}>
      <div ref={wrapper[1]} style={{ transition: 'transform 0.5s ease-out' }} >

        <div style={{ height: '100vw' }} />
        <About _ref={about} />
        <Collection _ref={collection} />
        <div style={{ height: '100vw' }} />
      </div>
    </main>
  )
}
