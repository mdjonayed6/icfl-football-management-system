import React from 'react';

const HomeFooter = () => {
    return (
        <footer className="footer-section bg-dark text-light">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <h3>News</h3>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">All</a></li>
                            <li><a href="#" className="text-light">Club News</a></li>
                            <li><a href="#" className="text-light">Media Center</a></li>
                            <li><a href="#" className="text-light">Video</a></li>
                            <li><a href="#" className="text-light">RSS</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h3>Tickets</h3>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">Online Ticket</a></li>
                            <li><a href="#" className="text-light">Payment and Prices</a></li>
                            <li><a href="#" className="text-light">Contact &amp; Booking</a></li>
                            <li><a href="#" className="text-light">Tickets</a></li>
                            <li><a href="#" className="text-light">Coupon</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h3>Matches</h3>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">Standings</a></li>
                            <li><a href="#" className="text-light">World Cup</a></li>
                            <li><a href="#" className="text-light">La Lega</a></li>
                            <li><a href="#" className="text-light">Hyper Cup</a></li>
                            <li><a href="#" className="text-light">World League</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h3>Social</h3>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light">Twitter</a></li>
                            <li><a href="#" className="text-light">Facebook</a></li>
                            <li><a href="#" className="text-light">Instagram</a></li>
                            <li><a href="#" className="text-light">Youtube</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <p className="text-center text-muted">
                            All rights reserved Copyright &copy; 2024 || Designed & Developed by <a href="https://www.facebook.com/mjbdcom" target="_blank" className="text-light">Jonayed</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
