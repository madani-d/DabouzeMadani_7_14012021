import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { postArticle } from '../../redux/articles/articleReducer';
import './ArticleForm.scss';


function Formulaire() {
    const { register, handleSubmit } = useForm();
    const [preview, setPreview] = useState();
    const dispatch = useDispatch();

    const onSubmit = (data, e) => {
        console.log(data.file[0])
        const formData = new FormData();
        formData.append("article", data.article);
        formData.append("file", data.file[0]);
        console.log(formData);
        // console.log(data.file[0].type);
        dispatch(postArticle(formData, data.file[0].type));
        e.target.reset();
        setPreview();
    }

    const handleFile = e => {
        console.log(URL.createObjectURL(e.target.files[0]));
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleResize = e => {
        e.target.style.height = e.target.scrollHeight + "px"
    }

    return (
        <form
            className="form-article"
            onSubmit={handleSubmit(onSubmit)}>
            <textarea
                onInput={e => handleResize(e)}
                // 'this.style.height = "";this.style.height = this.scrollHeight + "px"'
                // type="text"
                aria-label="ajouter un article"
                placeholder="Quoi de neuf ?"
                className="form-article-input"
                {...register('article', {required: true})} />
            <label 
                htmlFor="image"
                className="form-article-button form-article-file">
                <FontAwesomeIcon
                    icon={faImages}/>
            </label>
            <input
                type="file"
                id="image"
                className="image"
                name="file"
                accept="image/*"
                {...register('file', {required: true})}
                onChange={(e) => handleFile(e)}/>
            {preview && <img src={preview} alt="preview"  className="preview"/>}
            <button 
                className="form-article-button form-article-send">
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="article-form-send"/>
            </button>
        </form>
    )
}

export default Formulaire;