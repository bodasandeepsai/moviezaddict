import React from 'react';
import '../App.css';

const SeriesOverview = ({ series, activeTab, cast, reviews, setActiveTab, watchNow, openTrailer }) => {
    return (
        <>
            <div className="MovieDetailsContent">
                <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt="series Poster" />

                <div className='MovieOverview1'>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('overview')}>Overview</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'cast' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('cast')}>Cast</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('reviews')}>Reviews</a>
                        </li>
                    </ul>
                    <div className="MovieOverview">
                        {activeTab === 'overview' && (
                            <div>
                                <h1>{series.name}</h1>
                                <p>{series.overview}</p>
                                <p><strong>First Air Date:</strong> {new Date(series.first_air_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <p><strong>Number of Seasons:</strong> {series.number_of_seasons}</p>
                                <p><strong>Number of Episodes:</strong> {series.number_of_episodes}</p>
                                <p><strong>Genre:</strong> {series.genres.map(genre => genre.name).join(', ')}</p>
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
                        <button className="btn btn-primary" onClick={watchNow}><i className="fas fa-play"></i> Watch Now</button>
                        <button className="btn btn-secondary" onClick={() => openTrailer(series.id)}><i className="fab fa-youtube"></i> Trailer</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SeriesOverview;
