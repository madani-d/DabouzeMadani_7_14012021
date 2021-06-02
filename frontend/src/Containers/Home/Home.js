import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../redux/articles/articleReducer';
import ArticleForm from '../../Components/ArticleForm/ArticleForm';
import CardArticle from '../../Components/CardArticle/CardArticle';
import {v4 as uuidv4} from 'uuid';


export default function Home() {
    const token = JSON.parse(localStorage.storageToken).token;
    const userId = JSON.parse(localStorage.storageToken).userId;

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))

    console.log(articles);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, [])

    const handleDeconnection = () => {
        localStorage.removeItem("storageToken");
    }

    return (
        <div className="test-block">
            <ArticleForm/>
            {articles.map(item => (
                <CardArticle articleData={item} key={uuidv4()}/>
                
            ))}
            <button onClick={handleDeconnection}>Déconnexion</button>
        </div>

    )
}
