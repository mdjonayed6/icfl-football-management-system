import React from 'react';
import { Link } from 'react-router-dom';

const Section1 = () => {

    return (
        <div>
            <div className="hero min-vh-100 bg-dark" style={{ backgroundImage: `url(images/bg_3.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="container d-flex flex-column justify-content-center min-vh-100">
                    <div className="row justify-content-end">
                        <div className="col-md-6 text-right">
                            <div className="py-5">
                                <h1 className="mb-4 text-black" style={{ color: 'black' }}>ICFL 2024</h1>
                                <p className="mb-4 text-black-50 text-right">The one of the biggest sports festivals take place at IUBAT is football tournaments arranged by different departments. Such occasions keep our campus vibrant and jovial. The university authority encourages and patronizes these sports events to develop social aspects and enhance social awareness among the students.</p>
                                <Link to="/login" className="btn btn-primary">Get Started</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section1;
