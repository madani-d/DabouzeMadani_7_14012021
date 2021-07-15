import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import './AvatarCropper.scss'
import { generateDownload } from '../ImageCropper/cropImage';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../redux/usersReducer/usersReduser';

export default function AvatarCropper({avatar, userId}) {
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ croppedArea, setCroppedArea ] = useState(null);
    const [ image, setImage ] = useState(null);
    const [ imageData, setImageData ] = useState(null);
    const [test, setTest] = useState();

    const dispatch = useDispatch();

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
        setCroppedArea(croppedAreaPixels)
    }, [])

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            console.log(avatar[0]);
            setImageData({ type: avatar[0].type, name: avatar[0].name })
            const reader = new FileReader();
            reader.readAsDataURL(avatar[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            })
        }
    }, [])

    const onSubmit = () => {
        generateDownload(image, croppedArea, imageData)
        .then(res => {
            const formData = new FormData();
            formData.append('file', res);
            formData.append('userId', userId)
            dispatch(updateAvatar(formData))
        })
    }

    console.log(test);

    return (
        <>
            <Cropper
                className="avatar-cropper"
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
            <button  onClick={onSubmit} className="avatar-button avatar-button-send">Envoyer</button>
        </>
    )
}