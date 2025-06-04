import { useState } from 'react';
import './Carousel.css';

function Carousel() {
  const slides = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
      alt: 'Campaign image 1',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1533553502768-f7ad9f9ccfe8?auto=format&fit=crop&w=900&q=80',
      alt: 'Campaign image 2',
    },
    {
      type: 'video',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
      alt: 'Campaign video',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section aria-label="Media carousel" className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            {slide.type === 'image' ? (
              <img src={slide.src} alt={slide.alt} />
            ) : (
              <video controls>
                <source src={slide.src} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
      <div className="carousel-buttons">
        <button
          aria-label="Previous media"
          className="carousel-btn"
          onClick={handlePrev}
        >
          ❮
        </button>
        <button
          aria-label="Next media"
          className="carousel-btn"
          onClick={handleNext}
        >
          ❯
        </button>
      </div>
    </section>
  );
}

export default Carousel;
