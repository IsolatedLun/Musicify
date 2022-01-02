import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { animateMixerBars, getUserAgent } from '../misc/utils'
import homeCards from "./json/home-cards.json";

const Home = () => {

    useEffect(() => {
        let mixerInterval = setInterval(() => {
            animateMixerBars('mixers');
            console.log('1')
        }, 1000)

        return(() => {
            clearInterval(mixerInterval);
            console.log('cleared')
        })
    }, [])

    return (
        <div className="home-container container__overlay">
            
            <main className="home" id='main-content'>
                <div className="home__showcase flex--align--between">
                    <div>
                        <h1 className="home__title">Musicify</h1>
                        <p className="home__p">Smoothly listen to any song you want to with
                        crispy quality and speed.</p>
                    </div>

                    <div className="home__mixer flex gap--1" id='mixers'>
                        <div className="mixer"></div>
                        <div className="mixer"></div>
                        <div className="mixer"></div>
                        <div className="mixer"></div>
                        <div className="mixer"></div>
                        <div className="mixer"></div>
                    </div>
                </div>

                <div className="home-cards">

                    {
                        homeCards.map(card => (
                            <Link to={card.to}>
                                <div className="home__card">
                                    <i className={`card__icon ${card.iconClass}`}></i>
                                    <h2 className="card__title">{card.title}</h2>
                                    <p className="card__desc">{card.desc}</p>
                                </div>
                            </Link>
                        ))
                    }

                </div>
            </main>

        </div>
    )
}

export default Home
