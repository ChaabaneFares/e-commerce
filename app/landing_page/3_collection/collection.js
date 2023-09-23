import './collection.css'
import { useEffect } from 'react'

export default function collection({ _ref }) {


    return (
        <section style={{ padding: '0 16.66%', width: '100%', height: `calc(490px * ${_ref.length})` }}>
            {_ref.map((e, i) => {
                const placement = i % 2 === 0 ? 100 : 0
                return <div key={i} className='collection-container' style={{ height: `calc(100% / ${_ref.length})`, width: '100%', display: 'flex', alignItems: 'center', fontSize: '42.5px', position: 'relative' }}>
                    <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'center' }}>
                        <div style={{ marginRight: '20%' }}>
                            <h1 style={{ fontWeight: '600' }}>
                                Featured
                            </h1>
                            <h1 style={{ fontWeight: '600' }}>
                                Collection
                            </h1>
                        </div>
                    </div>
                    <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ marginLeft: '10%' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h1 style={{ fontWeight: '600' }}> Chair</h1>
                                <img src="/landing/collection/arrow.svg" style={{ marginLeft: '1.5vw', marginTop: '12.5px', animation: 'collection-arrow 1.2s ease infinite' }} />
                            </div>
                            <h1 style={{ fontWeight: '600' }}> Collection</h1>
                        </div>
                    </div>
                    <img ref={_ref[i]} src='/landing/collection/0.jpg'
                        style={{
                            position: 'absolute', height: '80%', borderRadius: '35%/50%',
                            left: placement + '%', transform: `translatex(-${placement}%)`,
                            willChange: 'left, transform', transition: '2s'
                        }} />
                </div>
            })}
        </section>
    )
}
