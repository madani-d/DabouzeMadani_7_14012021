import React from 'react';

export default function Comment(props) {

    return (
        <div>
                <div
                    className="test-com">
                    <h2>
                        <img
                            className="avatar"
                            src={props.commentData.avatar}
                            alt={props.commentData.nom}
                        />
                        {props.commentData.nom} {props.commentData.prenom}
                    </h2>
                    <figure>
                        <img
                            className="comPicture"
                            src={props.commentData.image_url}
                            alt={props.commentData.texte_commentaire}/>
                        <figcaption className="test-com">
                            <h3>{props.commentData.texte_commentaire}</h3>
                        </figcaption>
                    </figure>
                    {props.commentData.updateComment && <span>Modifier</span> }
                </div>
            
        </div>
    )
}
