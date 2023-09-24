import './about.css';
import data from "@/data/landing/2_about.json"
import { about_desc } from '@/functions/landing_functions/landing_functions';



export default function about({ _ref }) {
  const { title, desc, subtitle } = data
  return (
    <section className='about'>
      <div className='wrapper'>
        <div ref={_ref}>
          <p>{subtitle}</p>
          <h1>{title}</h1>
        </div>
        <p className='desc'>
          {about_desc(desc)}
        </p>
      </div>
    </section>)
}
