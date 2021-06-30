import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../redux/articles/articleReducer';
import { getUsers } from '../../redux/usersReducer/usersReduser';
import ArticleForm from '../../Components/ArticleForm/ArticleForm';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';
import Header from '../../Components/Header/Header';
import {v4 as uuidv4} from 'uuid';
import { loadReports } from '../../redux/reportReducer/reportReducer';
import './Home.scss';


export default function Home() {

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))

    const { users } = useSelector(state => ({
        ...state.usersReducer
    }))

    const { connected } = useSelector(state => ({
        ...state.connectedReducer
    }))
    console.log(connected);
    console.log(articles);
    const dispatch = useDispatch();
    const history = useHistory();
    !connected && history.push('/');


    useEffect(() => {
        dispatch(getArticles());
        dispatch(getUsers());
        if (JSON.parse(localStorage.storageToken).userRole === 'Moderator') {
            dispatch(loadReports());
        }
    }, [dispatch])


    
    console.log(users);
    const handleDeconnection = () => {
        localStorage.removeItem("storageToken");
        dispatch({
            type: 'DISCONNECT'
        })
        history.push('/');
    }

    // const mostLiked = articles.sort((a, b) => b.articleLikes - a.articleLikes).slice(0, 5);

    return (
        <>
            <Header/>
            <section className="thread">
            <ArticleForm/>
                {articles.map((item, index) => (
                    <ArticleCard articleData={item} index={index} key={uuidv4()}/>
                ))}
            </section>

            <button onClick={handleDeconnection}>Déconnexion</button>
        </>

    )
}
