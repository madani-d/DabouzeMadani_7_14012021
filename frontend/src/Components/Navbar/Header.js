import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';
import ModalSearch from '../ModalSearch/ModalSearch';
import Logo from '../../assets/icon-left-font-monochrome-black.svg';
import WhiteLogo from '../../assets/icon-left-font-monochrome-white.svg';
import search from '../../assets/search-solid.svg';

export default function Header() {
    const { users } = useSelector(state => ({
        ...state.usersReducer
    }))
    const usersName = [...users];
    for (const userName of usersName) {
        userName.completName = userName.prenom + " " + userName.nom
    }

    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [modalSearch, setModalSearch] = useState(false);

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
        setModalSearch(!modalSearch);
        setSearchTerm("");
    }


    useEffect(() => {
        console.log(usersName);
        const result = usersName.filter(user =>
            user.completName.includes(searchTerm)
        );
        searchTerm === "" ?
            setSearchResult([])
        :
            setSearchResult(result)
    }, [searchTerm])



    return (
        <>
        { windowWidth > 1024 ?          
            <nav className="nav">
                <img src={Logo} alt="logo Groupomania" className="nav-logo"/>
                <ul className="liste">
                    <li className="items">Fil d'actualité</li>
                    <li className="items">Mon profil</li>
                </ul>
                <div className="search-container">
                    <input
                        type="text"
                        id="search-bar"
                        className="search"
                        placeholder="Rechercher"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        />
                    <ul className="search-liste">
                        {searchResult.map((item, index) => (
                            <li key={index}>
                                <Link to={{
                                    pathname: `/profile/${item.prenom}-${item.nom}`,
                                    state: {
                                        userId: item.id
                                    }
                                }}>
                                    <img src={item.avatar} alt={`avatar de ${item.completName}`} className="search-liste-avatar"/>
                                    {item.prenom} {item.nom}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        :
            <>
                <div>
                    <img src={WhiteLogo} alt="logo Groupomania" className="nav-logo-small"/>
                </div>
                <nav className="nav-small">
                    <ul className="liste liste-small">
                        <li className="items">Fil d'actualité</li>
                        <li className="items">Mon profil</li>
                        <li><img src={search} alt="search button" onClick={handleToggleSearch} className="search-icon items" /></li>
                    </ul>
                </nav>
                {modalSearch &&
                    <ModalSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchResult={searchResult}
                        handleToggleSearch={handleToggleSearch}
                    />
                }
            </>
        }
        </>
    )
}
