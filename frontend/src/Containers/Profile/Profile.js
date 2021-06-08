import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CardArticle from '../../Components/CardArticle/CardArticle';
import {v4 as uuidv4} from 'uuid';


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
                    <CardArticle articleData={item} key={uuidv4()}/>
                ))
            }
        </>
    )
}
