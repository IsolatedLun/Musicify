import React from 'react'

const Loader = ({ text='Loading' }: { text: string }) => {
    return (
        <div className='loader flex--align flex--center flex--col gap--1'>
            <div className="loader__icon"><img src="../src/images/logo_small_v2.png" /></div>
            <h1 className="loader__p">{ text }</h1>    
        </div>
    )
}

export default Loader
