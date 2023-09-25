import './arrivals.css'
import data from '@/data/landing/4_arrivals.json'
import Link from 'next/link';
import { handleDrag, handleDragStart, handleDragEnd, handleTouchMove, handleTouchStart, handleTouchEnd } from '@/functions/vawzen/drag-interaction';
import { arrivals_hover } from '@/functions/landing_functions/landing_functions';

export default function arrivals({ _ref }) {


    return (<>
        <section className='arrivals' >
            <h1 className='title'  >New Arrivals</h1>




            <div ref={_ref} className='wrapper' style={{ touchAction: 'none' }}
                onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDrag={handleDrag}
                onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove}
            >
                {[...data, ...data, ...data].map((e, i) => {

                    return <div draggable={true} key={i} className='container'  >
                        <div className='img-container' onMouseEnter={arrivals_hover} onMouseLeave={arrivals_hover} >
                            <img draggable={false} src={e.img} />
                            <img className='img:nth-child(2)' src='/landing/arrivals/fav.svg' />
                            <div className='btn-container'>
                                <button>
                                    Add to card
                                </button>
                            </div>
                        </div>
                        <div className='infos' >
                            <h1>{e.name}</h1>
                            <h3 >{e.price}</h3>
                        </div>
                    </div>
                })}
            </div>
        </section>
    </>)
}
