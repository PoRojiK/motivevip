import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut  } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Clock, Users, CalendarDays, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const Admin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [duration, setDuration] = useState<string>('');
    const [price, setPrice] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [seats, setSeats] = useState<number | null>(null);
    const [textAlignment, setTextAlignment] = useState<string>('left');
    const [buttonLink, setButtonLink] = useState<string>('#');

    const [colorPreset, setColorPreset] = useState<string>('default');
    
    // Определение цветовых пресетов
    const colorPresets = [
        {
            id: 'default',
            name: 'motive',
            background: 'bg-motive-purple',
            headerText: 'text-white',
            bodyText: 'text-gray-100',
            secondaryText: 'text-gray-300',
            priceText: 'text-white',
            iconColor: 'text-gray-300',
            button: 'bg-motive-pink hover:bg-pink-700',
            dividers: 'border-gray-500',
            card: 'border-gray-200'
        },
        {
            id: 'base',
            name: 'Стандарт',
            background: 'bg-white',
            headerText: 'text-gray-800',
            bodyText: 'text-gray-700',
            secondaryText: 'text-gray-600',
            priceText: 'text-green-600',
            iconColor: 'text-gray-800',
            button: 'bg-indigo-600 hover:bg-indigo-700',
            dividers: 'border-gray-100',
            card: 'border-gray-200'
        },
        {
            id: 'dark',
            name: 'Тёмный',
            background: 'bg-gray-900',
            headerText: 'text-white',
            bodyText: 'text-gray-300',
            secondaryText: 'text-gray-400',
            priceText: 'text-emerald-400',
            iconColor: 'text-emerald-400',
            button: 'bg-emerald-600 hover:bg-emerald-700',
            dividers: 'border-gray-700',
            card: 'border-gray-700'
        },
        {
            id: 'warm',
            name: 'Тёплый',
            background: 'bg-amber-50',
            headerText: 'text-amber-900',
            bodyText: 'text-amber-800',
            secondaryText: 'text-amber-700',
            priceText: 'text-red-600',
            iconColor: 'text-amber-800',
            button: 'bg-amber-600 hover:bg-amber-700',
            dividers: 'border-amber-100',
            card: 'border-amber-200'
        }
    ];
    
    // Получаем выбранный пресет
    const getSelectedPreset = () => {
        return colorPresets.find(preset => preset.id === colorPreset) || colorPresets[0];
    };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
              setIsLoggedIn(!!user);
          });
          return () => unsubscribe();
      }, [navigate]);

      useEffect(() => {
          if (isLoggedIn) {
              navigate('/admin');
          }
      }, [isLoggedIn, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            setError(null);
        } catch (err: any) {
            if (err instanceof FirebaseError && (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')) {
                setError('Неправильный логин или пароль');
            } else {
                setError('Неверные данные входа');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    // Добавляем colorPreset в объект курса при сохранении
    const handleAddCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'courses'), {
                title,
                description,
                photo: photo,
                startDate: startDate ? startDate.toISOString() : null,
                duration,
                price: price || 0,
                seats: seats || 0,
                textAlignment,
                colorPreset, // Сохраняем выбранный пресет
                createdAt: serverTimestamp(),
            });

            setTitle('');
            setDescription('');
            setPhoto('');
            setStartDate(null);
            setDuration('');
            setPrice(null);
            setSeats(null);
            setSelectedFile(null);
            setTextAlignment('left');
            setColorPreset('default');
            setError(null);
            alert('Курс успешно добавлен!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    // Модули форматирования для ReactQuill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            ['clean']
        ],
    };
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin');
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Function to get alignment class
    const getAlignmentClass = (alignment: string) => {
        switch (alignment) {
            case 'center': return 'text-center';
            case 'right': return 'text-right';
            default: return 'text-left';
        }
    };


    // Добавляем CSS стили для правильного отображения форматирования
    useEffect(() => {
        const selectedPreset = getSelectedPreset();
        
        const style = document.createElement('style');
        style.textContent = `
            .preview-content h1 {
                font-size: 2em;
                font-weight: bold;
                margin-top: 0.67em;
                margin-bottom: 0.67em;
            }
            .preview-content h2 {
                font-size: 1.5em;
                font-weight: bold;
                margin-top: 0.83em;
                margin-bottom: 0.83em;
            }
            .preview-content h3 {
                font-size: 1.17em;
                font-weight: bold;
                margin-top: 1em;
                margin-bottom: 1em;
            }
            .preview-content h4 {
                font-size: 1em;
                font-weight: bold;
                margin-top: 1.33em;
                margin-bottom: 1.33em;
            }
            .preview-content strong, .preview-content b {
                font-weight: bold;
            }
            .preview-content ul {
                display: block;
                list-style-type: disc;
                margin-top: 1em;
                margin-bottom: 1em;
                padding-left: 2em;
            }
            .preview-content ol {
                display: block;
                list-style-type: decimal;
                margin-top: 1em;
                margin-bottom: 1em;
                padding-left: 2em;
            }
            .preview-content li {
                display: list-item;
                margin-bottom: 0.5em;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col h-screen bg-gradient-to-r from-blue-100 to-indigo-100 justify-center items-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
                    <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Вход в панель администратора</h2>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                                Пароль
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all ${
                                loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                        >
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                                <p>{error}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    }

    return (
            <div className="p-4 bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen pt-40">
                <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-40 pt-20 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end max-w-7xl mx-auto ">
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Выйти из аккаунта
                        </button>
                    </div>
                </header>
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-indigo-700 border-b pb-3">Добавление нового курса</h2>
                <form onSubmit={handleAddCourse} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Название курса</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                            placeholder="Введите название курса"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Описание курса</label>
                        <div className="flex flex-col flex-grow">
                            <ReactQuill
                                value={description}
                                onChange={setDescription}
                                modules={modules}
                                className="border rounded-md overflow-y-auto resize-y h-80 -mt-px min-h-80"
                                placeholder="Введите подробное описание курса..."
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Выравнивание текста</label>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setTextAlignment('left')}
                                className={`p-2 rounded ${textAlignment === 'left' ? 'bg-indigo-100 border border-indigo-300' : 'bg-gray-50 border border-gray-200'}`}
                                title="По левому краю"
                            >
                                <AlignLeft className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setTextAlignment('center')}
                                className={`p-2 rounded ${textAlignment === 'center' ? 'bg-indigo-100 border border-indigo-300' : 'bg-gray-50 border border-gray-200'}`}
                                title="По центру"
                            >
                                <AlignCenter className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setTextAlignment('right')}
                                className={`p-2 rounded ${textAlignment === 'right' ? 'bg-indigo-100 border border-indigo-300' : 'bg-gray-50 border border-gray-200'}`}
                                title="По правому краю"
                            >
                                <AlignRight className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Фон карточки</label>
                        <div className="grid grid-cols-4 gap-3">
                            {colorPresets.map((preset) => (
                                <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => setColorPreset(preset.id)}
                                    className={`p-3 rounded-md flex flex-row items-center justify-center ${preset.background} ${preset.headerText} border
                                        ${colorPreset === preset.id ? 'ring-2 ring-indigo-500 border-indigo-400' : 'border-gray-200'}`}
                                >
                                    <span className="font-medium">{preset.name}</span>
                                    <div className="flex space-x-1 mt-1 ml-1">
                                        <div className={`w-4 h-4 rounded-full ${preset.button}`}></div>

                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>



                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Изображение курса</label>
                        <div 
                            className="border-2 border-dashed border-gray-300 p-6 rounded-md w-full cursor-pointer hover:border-indigo-500 transition-all flex items-center justify-center" 
                            onClick={handleFileInputClick}
                        >
                            {selectedFile ? (
                                <div className="flex items-center">
                                    <span className="text-indigo-600 mr-2">✓</span>
                                    <span className="text-gray-700">{selectedFile.name}</span>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-500">Нажмите, чтобы выбрать файл</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF до 5MB</p>
                                </div>
                            )}
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            onChange={handleFileChange} 
                            accept="image/*" 
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Дата начала</label>
                            <DatePicker 
                                selected={startDate} 
                                onChange={handleStartDateChange} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                                placeholderText="Выберите дату"
                                dateFormat="dd.MM.yyyy"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Продолжительность</label>
                            <input 
                                type="text" 
                                value={duration} 
                                onChange={(e) => setDuration(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                                placeholder="Например: 8 недель"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Количество мест</label>
                            <input 
                                type="number" 
                                value={seats || ''} 
                                onChange={(e) => setSeats(Number(e.target.value) || null)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                                placeholder="10"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Цена (₽)</label>
                            <input 
                                type="number" 
                                value={price || ''} 
                                onChange={(e) => setPrice(Number(e.target.value) || null)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                                placeholder="0"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Ссылка кнопки</label>
                            <input
                                type="text"
                                value={buttonLink}
                                onChange={(e) => setButtonLink(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="Введите ссылку"
                            />
                        </div>

                    </div>
                    <button 
                        type="submit" 
                        className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`} 
                        disabled={loading}
                    >
                        {loading ? 'Добавление...' : 'Добавить курс'}
                    </button>
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                            <p>{error}</p>
                        </div>
                    )}
                </form>
                
                <div className="mt-10 border border-gray-200 p-6 rounded-lg shadow-md bg-gray-50">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2">Предпросмотр курса</h3>
                    
                    {/* Карточка курса с применением выбранного пресета и выравнивания */}
                    {(() => {
                        const preset = getSelectedPreset();
                        
                        return (
                            <div className={`rounded-lg shadow-md overflow-hidden border ${preset.card} max-w-md mx-auto ${preset.background}`}>
                                {/* Фото курса */}
                                {photo && (
                                    <div className="w-full h-48 overflow-hidden">
                                        <img 
                                            src={photo} 
                                            alt="Превью курса" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                
                                {/* Заголовок и детали с применением выбранных цветов и выравнивания */}
                                <div className={`p-4 ${getAlignmentClass(textAlignment)}`}>
                                    <div className="mb-2 p-2">
                                        {title && <h4 className={`text-3xl font-bold uppercase ${preset.headerText}`}>{title}</h4>}
                                        <span className={`text-base ${preset.secondaryText} ${textAlignment === 'center' ? 'justify-center' : textAlignment === 'right' ? 'justify-end' : ''}`}>В программу входит:</span>
                                    </div>
                                    
                                    {/* Иконки */}
                                    <div className={`flex flex-wrap text-sm mb-4 px-2 ${preset.secondaryText} ${textAlignment === 'center' ? 'justify-center' : textAlignment === 'right' ? 'justify-end' : ''}`}>
                                        {startDate && (
                                            <div className="mr-4 mb-1 flex items-center">
                                                <CalendarDays className={`w-4 h-4 mr-1.5 ${preset.iconColor}`} />
                                                <span className="text-base">{startDate.toLocaleDateString('ru-RU')}</span>
                                            </div>
                                        )}
                                        
                                        {duration && (
                                            <div className="mr-4 mb-1 flex items-center">
                                                <Clock className={`w-4 h-4 mr-1.5 ${preset.iconColor}`} />
                                                <span className="text-base">{duration}</span>
                                            </div>
                                        )}
                                        
                                        {seats !== null && (
                                            <div className="mr-4 mb-1 flex items-center">
                                                <Users className={`w-4 h-4 mr-1.5 ${preset.iconColor}`} />
                                                <span className="text-base">{seats}+ человек</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Описание с настроенным выравниванием и цветом */}
                                    {description && (
                                        <div className={`mb-6 ${preset.bodyText} border-t border-b ${preset.dividers} py-4`}>
                                            <div 
                                                className={`preview-content ${getAlignmentClass(textAlignment)}`}
                                                dangerouslySetInnerHTML={{ __html: description }} 
                                            />
                                        </div>
                                    )}
                                    
                                    {/* Цена и текст */}
                                    <div className="mb-6">
                                        {price !== null && (
                                            <div className={`text-2xl font-bold ${preset.priceText} mb-2`}>
                                                от {price.toLocaleString('ru-RU')} ₽
                                            </div>
                                        )}
                                        <p className={`${preset.secondaryText} text-sm`}>
                                            Количество мест ограничено! Для получения дополнительной информации и регистрации свяжитесь с нами.
                                        </p>
                                    </div>
                                    
                                    {/* Кнопка связи */}
                                    <button className={`w-full ${preset.button} text-white font-bold py-3 px-4 rounded-md transition-all`}>
                                        <a href={buttonLink} className="text-white">Связаться с нами</a>
                                    </button>
                                </div>
                            </div>
                        );
                    })()}
                </div>
                
            </div>
        </div>
    );
};