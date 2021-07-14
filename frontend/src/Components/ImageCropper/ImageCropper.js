import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Coucou from '../../assets/coucou.jpeg';
import './ImageCropper.scss';
import { generateDownload } from './cropImage';

export default function Crop() {
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ croppedArea, setCroppedArea ] = useState(null);
    const [ image, setImage ] = useState(null);
    const [ imageData, setImageData ] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
        setCroppedArea(croppedAreaPixels)
    }, [])

    const onSelectedFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files[0]);
            setImageData({ type: e.target.files[0].type, name: e.target.files[0].name })
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            })
        }
    }

    const onDownload = () => {
        generateDownload(image, croppedArea, imageData);
    }
    return (
        <>
            
        <div className="test-crop">
        {image ?   
        <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            // cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
        />
        :
        null}
        </div>
        <input
            type="file"
            onChange={onSelectedFile}
        />
        <button onClick={onDownload}>Download !!</button>
        </>
    )
}
