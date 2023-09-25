import data from '@/data/landing/4_arrivals.json'
import Link from 'next/link';
import { handleDrag, handleDragStart, handleDragEnd } from '@/functions/vawzen/drag-interaction';
export default function arrivals() {
    // console.log((data.length * 3) /2);
    return (<>
        <section style={{ marginTop: '16vw' }}>
            <h1 style={{ textAlign: 'center', fontSize: '3vw', color: 'white', marginBottom: '7vw' }} >New Arrivals</h1>




            <div  onDrag={handleDrag} onDragStart={handleDragStart} onDragEnd={handleDragEnd} style={{
                height: '30vw', width: '100%', display: 'flex',
                transform: `translatex(calc(-18.7vw * ${12}))`
            }} >
                {[...data, ...data, ...data].map((e, i) => {

                    return <Link key={i} href='/' style={{ minWidth: '17.7vw', height: '100%', display: 'block', marginLeft: '1vw' }} >
                        <div style={{
                            width: '100%', height: '83%', backgroundColor: '#101010',
                            borderRadius: '2vw', display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <img style={{ width: '80%', height: '80%', objectFit: 'contain', objectPosition: 'center' }} src={e.img} />
                        </div>
                        <div style={{
                            height: '17%', width: '100%', display: 'flex',
                            flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3%'
                        }}>
                            <h1 style={{ color: 'white', fontWeight: '700', fontSize: '1.2vw' }}>{e.name}</h1>
                            <h3 style={{ color: '#a1a1a1', fontWeight: '700', fontSize: '1.1vw' }} >{e.price}</h3>
                        </div>
                    </Link>
                })}
            </div>
        </section>
    </>)
}
