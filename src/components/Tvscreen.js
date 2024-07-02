import React, { useState, useEffect } from 'react';
import '../App.css';

const Tvscreen = ({ series, onBack }) => {
    const [currentServer, setCurrentServer] = useState(1);
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    useEffect(() => {
        if (series && series.id) {
            fetch(`https://api.themoviedb.org/3/tv/${series.id}?language=en-US`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.seasons) {
                        setSeasons(data.seasons);
                        const regularSeasons = data.seasons.filter(season => season.season_number > 0);
                        if (regularSeasons.length > 0) {
                            setSelectedSeason(regularSeasons[0]); // Set the first regular season as default
                        }
                    }
                })
                .catch(error => console.error('Error fetching seasons:', error));
        }
    }, [series]);

    useEffect(() => {
        if (series && selectedSeason) {
            fetch(`https://api.themoviedb.org/3/tv/${series.id}/season/${selectedSeason.season_number}?language=en-US`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
                }
            })
                .then(response => response.json())
                .then(data => {
                    const episodeList = data.episodes || [];
                    setEpisodes(episodeList);
                    if (episodeList.length > 0) {
                        setSelectedEpisode(episodeList[0]); // Set the first episode as default
                    }
                })
                .catch(error => console.error('Error fetching episodes:', error));
        }
    }, [series, selectedSeason]);

    const getIframeSrc = () => {
        if (selectedSeason && selectedEpisode) {
            const { season_number } = selectedSeason;
            const { episode_number } = selectedEpisode;
            switch (currentServer) {
                case 1:
                    return `https://vidsrc.pro/embed/tv/${series.id}/${season_number}/${episode_number}`;
                case 2:
                    return `https://vidsrc.xyz/embed/tv/${series.id}/${season_number}-${episode_number}`;
                case 3:
                    return `https://vidsrc.to/embed/tv/${series.id}/${season_number}/${episode_number}`;
                default:
                    return `https://vidsrc.pro/embed/tv/${series.id}/${season_number}/${episode_number}`;
            }
        }
        return '';
    };

    const handleSeasonSelect = (season) => {
        setSelectedSeason(season);
        setSelectedEpisode(null); // Clear selected episode when changing seasons
    };

    const handleEpisodePlay = (episode) => {
        setSelectedEpisode(episode);
    };

    const handleBackToEpisodes = () => {
        setSelectedEpisode(null);
    };

    if (!series) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button className='back-but' onClick={onBack}><i className="fas fa-chevron-left"></i> Back</button>
            <div className="TvseriesScreeningDetails">
                <div className="TvseriesDetailsscreeningContent">
                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt="Series Poster" />
                    <div className="TvseriesScreeningOverview">
                        <h1>{series.name}</h1>
                        <p><strong>seasons: </strong> {series.number_of_seasons} </p>
                    </div>
                </div>
            </div>
            <div className='Movieplayercontainer'>
                <div className="TvseriesPlayer">
                    <iframe
                        src={getIframeSrc()}
                        frameBorder="0"
                        allowFullScreen
                        title="Movie Player"
                    ></iframe>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedSeason ? `Season ${selectedSeason.season_number}` : 'Seasons'}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {seasons.map(season => (
                            <li key={season.id}><button className="dropdown-item" onClick={() => handleSeasonSelect(season)}>{season.name}</button></li>
                        ))}
                    </ul>

                    <div className='episodeDetailsContainer'>
                        {episodes.map(episode => (
                            <div className='episodeDetails' key={episode.id}>
                                <h1>{episode.name}</h1>
                                <h5>{episode.runtime} min</h5>
                                <button className='episodeplaybtn' onClick={() => handleEpisodePlay(episode)}> <i className="fas fa-play"></i> play</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="TvscreenServersbuttons">
                <button className={`serverbtn ${currentServer === 1 ? 'active' : ''}`} onClick={() => setCurrentServer(1)}>server 1</button>
                <button className={`serverbtn ${currentServer === 2 ? 'active' : ''}`} onClick={() => setCurrentServer(2)}>server 2</button>
                <button className={`serverbtn ${currentServer === 3 ? 'active' : ''}`} onClick={() => setCurrentServer(3)}>server 3</button>
            </div>
        </div>
    );
};

export default Tvscreen;
