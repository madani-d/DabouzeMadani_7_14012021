import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { updateArticle, updateArticleText } from '../../redux/articles/articleReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../ArticleForm/ArticleForm.scss'
import { faImages, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';

// import axios from 'axios';

function ArticleUpdateForm({imageUrl, texteArticle, articleId, index, setModify, modify}) {
    console.log(imageUrl);
    const { register, handleSubmit, formState } = useForm();
    const [updatePreview, setUpdatePreview] = useState();
    const dispatch = useDispatch()
    console.log(formState);

    useEffect(() => {
        setUpdatePreview(imageUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFile = e => {
        setUpdatePreview(URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = data => {
        if (data.file[0]) {
            const formData = new FormData();
            formData.append('article', data.article);
            formData.append('articleId', articleId);
            formData.append('file', data.file[0]);
            dispatch(updateArticle(formData, articleId, data.file[0].type))
        } else {
            const datas = {
                article: data.article,
                articleId
            }
            dispatch(updateArticle(datas, articleId))
        }
        setModify(!modify)
        console.log(formState);
        console.log(data);
        data.file[0] ? console.log('type') : console.log('pas type');
    }

    return (
        <form
            className="form-article"
            onSubmit={handleSubmit(onSubmit)}>
            <input
                autoFocus
                type="text"
                aria-label="ajouter un article"
                placeholder="Quoi de neuf ?"
                className="form-article-input"
                name="article"
                defaultValue={texteArticle}
                {...register('article')}
                />
            <label 
                htmlFor="update-image"
                className="form-article-button form-article-file">
                <FontAwesomeIcon
                    icon={faImages}
                />
            </label>
            <input
                type="file"
                id="update-image"
                className="image"
                name="file"
                accept="image/*"
                {...register('file')}
                onChange={e => handleFile(e)}
                />
            <img src={updatePreview} alt="preview" className="preview" />
            <button 
                className="form-article-button form-article-send">
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="article-form-send"
                    />
            </button>
        </form>
    )
}

export default ArticleUpdateForm;