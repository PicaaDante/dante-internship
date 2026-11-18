import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const Carousel = ({ children }) => {
  const sliderRef = useRef(null);

  return (
    <div className="slider-controls">
      <button
        className="slider-arrow slider-arrow--left"
        onClick={() => sliderRef.current.slickPrev()}
      >
        &lsaquo;
      </button>

      <button
        className="slider-arrow slider-arrow--right"
        onClick={() => sliderRef.current.slickNext()}
      >
        &rsaquo;
      </button>

      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;
