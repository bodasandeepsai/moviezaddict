import React, { Component } from 'react';
import MovieOverview from './MovieOverview';
import Moviescreen from './Moviescreen';
import SeriesOverview from './SeriesOverview';
import Tvscreen from './Tvscreen';

class Search extends Component {
    debounceTimeout = null;

    state = {
        query: '',
        searchResults: [],
        currentPage: 0,
        totalPages: 0,
        selectedMovieId: null,
        selectedMovie: null,
        selectedSeriesId: null,
        selectedSeries: null,
        cast: [],
        reviews: [],
        activeTab: 'overview',
        watchNow: false,
    };

    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState({ query: value });
        if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            this.performSearch(value);
        }, 400);
    };

    performSearch = (value) => {
        fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&query=${value}&api_key=2d48155563c793ef5db13c847618c643&page=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    searchResults: data.results,
                    currentPage: data.page,
                    totalPages: data.total_pages,
                });
            })
            .catch(error => console.error('Error fetching search results:', error));
    };

    goToPage = (page) => {
        const { query } = this.state;
        this.performSearch(query);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    fetchMovieDetails = (movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=2d48155563c793ef5db13c847618c643`)
            .then(response => response.json())
            .then(movie => this.setState({ selectedMovie: movie }))
            .catch(error => console.error('Error fetching movie details:', error));
    };

    fetchSeriesDetails = (seriesId) => {
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US&api_key=2d48155563c793ef5db13c847618c643`)
            .then(response => response.json())
            .then(series => this.setState({ selectedSeries: series }))
            .catch(error => console.error('Error fetching series details:', error));
    };

    fetchCast = (id, type) => {
        const endpoint = type === 'movie' 
            ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2d48155563c793ef5db13c847618c643`
            : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=2d48155563c793ef5db13c847618c643`;
        
        fetch(endpoint)
            .then(response => response.json())
            .then(data => this.setState({ cast: data.cast }))
            .catch(error => console.error('Error fetching cast:', error));
    };

    fetchReviews = (id, type) => {
        const endpoint = type === 'movie' 
            ? `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=2d48155563c793ef5db13c847618c643`
            : `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=2d48155563c793ef5db13c847618c643`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => this.setState({ reviews: data.results }))
            .catch(error => console.error('Error fetching reviews:', error));
    };

    selectItem = (item) => {
        const isMovie = item.media_type === 'movie';
        if (isMovie) {
            this.setState({ selectedMovieId: item.id, selectedSeriesId: null, activeTab: 'overview', watchNow: false });
            this.fetchMovieDetails(item.id);
        } else {
            this.setState({ selectedSeriesId: item.id, selectedMovieId: null, activeTab: 'overview', watchNow: false });
            this.fetchSeriesDetails(item.id);
        }
        this.fetchCast(item.id, item.media_type);
        this.fetchReviews(item.id, item.media_type);
    };

    openTrailer = (id, type) => {
        const endpoint = type === 'movie' 
            ? `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=2d48155563c793ef5db13c847618c643`
            : `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=2d48155563c793ef5db13c847618c643`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) {
                    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
                } else {
                    alert('This trailer is not available');
                }
            })
            .catch(error => console.error('Error fetching trailer:', error));
    };

    watchNow = () => {
        this.setState({ watchNow: true });
    };

    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { query, searchResults, currentPage, totalPages, selectedMovie, selectedSeries, cast, reviews, activeTab, watchNow, selectedMovieId, selectedSeriesId } = this.state;
        const pageNumbers = [];
        const DEFAULT_POSTER = 'https://www.movienewz.com/img/films/poster-holder.jpg'; // or any stylish placeholder

        if (selectedMovie && !watchNow) {
            return (
                <MovieOverview
                    movie={selectedMovie}
                    activeTab={activeTab}
                    cast={cast}
                    reviews={reviews}
                    setActiveTab={this.setActiveTab}
                    openTrailer={(id) => this.openTrailer(id, 'movie')}
                    watchNow={this.watchNow}
                />
            );
        } else if (selectedMovie && watchNow) {
            return (
                <Moviescreen
                    movie={selectedMovie}
                    onBack={() => this.setState({ selectedMovieId: null, selectedMovie: null, watchNow: false })}
                />
            );
        } else if (selectedSeries && !watchNow) {
            return (
                <SeriesOverview
                    series={selectedSeries}
                    activeTab={activeTab}
                    cast={cast}
                    reviews={reviews}
                    setActiveTab={this.setActiveTab}
                    openTrailer={(id) => this.openTrailer(id, 'tv')}
                    watchNow={this.watchNow}
                />
            );
        } else if (selectedSeries && watchNow) {
            return (
                <Tvscreen
                    series={selectedSeries}
                    onBack={() => this.setState({ selectedSeriesId: null, selectedSeries: null, watchNow: false })}
                />
            );
        }

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                <div className="Search">
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                        placeholder="Search any movies or series..."
                    />
                </div>
                <div className="LatestMoviesContainer">
                    {this.state.searchResults.map(item => (
                        <div key={item.id} className="card card-movie" onClick={() => this.selectItem(item)}>
                            <div className="card-img-overlay">
                                <span className="card-rating"><i className="fas fa-star"></i> {item.vote_average?.toFixed(1)}</span>
                                <span className="card-year">{(item.release_date || item.first_air_date)?.slice(0,4)}</span>
                            </div>
                            <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : DEFAULT_POSTER} className="card-img-top" alt="Poster" />
                            <div className="card-body">
                                <h5 className="card-title">{item.title || item.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="Pagination">
                    {currentPage > 1 && (
                        <button className="NumbersBtn" onClick={() => this.goToPage(currentPage - 1)}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    )}

                    {pageNumbers.map(number => (
                        <button className="NumbersBtn" key={number} onClick={() => this.goToPage(number)}>
                            {number}
                        </button>
                    ))}

                    {currentPage < totalPages && (
                        <button className="NumbersBtn" onClick={() => this.goToPage(currentPage + 1)}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    )}
                </div>
            </>
        );
    }
}

export default Search;
