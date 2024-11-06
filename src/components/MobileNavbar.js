import React, { useState } from 'react'; 
import { SiBookmyshow, SiKdenlive } from "react-icons/si";
import { RiLiveFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

function MobileNavbar() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="mobile-navbar">
      <button 
        className={activeTab === 'home' ? 'active' : ''} 
        onClick={() => setActiveTab('home')}
      >
        <SiBookmyshow className={activeTab === 'home' ? 'active-icon' : ''} />
        Home
      </button>

      <button 
        className={activeTab === 'movies' ? 'active' : ''} 
        onClick={() => setActiveTab('movies')}
      >
        <RiLiveFill className={activeTab === 'movies' ? 'active-icon' : ''} />
        Movies
      </button>

      <button 
        className={activeTab === 'liveEvents' ? 'active' : ''} 
        onClick={() => setActiveTab('liveEvents')}
      >
        <SiKdenlive className={activeTab === 'liveEvents' ? 'active-icon' : ''} />
        Live Events
      </button>

      <button 
        className={activeTab === 'profile' ? 'active' : ''} 
        onClick={() => setActiveTab('profile')}
      >
        <FaUser className={activeTab === 'profile' ? 'active-icon' : ''} />
        Profile
      </button>
    </nav>
  );
}

export default MobileNavbar;
