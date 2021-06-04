import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


export default function Profile() {

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))

    const location = useLocation();

    console.log(articles);
    console.log(location);

    return (
        <>
            {
                articles.map(item => (
                    (location.state.userId === item.user_id) &&
                    <h2>{item.texte_article}</h2>
                ))
            }
        </>
    )
}
