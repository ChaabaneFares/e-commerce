import React from 'react';
import './about.css';

export default function about({ _ref }) {
  return (
    <section className='about'>
      <div className='wrapper'>
        <div ref={_ref}>
          <p>We are</p>
          <h1>vawzen</h1>
        </div>
        <p className='desc'>
          Since 1985, we've created extraordinary products. Our{' '}
          <strong>commitment is to quality</strong>, & we won't be satisfied until you
          are. Every product is <strong>crafted with love & care</strong>.
        </p>
      </div>
    </section>)
}
