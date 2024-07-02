import React, { Component } from 'react';
import Moviescreen from './Moviescreen';
import MovieOverview from './MovieOverview';
import SeriesOverview from './SeriesOverview';
import Tvscreen from './Tvscreen';


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
    }

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
        const { latestMovies, trendingSeries, popularMovies, popularSeries, selectedMovie, selectedSeries, similarMovies,similarSeries, cast, reviews, activeTab, watchNow } = this.state;

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
                        style={{ display: 'block', position: 'relative' }} // Ensure the button is displayed and positioned correctly
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

                    <div className="SimilarMovies">
                        <h1>Similar Movies</h1>
                        <div className="LatestMoviesContainer">
                            {similarMovies.map(movie => (
                                <div key={movie.id} className="card" onClick={() => this.selectMovie(movie.id)}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt="Movie Poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                        style={{ display: 'block', position: 'relative' }} // Ensure the button is displayed and positioned correctly
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
                    <div className="SimilarMovies">
                        <h1>Similar Tv series</h1>
                        <div className="LatestMoviesContainer">
                            {similarSeries.map(series => (
                                <div key={series.id} className="card" onClick={() => this.selectSeries(series.id)}>
                                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className="card-img-top" alt="Movie Poster" />
                                    <div className="card-body">
                                        <h5 className="card-title">{series.title}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                </>
            );
        }





        return (
            <>

                <div className='Main'>
                    <div className='h1heading'>
                        <h1>Latest Movies</h1>
                    </div>
                    <div className='LatestMoviesContainer'>
                        {latestMovies && latestMovies.length > 0 ? (
                            latestMovies.map(movie => (
                                <div key={movie.id} className="card" onClick={() => this.selectMovie(movie.id)}>
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

                    <div className='h1heading'>
                        <h1>Popular Movies</h1>
                    </div>
                    <div className='LatestMoviesContainer'>
                        {popularMovies && popularMovies.length > 0 ? (
                            popularMovies.map(movie => (
                                <div key={movie.id} className="card" onClick={() => this.selectMovie(movie.id)}>
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
                    <div className='h1heading'>
                        <h1>Latest Tv series</h1>
                    </div>
                    <div className='LatestSeriesContainer'>
                        {trendingSeries && trendingSeries.length > 0 ? (
                            trendingSeries.map(series => (
                                <div key={series.id} className="card" onClick={() => this.selectSeries(series.id)}>
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
                    <div className='h1heading'>
                        <h1>popular Tv series</h1>
                    </div>
                    <div className='LatestSeriesContainer'>
                        {popularSeries && popularSeries.length > 0 ? (
                            popularSeries.map(series => (
                                <div key={series.id} className="card" onClick={() => this.selectSeries(series.id)}>
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

