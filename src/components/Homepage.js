// Homepage.js
import React, { Component } from 'react';
import '../App.css';
import Navbar from './Navbar';
import Search from './Search';
import { Main } from './Main';
import Movies from './Movies';
import Tvseries from './Tvseries';
import Info from './Info';

class Homepage extends Component {
    state = {
        activeSection: 'home'
    }

    setActiveSection = (section) => {
        this.setState({ activeSection: section });
    }

    renderActiveSection = () => {
        const { activeSection } = this.state;
        switch (activeSection) {
            case 'home':
                return <Main setActiveSection={this.setActiveSection} activeSection={activeSection} />;
            case 'search':
                return <Search setActiveSection={this.setActiveSection} activeSection={activeSection} />;
            case 'movies':
                return <Movies setActiveSection={this.setActiveSection} activeSection={activeSection} />;
            case 'tv-shows':
                return <Tvseries setActiveSection={this.setActiveSection} activeSection={activeSection}/>;
            case 'about':
                return <Info setActiveSection={this.setActiveSection} activeSection={activeSection}/>;
            default:
                return <Main setActiveSection={this.setActiveSection} activeSection={activeSection} />;
        }
    }

    render() {
        return (
            <div className="main-responsive-container">
                <Navbar activeSection={this.state.activeSection} setActiveSection={this.setActiveSection} />
                <div className="main-content-wrapper">
                    {this.renderActiveSection()}
                </div>
            </div>
        );
    }
}

export default Homepage;
