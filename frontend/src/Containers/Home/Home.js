import React from 'react';
import {  useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../redux/articles/articleReducer';
import { getUsers } from '../../redux/usersReducer/usersReduser';
import ArticleForm from '../../Components/ArticleForm/ArticleForm';
import CardArticle from '../../Components/CardArticle/CardArticle';
import Header from '../../Components/Navbar/Header';
import {v4 as uuidv4} from 'uuid';


export default function Home() {

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))

    const { users } = useSelector(state => ({
        ...state.usersReducer
    }))
    console.log(articles);

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getArticles());
        dispatch(getUsers());
    }, [dispatch])
    
    console.log(users);
    const handleDeconnection = () => {
        localStorage.removeItem("storageToken");
        dispatch({
            type: 'DISCONNECT'
        })
        history.push('/');
    }

    return (
        <>
            <Header/>
            <div className="test-block">
            <ArticleForm/>
                {articles.map((item, index) => (
                    <CardArticle articleData={item} index={index} key={uuidv4()}/>
                ))}
            </div>

            <button onClick={handleDeconnection}>Déconnexion</button>
        </>

    )
}
