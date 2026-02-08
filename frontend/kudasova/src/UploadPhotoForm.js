import React, { useState, useEffect } from 'react';
import './UploadPhotoForm.css';

const UploadPhotoForm = ({ onUpload, onClose }) => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        formData.append('description', description);

        try {
            const response = await fetch('/api/images/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке изображения');
            }

            const data = await response.json();
            setSuccessMessage('Изображение успешно загружено!');
            setFile(null);
            setDescription('');
            onUpload(data); // Вызов функции для обновления списка изображений
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="upload-photo-form-overlay" onClick={onClose}>
            <div className="upload-photo-form" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={onClose}>×</button>
                    <h2 className="header-title"> Прислать фотографию </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="file" accept="image/*" onChange={handleFileChange} required />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Описание"
                            required
                        />
                    </div>
                    <button type="submit">Загрузить</button>
                </form>
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    );
};


export default UploadPhotoForm;