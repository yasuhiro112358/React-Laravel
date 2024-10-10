import '../css/app.css';
import './bootstrap';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // react-router-domのインポート
import ReactDOM from 'react-dom/client';

// 各ページのコンポーネントをインポート
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
