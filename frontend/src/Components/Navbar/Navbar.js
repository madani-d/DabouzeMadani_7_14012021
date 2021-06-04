import React from 'react';
import './Navbar.scss';
import Logo from '../../assets/icon-left-font-monochrome-black.svg';

export default function Navbar() {
    return (
        <nav>
            <img src={Logo} alt="logo Groupomania" />
            <ul className="liste">
                <li className="items">Fil d'actualité</li>
                <li className="items">Mon profil</li>
                <li className="items">À propos</li>
            </ul>
            <input type="text" id="search-bar" />
        </nav>
    )
}
