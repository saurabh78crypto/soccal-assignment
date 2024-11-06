import React, { useState, useEffect } from 'react';
import movies from '../asssets/img/movies.png'
import sports from '../asssets/img/sports.png';
import comedyShows from '../asssets/img/comedyShows.png'
import seeAll from '../asssets/img/seeAll.png';
import plays from '../asssets/img/plays.png';
import { FaFilm } from 'react-icons/fa';
import { GiMicrophone } from 'react-icons/gi';

function CategoryBar({ onCategoryChange }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effect to update screen size dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="category-bar">
      <div className="category-group-left">
        <button onClick={() => onCategoryChange("Movies")}>
          {isMobile && <img src={movies} alt="Movies" className="category-icon" />}
          {!isMobile && <span>Movies</span>}
        </button>

        <button onClick={() => onCategoryChange("Stream")}>
          {isMobile && <FaFilm className="category-icon" />}
          <span>Stream</span>
        </button>

        <button onClick={() => onCategoryChange("Events")}>
          {isMobile && <GiMicrophone className="category-icon" />}
          <span>Events</span>
        </button>

        <button>
          {isMobile && <img src={plays} alt="Movies" className="category-icon" />}
          {!isMobile && <span>Plays</span>}
        </button>

        <button>
          {isMobile && <img src={sports} alt="Movies" className="category-icon" />}
          {!isMobile && <span>Sports</span>}
        </button>

        <button>
          {isMobile && <img src={comedyShows} alt="Movies" className="category-icon" />}
          {!isMobile && <span>Activities</span>}
        </button>

        <button>
          {isMobile && <img src={seeAll} alt="Movies" className="category-icon" />}
        </button>
      </div>

      <div className="category-group-right">
        <button>
          <span>ListYourShow</span>
        </button>
        <button>
          <span>Corporates</span>
        </button>
        <button>
          <span>Offers</span>
        </button>
        <button>
          <span>Gift Cards</span>
        </button>
      </div>
    </div>
  );
}

export default CategoryBar;
