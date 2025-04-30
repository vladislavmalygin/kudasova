import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './GuestbookForm.css';
import UploadPhotoForm from './UploadPhotoForm';
import Footer from './Footer';
import './MemoriesPage.css';

function App() {
    const [images, setImages] = useState([
        { id: 1, title: 'Main Photo', image: '/images/main_photo.jpg', category: 'main' },
        { id: 2, title: 'Family Photo', image: '/images/family_photo.jpg', category: 'family' },
    ]);

    const [blockOrder, setBlockOrder] = useState(['main', 'family', 'science']);

    return (
        <Router>
            <div>
                <header>
                    <nav>
                        {/* Кнопка возврата на главную страницу */}
                        <Link to="/"><button>Главная страница</button></Link>

                        {/* Остальные кнопки навигации */}
                        <Link to="/photo"><button>Фото</button></Link>

                        <Link to="/memories"><button>Воспоминания</button></Link>
                        <Link to="/poems"><button>Стихи</button></Link>
                        <Link to="/guestbook"><button>Гостевая книга</button></Link>

                    </nav>

                </header>
                <main className="main-background">
                    <Routes>
                        <Route path="/photo" element={<PhotoPage images={images} />} />
                        <Route path="/video" element={<VideoPage />} />
                        <Route path="/memories" element={<MemoriesPage />} />
                        <Route path="/guestbook" element={<GuestbookForm />} />
                        <Route path="/" element={<MainContainer blockOrder={blockOrder} images={images} />} />
                        <Route path="/poems" element={<PoemsPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

const MainContainer = ({ blockOrder, images }) => (
    <div className="main-container">
        {blockOrder.map(block => {
            if (block === 'main') return <MainText key="main" />;
            return null;
        })}
    </div>
);

const MainText = () => (
    <div className="main-text-block">
        <h1>Кудасова Валентина Васильевна</h1>
        <img src="/images/main_photo.jpg" alt="Main Photo" className="img-main" />
        <h3>1.05.1947 - 21.02.2012 </h3>
        <h4>-</h4>
        <p>Заведующая кафедрой русского языка и литературы, Владимирского Государственного Гуманитарного Университета, доцент, кандидат филологических наук.
</p>
        <h4>-</h4>
        <p>Это страница памяти Валентины Васильевны. Здесь собраны воспоминания родных, друзей и коллег, а также фотографии, и видеозаписи.</p>
        <h4>-</h4>
        <p>Любой гость может оставить свои пожелания, комментарии или воспоминания в гостевой книге, а также прислать фотографии с Валентиной Васильевной, нажав на кнопку прислать фото.
</p>
    </div>
);

const PhotoPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Состояние для выбранного изображения

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/images/');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке изображений');
                }
                const data = await response.json();
                setImages(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleUpload = (newImage) => {
        setImages((prevImages) => [...prevImages, newImage]);
        setShowUploadForm(false);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image); // Устанавливаем выбранное изображение
    };

    const closeModal = () => {
        setSelectedImage(null); // Закрываем модальное окно
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className="photo-page">
            {!showUploadForm && (
               <button className="button_add" onClick={() => setShowUploadForm(true)}>
                Добавить фотографию
               </button>
            )}
            {showUploadForm && (
                <UploadPhotoForm onUpload={handleUpload} onClose={() => setShowUploadForm(false)} />
            )}
            <div className="photo-gallery">
                {images.map((image, index) => (
                    <div className="photo-item" key={index} onClick={() => handleImageClick(image)}>
                        <img src={image.image} alt={image.description} className="photo" />
                        <p className="photo-description">{image.description}</p>
                    </div>
                ))}
            </div>

            {/* Модальное окно для отображения изображения в полном размере */}
            {selectedImage && (
                <div className="modal" onClick={closeModal}>
                    <img src={selectedImage.image} alt={selectedImage.description} />
                </div>
            )}
        </div>
    );
};


const VideoPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/videos/');
            const data = await response.json();
            setVideos(data);
        };

        fetchVideos();
    }, []);

    return (
        <div className="video-page">

            {videos.length > 0 ? (
                <div className="video-gallery">
                    {videos.map((videoUrl, index) => (
                        <div className="video-item" key={index}>
                            <video className="video" controls>
                                <source src={videoUrl} type="video/webm" />
                                Ваш браузер не поддерживает видео.
                            </video>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Загрузка видео...</p>
            )}
        </div>
    );
};


const MemoriesPage = () => {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/memories/');
                const data = await response.json();
                setMemories(data);
            } catch (error) {
                console.error('Ошибка при получении воспоминаний:', error);
            }
        };

        fetchMemories();
    }, []);

    return (
        <div>
            <div className="memories-container">
                {memories.map((memory) => (
                    <div className="memory-block" key={memory.id}>
                        <h3>{memory.title}</h3>
                        <p>{memory.memory}</p>
                        {memory.photo && <img src={memory.photo} alt={memory.title} />}
                    </div>
                ))}
            </div>
        </div>
    );
};


const GuestbookForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        memory: '',
        photo: ''
    });
    const [successMessage, setSuccessMessage] = useState(''); // Состояние для сообщения об успешной отправке

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({ ...formData, photo: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, photo: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/guestbook/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных');
            }

            const data = await response.json();
            console.log('Данные успешно отправлены:', data);
            setSuccessMessage({ text: 'Данные успешно отправлены!', type: 'success' });

            setFormData({
                title: '',
                memory: '',
                photo: ''
            });
        } catch (error) {
            console.error('Ошибка:', error);
            setSuccessMessage({ text: 'Ошибка при отправке данных. Пожалуйста, попробуйте еще раз.', type: 'error' });
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Тема:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div>
                    <label>Текст:</label>
                    <textarea name="memory" value={formData.memory} onChange={handleChange} required />
                </div>
                <div>
                    <label>Фото (опционально):</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit">Отправить</button>
            </form>

            {/* Сообщение об успехе или ошибке */}
            {successMessage && (
                <p className={successMessage.type === 'success' ? 'success-message' : 'error-message'}>
                    {successMessage.text}
                </p>
            )}
        </div>
    );
};

const PoemsPage = () => {
    const [poems, setPoems] = useState([]);

    useEffect(() => {
        const fetchPoems = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/poems/');
                const data = await response.json();
                setPoems(data);
            } catch (error) {
                console.error('Ошибка при получении воспоминаний:', error);
            }
        };

        fetchPoems();
    }, []);

    return (
        <div>
            <div className="memories-container">
                {poems.map((poem) => (
                    <div className="memory-block" key={poem.id}>
                        <h3>{poem.title}</h3>
                        <p>{poem.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
