import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { postArticle, updateArticle } from '../../redux/articles/articleReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ArticleForm.scss'
import { faImages, faPaperPlane } from "@fortawesome/free-solid-svg-icons";


function Formulaire({ imageUrl, texteArticle, articleId, index, setOption }) {
    const [article, setArticle] = useState(texteArticle ? texteArticle : "");
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const dispatch = useDispatch()

    setOption && setOption(false)

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("article", article);
        !texteArticle && formData.append("file", selectedFile);

        if (texteArticle) { 
            dispatch(updateArticle(article, articleId, index));
        } else {
            dispatch(postArticle(formData, selectedFile.type));
        }

        setArticle("");
        setSelectedFile();
        setPreview();
    }

    const handleFile = e => {
        console.log(e);
        e.preventDefault();
        setPreview(URL.createObjectURL(e.target.files[0]))

        console.log(e.target.files);
        setSelectedFile(e.target.files[0]);
    }

    return (
        <form className="form-article" onSubmit={handleSubmit}>
            {/* <textarea 
                cols="1"
                rows="1"
                aria-label="ajouter un article"
                placeholder="Quoi de neuf ?"
                className="form-article-input"
                ></textarea> */}
            <input
                type="text"
                aria-label="ajouter un article"
                placeholder="Quoi de neuf ?"
                className="form-article-input"
                value={article}
                onChange={(e) => setArticle(e.target.value)} />
            {texteArticle ? 
                <img src={imageUrl} alt="preview" className="preview"/>
            :
                <> 
                <label 
                    htmlFor="image"
                    className="form-article-button form-article-file">
                    <FontAwesomeIcon
                        icon={faImages}
                    />
                </label>
                <input
                    type="file"
                    id="image"
                    name="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e)}
                    />
                <img src={preview} alt="preview"  className="preview"/>
                </>
            }
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

export default Formulaire;