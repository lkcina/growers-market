import React, { useEffect, useRef } from 'react';
import './ImageInput.css';

interface Props {
    handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput: React.FC<Props> = ({ handleImagesChange }: Props): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            console.log(inputRef.current);
            inputRef.current.click();
        }
    }, [])

    return (
        <input ref={inputRef} className="uploaded-images" type="file" name="UploadedImages" multiple onChange={handleImagesChange} />
    )
}

export default ImageInput;