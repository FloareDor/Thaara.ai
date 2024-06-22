import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  beforeImgSrc: string;
  afterImgSrc: string;
}

const ImageSlider: React.FC<Props> = ({ beforeImgSrc, afterImgSrc }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(event.target.value));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const position = ((event.clientX - rect.left) / rect.width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, position)));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
	  <div className="relative w-full h-[400px] overflow-hidden">
		  
		  <Image src={afterImgSrc} alt="Before" className="w-full h-full object-cover absolute" />
		  <Image
        src={beforeImgSrc}
        alt="After"
        className="w-full h-full object-cover absolute"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none z-20"
        style={{ left: `calc(${sliderPosition}% - 1px)` }}
      ></div>
      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-30"
        style={{
          WebkitAppearance: 'none',
          background: 'transparent',
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-20"
        style={{ left: `calc(${sliderPosition}% - 20px)` }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-0.5 h-6 bg-gray-400"></div>
      </div>
    </div>
  );
};

export default ImageSlider;