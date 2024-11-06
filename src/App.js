import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import MovieCards from './components/MovieCards';
import ImageCarousel from './components/ImageCarousel';
import MobileNavbar from './components/MobileNavbar';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Movies");
  

  return (
    <div className="App">
      <Navbar onSearch={setSearchQuery} />
      <CategoryBar onCategoryChange={setCategory} />
      <ImageCarousel />
      <MovieCards searchQuery={searchQuery} category={category} />
      <MobileNavbar />
    </div>
  );
}

export default App;
