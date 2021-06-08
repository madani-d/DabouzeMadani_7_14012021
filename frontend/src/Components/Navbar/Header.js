import React, { useState, useEffect } from 'react';
import './Header.scss';
import Logo from '../../assets/icon-left-font-monochrome-black.svg';
import WhiteLogo from '../../assets/icon-left-font-monochrome-white.svg';
import search from '../../assets/search-solid.svg';

export default function Header() {
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ toggleSearch, setToggleSearch ] = useState(true);

    useEffect(() => {
        const changeWidth = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);
        console.log(windowWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [windowWidth])

    const handleToggleSearch = () => {
        setToggleSearch(!toggleSearch);
    }



    return (
        <>
        { windowWidth > 1024 ?          
            <nav className="nav">
                <img src={Logo} alt="logo Groupomania" className="nav-logo"/>
                <ul className="liste">
                    <li className="items">Fil d'actualité</li>
                    <li className="items">Mon profil</li>
                </ul>
                <input type="text" id="search-bar" className="search" placeholder="Rechercher"/>
            </nav>
        :
            <>
                <div>
                    <img src={WhiteLogo} alt="logo Groupomania" className="nav-logo-small"/>
                </div>
                <nav className="nav-small">
                    <ul className="liste">
                        <li className="items">Fil d'actualité</li>
                        <li className="items">Mon profil</li>
                        <label htmlFor="search-bar-small" ><img src={search} alt="search button" onClick={handleToggleSearch} className="search-icon items" /></label>
                    <input type="text" id="search-bar-small" className={toggleSearch && "search-small"} placeholder="Rechercher"/>
                    </ul>
                </nav>

            </>
        }
        </>
    )
}
