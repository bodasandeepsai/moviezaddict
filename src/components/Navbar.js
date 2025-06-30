// Navbar.js
import React, { Component } from 'react';
import '../App.css';

class Navbar extends Component {
    state = { mobileMenuOpen: false };

    toggleMobileMenu = () => {
        this.setState(prev => ({ mobileMenuOpen: !prev.mobileMenuOpen }));
    };

    render() {
        const { activeSection, setActiveSection } = this.props;
        const { mobileMenuOpen } = this.state;
        return (
            <nav className="navbar-responsive">
                <div className="navbar-logo">MovieAddicts</div>
                <div className="navbar-hamburger" onClick={this.toggleMobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
                    <li>
                        <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setActiveSection('home')}>
                            <i className="fas fa-home"></i> <span className="nav-label">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#search" className={activeSection === 'search' ? 'active' : ''} onClick={() => setActiveSection('search')}>
                            <i className="fas fa-search"></i> <span className="nav-label">Search</span>
                        </a>
                    </li>
                    <li>
                        <a href="#movies" className={activeSection === 'movies' ? 'active' : ''} onClick={() => setActiveSection('movies')}>
                            <i className="fas fa-play-circle"></i> <span className="nav-label">Movies</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tv-shows" className={activeSection === 'tv-shows' ? 'active' : ''} onClick={() => setActiveSection('tv-shows')}>
                            <i className="fas fa-tv"></i> <span className="nav-label">TV Shows</span>
                        </a>
                    </li>
                    <li>
                        <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setActiveSection('about')}>
                            <i className="fas fa-info-circle"></i> <span className="nav-label">About</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
