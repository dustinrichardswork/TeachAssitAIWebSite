import React, { useEffect, useState } from 'react';

const ImageSelector = ({ image, setImage, uimage }) => {
    const [selectedImage, setSelectedImage] = useState(uimage);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImagePath(file)
        uimage = null
        setSelectedImage(file);
    };

    const setImagePath = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            setImage(reader.result)
        }
    }

    useEffect(() => {
        console.log('Image: ', uimage);
    }, [])

    return (
        <div className="flex items-center justify-center w-full h-40 bg-gray-200 rounded-lg overflow-hidden cursor-pointer relative">
            {(selectedImage) ? (
                <img
                    src={selectedImage?.includes ? selectedImage : URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="object-cover w-full h-full"
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 text-4xl">
                    +
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={handleImageChange}
            />
        </div>
    );
};

export default ImageSelector;
