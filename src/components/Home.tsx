import React from 'react'

const Home = () => {
    return (
        <div className="home-container container__overlay">

            <main className="home">
                <div className="home__showcase">
                    <div>
                        <h1 className="home__title">Musicify</h1>
                        <p className="home__p">Smoothly listen to any song you want to with
                        crispy quality and speed.</p>
                    </div>

                    <div className="home__mixer">

                    </div>
                </div>

                <div className="home-cards">

                    <div className="home__card">
                        <i className="card__icon fab fa-ethereum"></i>
                        <h2 className="card__title">Pay</h2>
                        <p className="card__desc">Send ETH to your beloved artists.</p>
                    </div>

                    <div className="home__card">
                        <i className="card__icon fas fa-star"></i>
                        <h2 className="card__title">Rate</h2>
                        <p className="card__desc">Extol perpetual masterpieces.</p>
                    </div>

                    <div className="home__card">
                        <i className="card__icon fa fa-eye"></i>
                        <h2 className="card__title">View</h2>
                        <p className="card__desc">Participate in thrilling priemeres.</p>
                    </div>

                </div>
            </main>

        </div>
    )
}

export default Home
