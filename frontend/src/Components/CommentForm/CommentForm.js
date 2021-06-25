import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './CommentForm.scss';
import { postComment } from '../../redux/articles/articleReducer';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function CommentForm({ articleId }) {
    const { register, handleSubmit, formState } = useForm();
    const [comm, setComm] = useState("");
    const dispatch = useDispatch();


    const onSubmit = (data) => {
        console.log(data.comment);
        console.log(articleId);
        dispatch(postComment(articleId, data.comment))
        // const formData = new FormData();
        // formData.append("userId", JSON.parse(localStorage.storageToken).userId);
        // formData.append("articleId", props.articleId);
        // formData.append("comment", comm);
        // console.log(comm);
        // setComm("");
    }

    return (
        <>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="comment-form"
            >
                <input
                    {...register('comment', {required: true})}
                    value={comm}
                    onChange={(e) => setComm(e.target.value)}
                    type="text"
                    aria-label="ajouter un commentaire"
                    placeholder="Ajouter un commentaire"
                    className="comment-form-input" />
                <button className="comment-form-button">
                    <FontAwesomeIcon 
                        icon={faPaperPlane}
                    />
                </button>
            </form>
        </>
    )
}
