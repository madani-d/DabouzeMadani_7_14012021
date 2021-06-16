import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { postArticle, updateArticle } from '../../redux/articles/articleReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../ArticleForm/ArticleForm.scss'
import { faImages, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';

// import axios from 'axios';

function ArticleUpdateForm({imageUrl, texteArticle, setModify}) {
    console.log(imageUrl);
    const { register, handleSubmit, formState } = useForm();
    const [file, setFile] = useState();
    console.log(formState);

    const handleChange = e => {
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = data => {
    console.log(formState);
    console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
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
                name="file"
                {...register('file')}
                onChange={e => handleChange(e)}
                />
            <img src={file ? file : imageUrl} alt="preview" className="preview" />
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