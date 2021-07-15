import axios from "axios";

const createImage = url => 
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.src = url;
    })
function getRadiantAngle(degreeValue) {
    return (degreeValue * Math.PI) / 100;
}

export default async function getCroppedImg(imageSrc, pixelCrop, rotation=0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadiantAngle(rotation));
    ctx.translate(-safeArea /2, -safeArea /2);

    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
        0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );

    return canvas;
}

const sendAvatar = (data) => {
    console.log(data);
    const formData = new FormData();
        formData.append('file', data);
        formData.append('userId', 105)
        axios.put(`${process.env.REACT_APP_API_URL}/api/auth/updateAvatar`,
        formData,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        } 
    )
    .then(res => {
        console.log(res);
    })
}

export const generateDownload = async (imageSrc, crop, imageData) => {
    if (!crop || ! imageSrc) {
        return;
    }
    const { type, name } = imageData
    console.log(imageData);
    const canvas = await getCroppedImg(imageSrc, crop);
    function dataURLtoFile(dataurl, filename, type) {
        var arr = dataurl.split(','),
            mime = type,
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }
    // console.log(canvas.toDataURL());
    const test = dataURLtoFile(canvas.toDataURL(), name, type);
    // sendAvatar(test);
    console.log(test);
    return test;

    // canvas.toBlob(
    //     blob => {
    //         const previewUrl = window.URL.createObjectURL(blob);

    //         const anchor = document.createElement("a");
    //         anchor.download = "image.jpeg";
    //         anchor.href = URL.createObjectURL(blob);
    //         // anchor.click(sendAvatar(anchor));
    //         window.URL.revokeObjectURL(previewUrl);
    //     },
    //     "image/jpeg",
    //     0.66
    // );
};
