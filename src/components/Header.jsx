import React from 'react';
import { NavLink } from 'react-router-dom';
const Header = () => {
    return (
        <div className='header'>
            <nav>
                <ul>
                    <li><NavLink className={(nav) => (nav.isActive ? "nav-active" : "")} to="/">
                        Accueil
                    </NavLink></li>
                    <li><NavLink className={(nav) => (nav.isActive ? "nav-active" : "")} to="/coups-de-coeur">
                        Coups de coeur
                    </NavLink></li>
                </ul>
            </nav>
            <h1>React movies</h1>
        </div>
    );
};

export default Header;