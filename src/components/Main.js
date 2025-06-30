import React, { Component } from 'react';
import Moviescreen from './Moviescreen';
import MovieOverview from './MovieOverview';
import SeriesOverview from './SeriesOverview';
import Tvscreen from './Tvscreen';

const HERO_BG = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80'; // fallback background

export class Main extends Component {
    state = {
        allTrending: [],
        latestMovies: [],
        trendingSeries: [],
        popularMovies: [],
        popularSeries: [],
        selectedMovieId: null,
        selectedMovie: null,
        selectedSeriesId: null,
        selectedSeries : null,
        similarMovies: [],
        similarSeries: [],
        cast: [],
        reviews: [],
        activeTab: 'overview',
        watchNow: false, 
        heroIndex: 0,
        heroInterval: null,
        heroFade: false,
        heroInfoOpen: false,
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

        // Fetch trending TV series
        fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ trendingSeries: data.results });
            })
            .catch(error => console.error('Error fetching trending series:', error));


        // Fetch popular Tv series
        fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ popularSeries: data.results });
            })
            .catch(error => console.error('Error fetching popular series:', error));

        this.startHeroInterval();
    }

    componentWillUnmount() {
        this.clearHeroInterval();
    }

    startHeroInterval = () => {
        this.clearHeroInterval();
        const heroInterval = setInterval(() => {
            this.setState(prev => ({
                heroIndex: (prev.heroIndex + 1) % Math.min(5, (prev.latestMovies?.length || 0)),
                heroFade: true,
                heroInfoOpen: false
            }), () => {
                setTimeout(() => this.setState({ heroFade: false }), 800);
            });
        }, 7000);
        this.setState({ heroInterval });
    };

    clearHeroInterval = () => {
        if (this.state.heroInterval) {
            clearInterval(this.state.heroInterval);
            this.setState({ heroInterval: null });
        }
    };

    handleHeroNav = (idx) => {
        this.setState({ heroIndex: idx, heroFade: true, heroInfoOpen: false });
        setTimeout(() => this.setState({ heroFade: false }), 800);
        this.startHeroInterval();
    };

    handleHeroArrow = (dir) => {
        const { heroIndex, latestMovies } = this.state;
        const max = Math.min(5, latestMovies?.length || 0);
        let next = heroIndex + dir;
        if (next < 0) next = max - 1;
        if (next >= max) next = 0;
        this.setState({ heroIndex: next, heroFade: true, heroInfoOpen: false });
        setTimeout(() => this.setState({ heroFade: false }), 800);
        this.startHeroInterval();
    };

    handleHeroWatchNow = (movie) => {
        this.selectMovie(movie.id);
    };

    handleHeroInfo = () => {
        this.setState({ heroInfoOpen: true });
    };

    handleHeroInfoClose = () => {
        this.setState({ heroInfoOpen: false });
    };

    selectMovie = (movieId) => {
        const { setActiveSection } = this.props;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });



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

    selectSeries = (seriesId) => {
        const { setActiveSection } = this.props;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });


        // Set the selected series ID
        this.setState({ selectedSeriesId: seriesId, activeTab: 'overview' });

        // Fetch the selected series details
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ selectedSeries: data }))
            .catch(error => console.error('Error fetching series details:', error));

        // Fetch similar series
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}/recommendations?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ4MTU1NTYzYzc5M2VmNWRiMTNjODQ3NjE4YzY0MyIsInN1YiI6IjY2NjNlMjM4Njg0MTJjMzU3OTkxNmQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4517q4N-0GmmL6r-FG9-uyaRDSyP0XLobb6qkLZe260'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ similarSeries: data.results }))
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
        const { latestMovies, trendingSeries, popularMovies, popularSeries, selectedMovie, selectedSeries, similarMovies,similarSeries, cast, reviews, activeTab, watchNow, heroIndex, heroFade, heroInfoOpen } = this.state;
        const heroMovies = latestMovies?.slice(0, 5) || [];
        const heroMovie = heroMovies[heroIndex] || null;
        const genres = heroMovie?.genre_ids ? heroMovie.genre_ids.map(id => window.GENRE_MAP?.[id] || '').filter(Boolean).join(', ') : '';

        if (watchNow && selectedMovie) {
            return (
                <Moviescreen movie={selectedMovie} onBack={() => this.setState({ watchNow: false })} />
            );
        }

        if (watchNow && selectedSeries) {
            return (
                <Tvscreen series={selectedSeries} onBack={() => this.setState({ watchNow: false })} />
            );
        }

        if (selectedMovie) {
            return (
                <>
                    <button
                        className='back-but'
                        onClick={() => this.setState({ selectedMovie: null }, () => setActiveSection('home'))}
                        style={{ display: 'block', position: 'relative' }} 
                    >
                        <i className="fas fa-chevron-left"></i> Back
                    </button>
                    <div className="MovieDetails">
                        <MovieOverview
                            movie={selectedMovie}
                            activeTab={activeTab}
                            cast={cast}
                            reviews={reviews}
                            setActiveTab={this.setActiveTab}
                            watchNow={this.watchNow}
                            openTrailer={this.openTrailer}
                        />
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

        if (selectedSeries) {
            return (
                <>
                    <button
                        className='back-but'
                        onClick={() => this.setState({ selectedSeries: null }, () => setActiveSection('home'))}
                        style={{ display: 'block', position: 'relative' }} 
                    >
                        <i className="fas fa-chevron-left"></i> Back
                    </button>
                    <div className="MovieDetails">
                        <SeriesOverview
                            series={selectedSeries}
                            activeTab={activeTab}
                            cast={cast}
                            reviews={reviews}
                            setActiveTab={this.setActiveTab}
                            watchNow={this.watchNow}
                            openTrailer={this.openTrailer}
                        />
                    </div>
                    <div className="section-header"><i className="fas fa-tv"></i> Similar Series</div>
                    <div className="LatestSeriesContainer">
                        {similarSeries.map(series => (
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

        // Hero Slideshow
        return (
            <>
                <div className={`hero-banner hero-netflix${heroFade ? ' hero-fade' : ''}`}
                    style={{
                        backgroundImage: heroMovie ? `url(https://image.tmdb.org/t/p/original${heroMovie.poster_path})` : `url(${HERO_BG})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <div className="hero-netflix-bg-blur"></div>
                    <div className="hero-netflix-gradient"></div>
                    {heroMovie && (
                        <div className="hero-netflix-content">
                            <div className="hero-netflix-poster">
                                <img src={`https://image.tmdb.org/t/p/w500${heroMovie.poster_path}`} alt={heroMovie.title} />
                            </div>
                            <div className={`hero-netflix-info${heroInfoOpen ? ' open' : ''}`}>
                                <h1 className="hero-title"><i className="fas fa-film"></i> {heroMovie.title}</h1>
                                <div className="hero-meta">
                                    <span className="hero-rating"><i className="fas fa-star"></i> {heroMovie.vote_average?.toFixed(1)}</span>
                                    <span className="hero-year">{heroMovie.release_date?.slice(0,4)}</span>
                                    {genres && <span className="hero-genres">{genres}</span>}
                                </div>
                                <p className="hero-tagline">{heroMovie.overview?.slice(0, 180)}{heroMovie.overview?.length > 180 ? '...' : ''}</p>
                                <div className="hero-btns">
                                    <button className="btn btn-primary hero-cta" onClick={() => this.handleHeroWatchNow(heroMovie)}><i className="fas fa-play"></i> Watch Now</button>
                                    <button className="btn btn-secondary hero-cta" onClick={this.handleHeroInfo}><i className="fas fa-info-circle"></i> More Info</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="hero-nav-arrows">
                        <button className="hero-arrow" onClick={() => this.handleHeroArrow(-1)} aria-label="Previous"><i className="fas fa-chevron-left"></i></button>
                        <button className="hero-arrow" onClick={() => this.handleHeroArrow(1)} aria-label="Next"><i className="fas fa-chevron-right"></i></button>
                    </div>
                    <div className="hero-dots">
                        {heroMovies.map((_, idx) => (
                            <span key={idx} className={`hero-dot${idx === heroIndex ? ' active' : ''}`} onClick={() => this.handleHeroNav(idx)}></span>
                        ))}
                    </div>
                </div>
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
                    <div className='section-header'><i className="fas fa-bolt"></i> Latest TV Series</div>
                    <div className='LatestSeriesContainer'>
                        {trendingSeries && trendingSeries.length > 0 ? (
                            trendingSeries.map(series => (
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
                            <p>Loading trending series...</p>
                        )}
                    </div>
                    <div className='section-header'><i className="fas fa-fire"></i> Popular TV Series</div>
                    <div className='LatestSeriesContainer'>
                        {popularSeries && popularSeries.length > 0 ? (
                            popularSeries.map(series => (
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
        );
    }






}

export default Main;

