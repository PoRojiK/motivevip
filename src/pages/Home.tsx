import React, { useEffect } from 'react';

import { Star, Rocket, Lightbulb, TrendingUp, Headphones, Handshake, Clock, BookOpen, GraduationCap, Phone, Users, ChevronRight, ArrowRight,ArrowLeft  } from 'lucide-react';
import { Link,useLocation  } from 'react-router-dom';
import aboutMotive from '../assets/photos/aboutMotive.png';
import post1 from '../assets/photos/our_offers/post1.jpg';
import post2 from '../assets/photos/our_offers/post2.jpg';
import post3 from '../assets/photos/our_offers/post3.jpg';
import post4 from '../assets/photos/our_offers/post4.jpg';

export function Home() {
  const location = useLocation();


    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]); // Добавляем location в зависимости, если это необходимо

  return (
    <div>
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80"
            alt="Beauty school background"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master the Art of Beauty
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Transform your passion into a successful career with our professional beauty courses
            </p>
            <Link to="/courses" className="bg-rose-600 text-white px-8 py-3 rounded-full text-lg hover:bg-rose-700 transition inline-block">
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"> {/* Добавлен отступ снизу */}
            <h2 className="text-3xl font-bold text-gray-800">Наши преимущества</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-fuchsia-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-fuchsia-800 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Скорость обучения</h3>
              <p className="text-gray-600">Наша программа обучения сочетает быстроту и эффективность без потери качества.</p>
            </div>
            <div className="text-center">
              <div className="bg-fuchsia-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-fuchsia-800 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Индивидуальные идеи</h3>
              <p className="text-gray-600">У нас есть уникальные идеи по курсам которых нет у конкурентов.</p>
            </div>
            <div className="text-center">
              <div className="bg-fuchsia-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-fuchsia-800 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">В ногу со временем</h3>
              <p className="text-gray-600">Мы всегда следим за развитием индустрии красоты и применяем новые технологии.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">
            <div className="text-center">
              <div className="bg-fuchsia-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-fuchsia-800 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">В ногу со временем</h3>
              <p className="text-gray-600">Мы всегда следим за развитием индустрии красоты и применяем новые технологии.</p>
            </div>
            <div className="text-center">
              <div className="bg-fuchsia-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-fuchsia-800 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая поддержка</h3>
              <p className="text-gray-600">Все выпускники получают от нас поддержку и консультации после прохождения курсов.</p>
            </div>
            <div className="text-center">
              <div className="bg-fuchsia-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="text-fuchsia-800 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Взаимодействие с нами</h3>
              <p className="text-gray-600">После прохождения курсов мы предлагаем возможность поработать у нас по полученной специальности.</p>
            </div>
          </div>
        </div>
      </div>

      {/* About MOTIVE Section */}
      <div id="about-motive" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
          <div className="relative">
            <div className="text-left mb-8">
              <h2 className="text-4xl font-bold text-pink-600 mb-4">О школе MOTIVE</h2>
              <p className="text-6xl font-extrabold text-gray-700 mb-6">Большой опыт, индивидуальный подход</p>
              <p className="text-gray-700 leading-7 mb-8 text-lg">
                Все наши курсы разрабатывались на основе практики по направлениям более 10-ти лет, мы постоянно совершенствуем нашу программу обучения, применяем новые идеи и технологии в действии, мы всегда берем за основу принципы обучения на практике и оказываем максимальное содействие нашим выпускникам в их начинаниях как в индустрии мастеров салонов красоты так и частной практике. Кроме этого мы проводим курсы повышения квалификации.
              </p>
              <div className="flex justify-between mb-5"> {/* Добавляем flex и justify-between */}
                <div className="mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-pink-600" />
                  <div>
                    <h3 className="text-xl font-semibold">Курсы с нуля</h3>
                    <p className="text-gray-600">Обучаем с чистого листа</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-pink-600" />
                  <div>
                    <h3 className="text-xl font-semibold">Повышение квалификации</h3>
                    <p className="text-gray-600">Повышаем навыки и умения</p>
                  </div>
                </div>
              </div>
              <button className="bg-pink-600 text-white px-8 py-4 text-lg rounded-full flex items-center hover:bg-pink-700 transition">
                <Phone className="w-6 h-6 mr-2" />
                Звоните!
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative">
                <img
                  src={aboutMotive}
                  alt="MOTIVE School"
                  className="w-full h-full object-cover rounded-3xl"
                />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800">Наши предложения</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <div className="flex flex-col md:flex-row-reverse items-center">
        <img
          src={post1}
          alt="Курсы маникюра"
          className="w-full md:w-64 h-auto rounded-lg"
        />
        <div className="md:mr-4 text-center md:text-left flex flex-col">
          <div>
            <h3 className="text-3xl font-semibold mb-2">Курсы маникюра</h3>
            <p className="text-xl text-gray-600 mb-2">Теория, Обучение, Практика</p>
          </div>
          <ArrowRight className="self-end text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        <img
          src={post3}
          alt="Творческая обстановка"
          className="w-full md:w-64 h-auto rounded-lg"
        />
        <div className="text-center md:text-left md:ml-4">
          <h3 className="text-3xl font-semibold mb-2">Творческая обстановка</h3>
          <p className="text-xl text-gray-600 mb-2">Уют, Комфорт, Атмосфера</p>
          <ArrowLeft className="mx-auto md:mx-0 transform text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center">
        <img
          src={post2}
          alt="Курсы педикюра"
          className="w-full md:w-64 h-auto rounded-lg"
        />
        <div className="md:mr-4 text-center md:text-left flex flex-col">
          <div>
            <h3 className="text-3xl font-semibold mb-2">Курсы педикюра</h3>
            <p className="text-xl text-gray-600 mb-2">Теория, Обучение, Практика</p>
          </div>
          <ArrowRight className="self-end text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        <img
          src={post4}
          alt="Хорошее настроение"
          className="w-full md:w-64 h-auto rounded-lg"
        />
        <div className="text-center md:text-left md:ml-4">
          <h3 className="text-3xl font-semibold mb-2">Хорошее настроение</h3>
          <p className="text-xl text-gray-600 mb-2">Позитив, Мотив, Успех</p>
          <ArrowLeft className="mx-auto md:mx-0 transform text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</div>



    <div className="py-12 bg-motive-purple">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-[12rem]">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-motive-pink">Наше местоположение</h2>
            </div>
            <div >
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab3b1c4f686660c22536459727dae1c60765912f752ac22685b261139fb540974&amp;source=constructor" className="w-full h-[540px]" frameBorder="0"></iframe>
            </div>
        </div>
    </div>

      {/* Featured Courses Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">Comprehensive beauty education for every aspiration</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Makeup Artistry",
                image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
                duration: "6 months",
                students: "200+"
              },
              {
                title: "Hair Styling",
                image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
                duration: "8 months",
                students: "150+"
              },
              {
                title: "Nail Technology",
                image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
                duration: "4 months",
                students: "180+"
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition transform hover:-translate-y-1">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                    <Users className="w-4 h-4 ml-4 mr-2" />
                    <span>{course.students} students</span>
                  </div>
                  <Link to={`/courses/${index + 1}`} className="flex items-center text-rose-600 font-semibold hover:text-rose-700">
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700">
              View All Courses <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}