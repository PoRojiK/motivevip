import React from 'react';
import MotivelogoText from '../assets/icons/MotiveLogoTextOutline.svg';
import { Link } from 'react-router-dom';



export function Navigation() {
  
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <img
              src={MotivelogoText}
              alt="Главная"
              className="w-48 h-full block"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-pink-600">Наши курсы</Link>
            <Link to="/admin" className="text-gray-700 hover:text-pink-600">admin</Link>
            <Link to="/#about-motive" className="text-gray-700 hover:text-pink-600">О нас</Link>
            <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition">
              Связь с нами
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}