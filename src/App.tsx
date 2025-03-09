import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';

import { Admin } from './pages/Admin';
import VKIcon from './assets/icons/VK.svg';
import OKIcon from './assets/icons/OK.svg';
import TelegramIcon from './assets/icons/Telegram.svg';
import ViberIcon from './assets/icons/Viber.svg';
import WhatsAppIcon from './assets/icons/WhatsApp.svg';
import MapPinIcon from './assets/icons/MapPin.svg';
import PhoneIcon from './assets/icons/Phone.svg';
import EmailIcon from './assets/icons/Email.svg';


function App() {
  const socialLinks = {
    VK: 'https://vk.com/motive',
    OK: 'https://ok.ru/motive',
    Telegram: 'https://t.me/motive_vip',
    Viber: 'viber://chat?number=%2B79041403939',
    WhatsApp: 'https://api.whatsapp.com/send/?phone=%2B79041403939&text=Меня+интересует+курс+бьюти-мастера+%28сайт+MOTIVE%29&type=phone_number&app_absent=0',
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer className="bg-gray-900 text-white py-6" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
              <h4 className="text-xl font-bold mb-4">О школе мастеров MOTIVE</h4>
              <p className="text-gray-400">Transforming passion into profession since 2010</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Информация</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">О нас</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Наши курсы</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Контактная информация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контактная информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <img src={MapPinIcon} alt="Адрес" className="w-5 h-5 mr-2 mt-2" />
                  <div className="text-sm">
                    Иркутская область, г. Ангарск<br></br>
                    32-й микрорайон, дом 5, офис №402
                    <br />
                    <span className="text-xs">(вход со стороны улицы Боринского)</span>
                  </div>
                </li>
                <li className="flex items-center text-sm">
                  <img src={PhoneIcon} alt="Телефон" className="w-5 h-5 mr-2" />
                  +7 (904) 140-3939
                </li>
                <li className="flex items-center text-sm">
                  <img src={EmailIcon} alt="Email" className="w-5 h-5 mr-2" />
                  iva@motivevip.ru
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Медиа</h4>
              <div className="flex space-x-2">
                <a
                  href={socialLinks.VK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <img src={VKIcon} alt="ВКонтакте" className="w-8 h-8" />
                  <span className="absolute hidden group-hover:block bg-gray-800 text-xs text-white p-1 rounded left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                    ВКонтакте
                  </span>
                </a>

                <a
                  href={socialLinks.OK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <img src={OKIcon} alt="Одноклассники" className="w-8 h-8" />
                  <span className="absolute hidden group-hover:block bg-gray-800 text-xs text-white p-1 rounded left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                    Одноклассники
                  </span>
                </a>

                <a
                  href={socialLinks.Telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <img src={TelegramIcon} alt="Телеграм" className="w-8 h-8" />
                  <span className="absolute hidden group-hover:block bg-gray-800 text-xs text-white p-1 rounded left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                    Telegram
                  </span>
                </a>

                <a
                  href={socialLinks.Viber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <img src={ViberIcon} alt="Viber" className="w-8 h-8" />
                  <span className="absolute hidden group-hover:block bg-gray-800 text-xs text-white p-1 rounded left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                    Viber
                  </span>
                </a>

                <a
                  href={socialLinks.WhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <img src={WhatsAppIcon} alt="WhatsApp" className="w-8 h-8" />
                  <span className="absolute hidden group-hover:block bg-gray-800 text-xs text-white p-1 rounded left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400">
            <p>&copy; 2025 MOTIVE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;