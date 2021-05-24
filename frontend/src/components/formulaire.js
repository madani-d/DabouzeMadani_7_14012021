import React, { useState, useEffect } from "react";

import axios from 'axios';

function Formulaire({ userId, token, setToken, setUserId, refresh, setRefresh }) {
    const [article, setArticle] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const handleSubmit = event => {
        event.preventDefault();
        console.log(selectedFile);

        const formData = new FormData();
        formData.append("article", article);
        formData.append("file", selectedFile);
        formData.append("userId", userId)

        axios.post('http://localhost:5000/api/article',
        formData, { headers: { "Content-Type": "image/jpeg" } })

        .then(res => {
            setRefresh(!refresh)
            console.log(res)
        })
    }

    const handleFile = e => {
        e.preventDefault();
        console.log("selected file",selectedFile);
        setPreview(URL.createObjectURL(e.target.files[0]))

        console.log(e.target.files);
        console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

    return (
        <form className="formulaireImage" onSubmit={handleSubmit}>
            <label htmlFor="article">Créer un article</label>
            <input
                type="text"
                id="article"
                value={article}
                onChange={(e) => setArticle(e.target.value)} />
            <label htmlFor="image"></label>
            <input
                type="file"
                id="image"
                name="file"
                onChange={(e) => handleFile(e)}
                />
            <img src={preview} alt="preview" className="preview"/>
            <button>Publier</button>
        </form>
    )
}

export default Formulaire;