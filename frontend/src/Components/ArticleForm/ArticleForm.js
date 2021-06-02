import React, { useState, useEffect } from "react";

import axios from 'axios';

function Formulaire() {
    const [article, setArticle] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const handleSubmit = event => {
        event.preventDefault();
        console.log(selectedFile);
        console.log(selectedFile.type);

        const formData = new FormData();
        formData.append("article", article);
        formData.append("file", selectedFile);
        formData.append("userId", JSON.parse(localStorage.storageToken).userId)

        axios.post('http://localhost:5000/api/article',
        formData,
        { headers: {
            "Content-Type": `${selectedFile.type}`,
            "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token,
        
        }})

            .then(res => {
                console.log(res);
                setArticle("");
                setSelectedFile();
                setPreview();
            })
    }

    const handleFile = e => {
        e.preventDefault();
        setPreview(URL.createObjectURL(e.target.files[0]))

        console.log(e.target.files);
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