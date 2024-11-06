import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import logo from '../asssets/svg/logo.svg';
import searchIcon from '../asssets/svg/searchIcon.svg';
import graphicsSymbol from '../asssets/svg/graphicsSymbol.svg';
import hamburger from '../asssets/svg/hamburger.svg';

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    // Call onSearch only when debouncedQuery changes
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    } else {
      onSearch(""); 
    }
  }, [debouncedQuery, onSearch]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <nav className="navbar">
      {isMobile && (
        <div className="mobile-header">
          <p className="header-text">It All Starts Here!</p>
          <button className="use-app-btn">Use App</button>
        </div>
      )}
      
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className='search'>
        <div className='search-bar-container'>
          <span className='search-icon'>
            <img src={searchIcon} alt="Search Icon" />
          </span>
          <input
            type="text"
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            value={query}
            onChange={handleSearch}
            className="search-bar-input"
          />
        </div>
      </div>

      <div className="location-signin">
        <div className='location'>
          <span className='city loc'>Gurugram</span> 
          <img src={graphicsSymbol} alt="Symbol" />
        </div>

        <button className="signin-btn">Sign In</button>

        <div className="menu-icon">
          <img src={hamburger} alt="Menu" />
        </div>
      </div>
      
    </nav>
  );
}

export default Navbar;
