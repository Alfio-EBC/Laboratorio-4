import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Character from './components/Personajes';
import Origin from './components/Origin';
import Species from './components/Episodios';
import ConApi from './components/Axios';

import './Estilos.css';


const App = () => {
    return (
        <Router>
            <div>
                <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-light px-3 stiky">

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        
                            <li className="nav-item">
                                <Link className="nav-link" to="/character">Personajes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/species">Episodios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/origin">Otra información</Link>
                            </li>
                          
                        </ul>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Character />} />
                        <Route path="/character" element={<Character />} />
                        <Route path="/origin" element={<Origin />} />
                        <Route path="/species" element={<Species />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
