import './collection.css'

export default function collection({ _ref }) {
    return (
        <>
            <section className='collection' >
                {_ref.map((e, i) => {
                    return <div key={i} className='wrapper' >
                        <div className='left-container' >
                            <div className='content-wrapper' >
                                <h1>
                                    {e.title}
                                </h1>
                                <h1>
                                    Collection
                                </h1>
                            </div>
                        </div>
                        <div className='right-container' >
                            <div className='content-wrapper' >
                                <div className='arrow-container' >
                                    <h1> Chair</h1>
                                    <img src="/landing/collection/arrow.svg" className='arrow' />
                                </div>
                                <h1> Collection</h1>
                            </div>
                        </div>

                        <img className='img' ref={_ref[i].ref} src={e.img} />
                        <button>
                            <h4>
                            {e.title} Collection
                            </h4>
                            <img src="/landing/collection/arrow-mb.svg" className='arrow' />

                        </button>
                    </div>
                })}
            </section>








            <style>{`
            .collection { height: calc(22.1vw * ${_ref.length});  }
            .collection .wrapper { height: calc(100% / ${_ref.length});  }

            
            @media (max-width: 1024px) { 
                .collection { height: calc(63vw * ${_ref.length});  }
            }
            @media (max-width: 768px) { 
                .collection { height: calc(120vw * ${_ref.length});  }
            }
        `}</style>
        </>
    )
}
