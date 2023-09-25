"use client"
import { useEffect, useRef, useState } from "react"
import { resizeEvent, scrollTrigger, scrollEvent } from '@/functions/vawzen/scroll-interaction'

import About from "./landing_page/2_about/about"
import Collection from "./landing_page/3_collection/collection"
import collection_data from "@/data/landing/3_collection.json"
import Arrivals from './landing_page/4_arrivals/arrivals'
import { animations } from "@/functions/landing_functions/landing_functions"
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [wS, setWS] = useState(0);
  const wrapper = [useRef(null), useRef(null)]

  const about = useRef(null);
  const collection = collection_data.map((data) => ({ ...data, ref: useRef(null) }));
  const arrivals = useRef(null);


  useEffect(scrollEvent(setScrollY), []);

  useEffect(resizeEvent(setWS, wrapper, animations(wS, about, collection, arrivals)), [scrollY, wS]);


  return (
    <>
      <main ref={wrapper[0]}>
        <div ref={wrapper[1]}>

          <div style={{ height: '100vw' }} />
          <About _ref={about} />
          <Collection _ref={collection} />
          <Arrivals _ref={arrivals} />
          <div style={{ height: '100vw' }} />
        </div>
      </main>











      <style>{`
            main { overflow: hidden; background: black  }
            main div:first-child:not(div ~ div) { transition: transform 0.7s ease-out; }

            @media (max-width: 768px) { 
              main div:first-child:not(div ~ div) { transition: none; }
            }

      `}</style>
    </>
  )
}
