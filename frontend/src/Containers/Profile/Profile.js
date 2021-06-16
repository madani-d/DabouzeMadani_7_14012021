import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CardArticle from '../../Components/CardArticle/CardArticle';
import {v4 as uuidv4} from 'uuid';
import Header from '../../Components/Header/Header';


export default function Profile() {

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))
    const location = useLocation();
    const userProfile = location.pathname.slice(9).split("-");
    const userId = parseInt(userProfile[2]);

    // const user = useSelector(state =>
    //     state.usersReducer.filter(user => user.id === userId)
    // )

    // console.log(user);

    const { users } = useSelector(state => ({
        ...state.usersReducer
    }))

    console.log(articles);
    console.log(location.pathname);
    console.log(userId);

    return (
        <>
            <Header/>
            <div className="profil-header light-container">
                {/* <img src={} alt="" /> */}
            </div>
            <section className="thread">
                {
                    articles.map(item => (
                        (userId === item.user_id) &&
                        <CardArticle articleData={item} key={uuidv4()}/>
                    ))
                }
            </section>
        </>
    )
}
