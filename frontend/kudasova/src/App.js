import React, { useState } from 'react';
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

const PhotoPage = ({ images }) => (
    <div>
        <h2>Фото</h2>
        {/* Здесь можно добавить логику для отображения фото */}
    </div>
);

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
        firstName: '',
        lastName: '',
        role: '',
        memory: '',
        photo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для отправки данных на бэкенд
        console.log(formData);
    };

return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Имя:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
                <label>Фамилия:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
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
                <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
            </div>
            <button type="submit">Отправить</button>
        </form>
    );
};

export default App;
