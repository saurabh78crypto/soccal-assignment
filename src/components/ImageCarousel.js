import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../asssets/img/img1.jpg';
import img2 from '../asssets/img/img2.jpg';
import img3 from '../asssets/img/img3.jpg';
import img4 from '../asssets/img/img4.jpg';

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <Carousel
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={500}
        stopOnHover
        showArrows={!isMobile}
        centerMode={!isMobile}
        centerSlidePercentage={isMobile ? 100 : 80}
        swipeable={true}
      >

        {[img1, img2, img3, img4].map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Carousel ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Carousel>

      <button className="carousel-arrow left" onClick={handlePrev}>&lt;</button>
      <button className="carousel-arrow right" onClick={handleNext}>&gt;</button>
    </div>
  );
}

export default ImageCarousel;
