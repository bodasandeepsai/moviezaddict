import React, { useState } from 'react';
import '../App.css';

const MovieScreen = ({ movie, onBack }) => {
    const [currentServer, setCurrentServer] = useState(1);

    const getIframeSrc = () => {
        switch (currentServer) {
            case 1:
                return `https://vidsrc.pro/embed/movie/${movie.id}`;
            case 2:
                return `https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`;
            case 3:
                return `https://vidsrc.to/embed/movie/${movie.id}`; 
            default:
                return `https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`;
        }
    };

    return (
        <div>
            <button className='back-but' onClick={onBack}><i className="fas fa-chevron-left"></i> Back</button>

            <div className="MovieScreeningDetails">
                <div className="MovieDetailsscreeningContent">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
                    <div className='MovieScreeningOverview'>
                        <h1>{movie.title}</h1>
                        <p><strong>Runtime:</strong> {Math.floor(movie.runtime / 60)}hr {movie.runtime % 60}mins</p>
                    </div>
                </div>
            </div>
            <div className="MoviePlayer">
                <iframe
                    src={getIframeSrc()}
                    frameBorder="0"
                    allowFullScreen
                    title="Movie Player"
                ></iframe>
            </div>
            <div className="Serversbuttons">
                <button className={`serverbtn ${currentServer === 1 ? 'active' : ''}`} onClick={() => setCurrentServer(1)}>server 1</button>
                <button className={`serverbtn ${currentServer === 2 ? 'active' : ''}`} onClick={() => setCurrentServer(2)}>server 2</button>
                <button className={`serverbtn ${currentServer === 3 ? 'active' : ''}`} onClick={() => setCurrentServer(3)}>server 3</button>
            </div>
        </div>
    );
}

export default MovieScreen;
