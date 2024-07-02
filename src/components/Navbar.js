// Navbar.js
import React, { Component } from 'react';
import '../App.css';

class Navbar extends Component {
    render() {
        const { activeSection, setActiveSection } = this.props;

        return (
            <div className="navbar">
                <ul>
                    <li>
                        <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setActiveSection('home')}>
                            <i className="fas fa-home"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#search" className={activeSection === 'search' ? 'active' : ''} onClick={() => setActiveSection('search')}>
                            <i className="fas fa-search"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#movies" className={activeSection === 'movies' ? 'active' : ''} onClick={() => setActiveSection('movies')}>
                            <i className="fas fa-play-circle"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#tv-shows" className={activeSection === 'tv-shows' ? 'active' : ''} onClick={() => setActiveSection('tv-shows')}>
                            <i className="fas fa-tv"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setActiveSection('about')}>
                            <i className="fas fa-info-circle"></i>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navbar;
