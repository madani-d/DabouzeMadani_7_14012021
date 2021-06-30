import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProfilCard.scss';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../redux/usersReducer/usersReduser';

export default function ProfilCard({ user }) {
    const [updatedAvatar, setUpdatedAvatar] = useState(user.avatar);
    const [avatarChanged, setAvatarChanged] = useState(false);
    const { register, handleSubmit, formState } = useForm();
    const dispatch = useDispatch();
    const date = new Date(user.date_signin);
    const options = { year: "numeric", month: "long", day: "2-digit"};
    console.log(user.id);
    console.log(JSON.parse(localStorage.storageToken).userId);

    const handleFile = e => {
        setUpdatedAvatar(URL.createObjectURL(e.target.files[0]));
        setAvatarChanged(true);
        console.log(formState);
    }
    
    const onSubmit = data => {
        console.log(data.avatar);
        console.log(formState);
        const formData = new FormData();
        formData.append('file', data.avatar[0]);
        formData.append('userId', user.id)
        dispatch(updateAvatar(formData));
        setAvatarChanged(false)
    }

    return (
        <section className="profil-header ">
            {JSON.parse(localStorage.storageToken).userId === user.id ?
                <>
                <form
                    className="update-avatar-form"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="profil-header-avatar light-container">
                        <img src={updatedAvatar} alt="avatar" />
                    {avatarChanged && <button type="submit" className="avatar-button avatar-button-send">Envoyer</button>}
                    </div>
                    <label htmlFor="avatar" className=" light-button avatar-button">
                        <FontAwesomeIcon
                            icon={faEdit}
                            />
                        Modifier
                    </label>
                    <input 
                        className="avatar image"
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        {...register('avatar')}
                        onChange={e => handleFile(e)}
                    />
                </form>
                </>
            :
                <div className="profil-header-avatar light-container">
                    <img src={user.avatar} alt="avatar" />
                </div>
            }
            <h1>{user.completName}</h1>
            <p>Inscrit depuis le {date.toLocaleDateString("fr-FR", options)}</p>
        </section>
    )
}
