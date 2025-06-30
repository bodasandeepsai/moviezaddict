import React, { Component } from 'react';
import Tvscreen from './Tvscreen';

class Tvseries extends Component {
    state = {
        allTrending: [],
        latestseries: [],
        popularseries: [],
        selectedseriesId: null,
        selectedseries: null,
        similarseries: [],
        cast: [],
        reviews: [],
        activeTab: 'overview',
        watchNow: false, // New state to manage the "Watch Now" view
    };

    componentDidMount() {

        // Fetch latest series
        fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ latestseries: data.results });
            })
            .catch(error => console.error('Error fetching latest series:', error));

        // Fetch popular series
        fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ popularseries: data.results });
            })
            .catch(error => console.error('Error fetching popular series:', error));
    }

    selectSeries = (seriesId) => {
        const { setActiveSection } = this.props;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setActiveSection('tv-shows');


        // Set the selected series ID
        this.setState({ selectedseriesId: seriesId, activeTab: 'overview' });

        // Fetch the selected series details
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ selectedseries: data }))
            .catch(error => console.error('Error fetching series details:', error));

        // Fetch similar movies
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}/recommendations?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ similarseries: data.results }))
            .catch(error => console.error('Error fetching similar series:', error));


        // Fetch cast
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}/credits?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ cast: data.cast }))
            .catch(error => console.error('Error fetching cast:', error));

        // Fetch reviews
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}/reviews?language=en-US&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ reviews: data.results }))
            .catch(error => console.error('Error fetching reviews:', error));
    };

    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });

    };

    openTrailer = (seriesId) => {
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => {
                const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) {
                    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
                } else {
                    alert('Trailer not available');
                }
            })
            .catch(error => console.error('Error fetching trailer:', error));
    };

    watchNow = () => {
        this.setState({ watchNow: true });
    };


    render() {
        const { activeSection, setActiveSection } = this.props;
        const { latestseries, popularseries, selectedseries, similarseries, cast, reviews, activeTab, watchNow } = this.state;

        if (watchNow && selectedseries) {
            return (
                <Tvscreen series={selectedseries} onBack={() => this.setState({ watchNow: false })} />
            );
        }

        if (selectedseries) {
            return (
                <>
                    <button className='back-but' onClick={() => this.setState({ selectedseries: null }, () => setActiveSection('tv-shows'))}><i className="fas fa-chevron-left"></i>  Back</button>
                    <div className="MovieDetails">
                        <div className="MovieDetailsContent">
                            <img src={`https://image.tmdb.org/t/p/w500${selectedseries.poster_path}`} alt="Movie Poster" />
                            <div className='MovieOverview1'>
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} href="#" onClick={() => this.setActiveTab('overview')}>Overview</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeTab === 'cast' ? 'active' : ''}`} href="#" onClick={() => this.setActiveTab('cast')}>Cast</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} href="#" onClick={() => this.setActiveTab('reviews')}>Reviews</a>
                                    </li>
                                </ul>
                                <div className="MovieOverview">
                                    {activeTab === 'overview' && (
                                        <div>
                                            <h1>{selectedseries.name}</h1>
                                            <p>{selectedseries.overview}</p>
                                            <p><strong>Release Date:</strong> {new Date(selectedseries.first_air_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            <p><strong>Genre:</strong> {selectedseries.genres.map(genre => genre.name).join(', ')}</p>
                                        </div>
                                    )}
                                    {activeTab === 'cast' && (
                                        <div>
                                            <div className="cast-list">
                                                {cast.map(member => (
                                                    <div key={member.cast_id} className="cast-member">
                                                        <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name} />
                                                        <p>{member.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'reviews' && (
                                        <div>
                                            <ul>
                                                {reviews.map(review => (
                                                    <div className="review-card" key={review.id}>
                                                        <h3>{review.author}</h3>
                                                        <p><strong>Rating:</strong> {review.author_details.rating}</p>
                                                        <p><strong>Date:</strong> {new Date(review.created_at).toLocaleDateString()}</p>
                                                        <p>{review.content}</p>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="watch-now">
                                    <button className="btn btn-primary" onClick={this.watchNow}><i className="fas fa-play"></i> Watch Now</button>
                                    <button className="btn btn-secondary" onClick={() => this.openTrailer(selectedseries.id)}><i className="fab fa-youtube"></i> Trailer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-header"><i className="fas fa-tv"></i> Similar Series</div>
                    <div className="LatestSeriesContainer">
                        {similarseries.map(series => (
                            <div key={series.id} className="card card-series" onClick={() => this.selectSeries(series.id)}>
                                <div className="card-img-overlay">
                                    <span className="card-rating"><i className="fas fa-star"></i> {series.vote_average?.toFixed(1)}</span>
                                    <span className="card-year">{series.first_air_date?.slice(0,4)}</span>
                                </div>
                                <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className="card-img-top" alt="Series Poster" />
                                <div className="card-body">
                                    <h5 className="card-title">{series.name}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="section-header"><i className="fas fa-tv"></i> TV Series</div>
                <div className='Main'>
                    <div className='section-header'><i className="fas fa-bolt"></i> Latest TV Series</div>
                    <div className='LatestSeriesContainer'>
                        {latestseries && latestseries.length > 0 ? (
                            latestseries.map(series => (
                                <div key={series.id} className="card card-series" onClick={() => this.selectSeries(series.id)}>
                                    <div className="card-img-overlay">
                                        <span className="card-rating"><i className="fas fa-star"></i> {series.vote_average?.toFixed(1)}</span>
                                        <span className="card-year">{series.first_air_date?.slice(0,4)}</span>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className="card-img-top" alt="Series Poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{series.name}</h5>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading latest series...</p>
                        )}
                    </div>
                    <div className='section-header'><i className="fas fa-fire"></i> Popular TV Series</div>
                    <div className='LatestSeriesContainer'>
                        {popularseries && popularseries.length > 0 ? (
                            popularseries.map(series => (
                                <div key={series.id} className="card card-series" onClick={() => this.selectSeries(series.id)}>
                                    <div className="card-img-overlay">
                                        <span className="card-rating"><i className="fas fa-star"></i> {series.vote_average?.toFixed(1)}</span>
                                        <span className="card-year">{series.first_air_date?.slice(0,4)}</span>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className="card-img-top" alt="Series Poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{series.name}</h5>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading popular series...</p>
                        )}
                    </div>
                </div>
            </>
        ) ;
    }
}

export default Tvseries;
