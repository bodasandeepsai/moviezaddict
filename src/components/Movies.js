import React, { Component } from 'react';
import Moviescreen from './Moviescreen';

class Movies extends Component {
    state = {
        allTrending: [],
        latestMovies: [],
        popularMovies: [],
        selectedMovieId: null,
        selectedMovie: null,
        similarMovies: [],
        cast: [],
        reviews: [],
        activeTab: 'overview',
        watchNow: false, // New state to manage the "Watch Now" view
    };

    componentDidMount() {

        // Fetch latest movies
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ latestMovies: data.results });
            })
            .catch(error => console.error('Error fetching latest movies:', error));

        // Fetch popular movies
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ popularMovies: data.results });
            })
            .catch(error => console.error('Error fetching popular movies:', error));
    }

    selectMovie = (movieId) => {
        const { setActiveSection } = this.props;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setActiveSection('movies');


        // Set the selected movie ID
        this.setState({ selectedMovieId: movieId, activeTab: 'overview' });

        // Fetch the selected movie details
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ selectedMovie: data }))
            .catch(error => console.error('Error fetching movie details:', error));

        // Fetch similar movies
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ similarMovies: data.results }))
            .catch(error => console.error('Error fetching similar movies:', error));


        // Fetch cast
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
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
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, {
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

    openTrailer = (movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
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
        const { latestMovies, popularMovies, selectedMovie, similarMovies, cast, reviews, activeTab, watchNow } = this.state;

        if (watchNow && selectedMovie) {
            return (
                <Moviescreen movie={selectedMovie} onBack={() => this.setState({ watchNow: false })} />
            );
        }

        if (selectedMovie) {
            return (
                <>
                    <button className='back-but' onClick={() => this.setState({ selectedMovie: null }, () => setActiveSection('movies'))}><i className="fas fa-chevron-left"></i>  Back</button>
                    <div className="MovieDetails">
                        <div className="MovieDetailsContent">
                            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt="Movie Poster" />
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
                                            <h1>{selectedMovie.title}</h1>
                                            <p>{selectedMovie.overview}</p>
                                            <p><strong>Release Date:</strong> {new Date(selectedMovie.release_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            <p><strong>Runtime:</strong> {Math.floor(selectedMovie.runtime / 60)}hr   {selectedMovie.runtime % 60}mins</p>
                                            <p><strong>Genre:</strong> {selectedMovie.genres.map(genre => genre.name).join(', ')}</p>
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
                                    <button className="btn btn-secondary" onClick={() => this.openTrailer(selectedMovie.id)}><i className="fab fa-youtube"></i> Trailer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-header"><i className="fas fa-film"></i> Similar Movies</div>
                    <div className="LatestMoviesContainer">
                        {similarMovies.map(movie => (
                            <div key={movie.id} className="card card-movie" onClick={() => this.selectMovie(movie.id)}>
                                <div className="card-img-overlay">
                                    <span className="card-rating"><i className="fas fa-star"></i> {movie.vote_average?.toFixed(1)}</span>
                                    <span className="card-year">{movie.release_date?.slice(0,4)}</span>
                                </div>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt="Movie Poster" />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="section-header"><i className="fas fa-film"></i> Movies</div>
                <div className='Main'>
                    <div className='section-header'><i className="fas fa-fire"></i> Latest Movies</div>
                    <div className='LatestMoviesContainer'>
                        {latestMovies && latestMovies.length > 0 ? (
                            latestMovies.map(movie => (
                                <div key={movie.id} className="card card-movie" onClick={() => this.selectMovie(movie.id)}>
                                    <div className="card-img-overlay">
                                        <span className="card-rating"><i className="fas fa-star"></i> {movie.vote_average?.toFixed(1)}</span>
                                        <span className="card-year">{movie.release_date?.slice(0,4)}</span>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt="Movie Poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading latest movies...</p>
                        )}
                    </div>
                    <div className='section-header'><i className="fas fa-star"></i> Popular Movies</div>
                    <div className='LatestMoviesContainer'>
                        {popularMovies && popularMovies.length > 0 ? (
                            popularMovies.map(movie => (
                                <div key={movie.id} className="card card-movie" onClick={() => this.selectMovie(movie.id)}>
                                    <div className="card-img-overlay">
                                        <span className="card-rating"><i className="fas fa-star"></i> {movie.vote_average?.toFixed(1)}</span>
                                        <span className="card-year">{movie.release_date?.slice(0,4)}</span>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt="Movie Poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading popular movies...</p>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default Movies;
