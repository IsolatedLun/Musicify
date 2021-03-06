import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { animateMixerBars, getUserAgent } from '../misc/utils'
import homeCards from "./json/home-cards.json";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let mixerInterval = setInterval(() => {
            animateMixerBars('mixers');
        }, 1000)

        return(() => {
            clearInterval(mixerInterval);
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
                        homeCards.map((card, idx: number) => (
                            <Link to={card.to} key={idx}>
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
