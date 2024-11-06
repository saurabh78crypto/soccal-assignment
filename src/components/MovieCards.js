import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import Loader from './Loader';

function MovieCards({ searchQuery, category }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if the screen is mobile
  const scrollRef = useRef(null);
  const MOVIES_PER_PAGE = 5;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const query = searchQuery || category;

      // Prevent fetch if the query is empty
      if (!query) {
        setMovies([]); // Clear movies if no query
        return;
      }

      setLoading(true); 
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`
        );
        const moviesList = response.data.Search || [];
        
        const detailedMovies = await Promise.all(
          moviesList.map(async (movie) => {
            const movieDetails = await axios.get(
              `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${movie.imdbID}`
            );
            return { ...movie, ...movieDetails.data };
          })
        );
        
        setMovies(detailedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchMovies();
  }, [searchQuery, category]);

  const formatVotes = (votes) => {
    if (!votes) return null;
    const votesNum = parseInt(votes.replace(/,/g, ''));
    return votesNum >= 1000 ? `${(votesNum / 1000).toFixed(1)}K` : votesNum;
  };

  const scrollLeft = () => {
    if (isMobile) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - MOVIES_PER_PAGE, 0));
      const scrollAmount = scrollRef.current.offsetWidth * 0.9;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (isMobile) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    } else {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + MOVIES_PER_PAGE, movies.length - MOVIES_PER_PAGE));
      const scrollAmount = scrollRef.current.offsetWidth * 0.9; 
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Render loading state
  if (loading) {
    return <Loader />;
  }

  const visibleMovies = isMobile ? movies : movies.slice(currentIndex, currentIndex + MOVIES_PER_PAGE);

  return (
    <div className="movie-cards-section">
      <div className="movie-cards-header">
        <h2 className="recommended-title">Recommended Movies</h2>
        <span className="see-all">See All ›</span>
      </div>
      <div className="movie-cards-container">
        {currentIndex > 0 && !isMobile && (
          <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
        )}
        <div className="movie-cards" ref={scrollRef}>
          {visibleMovies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <div className="movie-rating">
                <span className="rating-star">
                  <i className="fa fa-star"></i>
                </span>
                <span className="rating-value">{movie.imdbRating || 'N/A'}/10</span>
                <span className="vote-count">{formatVotes(movie.imdbVotes) || 'N/A'} Votes</span>
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-genre">{movie.Genre || 'Genre not available'}</p>
              </div>
            </div>
          ))}
        </div>
        {currentIndex + MOVIES_PER_PAGE < movies.length && !isMobile && (
          <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
        )}
      </div>
    </div>
  );
}

export default MovieCards;
