import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
    const [images, setImages] = useState([
        { id: 1, title: 'Main Photo', image: '/images/main_photo.jpg', category: 'main' },
        { id: 2, title: 'Family Photo', image: '/images/family_photo.jpg', category: 'family' },
    ]);

    const [blockOrder, setBlockOrder] = useState(['family', 'main', 'science']);

    return (
        <Router>
            <div>
                <header>
                    <nav>
                        {/* Кнопка возврата на главную страницу */}
                        <Link to="/"><button>Главная страница</button></Link>

                        {/* Остальные кнопки навигации */}
                        <Link to="/photo"><button>Фото</button></Link>
                        <Link to="/video"><button>Видео</button></Link>
                        <Link to="/memories"><button>Воспоминания</button></Link>
                        <Link to="/guestbook"><button>Гостевая книга</button></Link>
                    </nav>
                </header>
                <main className="main-background">
                    <Routes>
                        <Route path="/photo" element={<PhotoPage images={images} />} />
                        <Route path="/video" element={<VideoPage />} />
                        <Route path="/memories" element={<MemoriesPage />} />
                        <Route path="/guestbook" element={<GuestbookForm />} />
                        <Route path="/" element={
                            <>
                                {blockOrder.map(block => {
                                    if (block === 'main') return <MainText key="main" />;
                                    if (block === 'family') return <FamilyText key="family" images={images.filter(image => image.category === 'family')} />;
                                    if (block === 'science') return <ScienceText key="science" />;
                                    return null;
                                })}
                            </>
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

const MainText = () => (
    <div className="main-text-block">
        <h1>Кудасова Валентина Васильевна</h1>
        <img src="/images/main_photo.jpg" alt="Main Photo" className="main-photo" />
        <h3>1947 - 2012</h3>
        <p>...</p>
        <p>...</p>
        <p>...</p>
    </div>
);

const ScienceText = () => (
    <div className="science-text-block">
        <h2>Список научных трудов и книг</h2>
        <p>...</p>
        <p>...</p>
        <p>...</p>
    </div>
);

const FamilyText = ({ images }) => (
    <div className="family-text-block">
        <h2>Семья</h2>
        {images.length > 0 ? (
            images.map(image => (
                <div key={image.id}>
                    <img src={image.image} alt={image.title} />
                </div>
            ))
        ) : (
            <p>Нет доступных фотографий семьи.</p>
        )}
        <p>...</p>
        <p>...</p>
        <p>...</p>
    </div>
);

const PhotoPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('URL_ВАШЕГО_API'); // Замените на URL вашего API
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке изображений');
                }
                const data = await response.json();
                setImages(data); // Предполагается, что ваш API возвращает массив изображений
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <h2>Фото</h2>
            <div>
                {images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.description} /> // Замените на правильные поля
                ))}
            </div>
        </div>
    );
};

const VideoPage = () => (
    <div>
        <h2>Видео</h2>
        {/* Здесь можно добавить логику для отображения видео */}
    </div>
);

const MemoriesPage = () => (
    <div>
        <h2>Воспоминания</h2>
        {/* Здесь можно добавить логику для отображения воспоминаний */}
    </div>
);

const GuestbookForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        role: '',
        memory: '',
        photo: ''
    });

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
            // Здесь можно добавить логику для очистки формы или уведомления пользователя
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Имя:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </div>
            <div>
                <label>Фамилия:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>
            <div>
                <label>Роль:</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} />
            </div>
            <div>
                <label>Воспоминание:</label>
                <textarea name="memory" value={formData.memory} onChange={handleChange} required />
            </div>
            <div>
                <label>Фото:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <button type="submit">Отправить</button>
        </form>
    );
};

export default App;
