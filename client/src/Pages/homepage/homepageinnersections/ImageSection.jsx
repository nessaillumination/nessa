import image1 from '../../../assets/images/homepageimages/image1.webp';
import React, { useState, useRef, useEffect } from 'react';

function LightIntensity({ setBrightness }) {
  const [intensity, setIntensity] = useState(0.5);
  const [barHeights, setBarHeights] = useState([]);
  const barsRef = useRef(null);

  const generateRandomHeights = () => {
    const randomHeights = [...Array(21)].map(() => Math.random() * 24 + 12);
    const centerBarIndex = 10;
    randomHeights[centerBarIndex] = Math.max(...randomHeights) + 10;
    setBarHeights(randomHeights);
  };

  useEffect(() => {
    generateRandomHeights();
  }, []);

  const handleBarsClick = (e) => {
    if (!barsRef.current) return;
    const rect = barsRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newIntensity = Math.max(0, Math.min(1, x / rect.width));
    setIntensity(newIntensity);
    setBrightness(newIntensity * 100);
  };

  const handleBarsMove = (e) => {
    if (e.buttons === 1) {
      handleBarsClick(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl   shadow-lg p-4 w-full max-w-sm">
      <h2 className="text-lg md:text-2xl text-center text-gray-800 mb-4">
        Light Intensity
      </h2>

      <div className="space-y-4 mt-14 ">
        <div
          ref={barsRef}
          className="relative h-16 cursor-pointer"
          onClick={handleBarsClick}
          onMouseMove={handleBarsMove}
        >
          <div className="flex justify-between items-center gap-1 h-full">
            {[...Array(21)].map((_, index) => {
              const percentage = index / 20;
              const isActive = intensity >= percentage;
              const height =
                barHeights[index] ||
                12 + Math.abs(Math.sin((index / 20) * Math.PI)) * 24;

              return (
                <div
                  key={index}
                  className={`w-1 rounded-full transition-all duration-300 relative ${
                    isActive
                      ? 'bg-gradient-to-t from-blue-500 via-indigo-500 to-purple-500'
                      : 'bg-gray-200'
                  }`}
                  style={{
                    height: `${height}px`,
                    filter: isActive
                      ? 'drop-shadow(0 0 3px rgba(99, 102, 241, 0.5))'
                      : 'none',
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-blue-500 via-indigo-500 to-purple-500 opacity-50 blur-sm rounded-full"
                      style={{ height: `${height}px` }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={intensity}
            onChange={(e) => {
              const newIntensity = parseFloat(e.target.value);
              setIntensity(newIntensity);
              setBrightness(newIntensity * 100);
            }}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            aria-label="Light Intensity"
          />
        </div>

        <div className="flex justify-between text-sm md:text-lg text-gray-500 font-medium">
          <span>0%</span>
          <span className="text-lg md:text-2xl font-bold text-gray-800">
            {Math.round(intensity * 100)}%
          </span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

function ColorChangeController({ setColor }) {
  const [angle, setAngle] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef(null);
  const knobRef = useRef(null);
  const [draggingAngle, setDraggingAngle] = useState(60);

  const colors = [60, 120, 240];

  const calculateAngle = (centerX, centerY, clientX, clientY) => {
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = (angleRad * 180) / Math.PI + 90;
    if (angleDeg < 0) angleDeg += 360;
    return angleDeg;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const newAngle = calculateAngle(centerX, centerY, e.clientX, e.clientY);
    setDraggingAngle(newAngle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    snapToColor(draggingAngle);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const newAngle = calculateAngle(
      centerX,
      centerY,
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    setDraggingAngle(newAngle);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    snapToColor(draggingAngle);
  };

  const snapToColor = (angle) => {
    const snappedAngle = colors.reduce((prev, curr) => {
      return Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev;
    });
    setAngle(snappedAngle);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    return () => {
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  let mainColor = `hsl(63, 90.60%, 53.90%) 30%`;

  if (draggingAngle >= 0 && draggingAngle < 120) {
    mainColor = `hsl(63, 90.60%, 53.90%) 30%`;
    setColor('yellow');
  } else if (draggingAngle >= 120 && draggingAngle < 240) {
    mainColor = `hsl(120, 100%, 50%) 50%`;
    setColor('green');
  } else if (draggingAngle >= 240 && draggingAngle < 360) {
    mainColor = `hsl(212, 78%, 66%) 100%`;
    setColor('blue');
  }

  const gradientStops = [
    `hsl(63, 90.60%, 53.90%) 30%`,
    `hsl(120, 100%, 50%) 50%`,
    `hsl(212, 78%, 66%) 100%`,
  ].join(', ');

  return (
    <div className="w-full max-w-sm shadow-xl  bg-white p-4 rounded-xl">
      <div className="text-center mb-4">
        <h2 className="text-lg md:text-2xl text-black flex items-center justify-center gap-3">
          Change Color
        </h2>
      </div>

      <div
        ref={dialRef}
        className="relative w-[60vw] sm:w-[200px] h-[60vw] sm:h-[200px] mx-auto p-[4vw] sm:p-[32px] bg-gray-100 rounded-full"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div
          className="absolute inset-2 rounded-full m-2"
          style={{
            background: `conic-gradient(${gradientStops})`,
            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))',
          }}
        />

        <div className="absolute inset-8 rounded-full bg-gray-200 shadow-lg" />
        <div className="absolute inset-12 rounded-full bg-white shadow-lg transition-all duration-200 transform shadow-black" />
        <div
          className="absolute inset-16 rounded-full transition-colors duration-200 border-[10px] border-gray-100"
          style={{
            boxShadow: `0 0 20px ${mainColor}40`,
          }}
        />

        <div
          ref={knobRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className={`absolute w-[15px] sm:w-6 h-[15px] sm:h-6 ${
            draggingAngle > 50 && draggingAngle < 200
              ? '-ml-2 -mt-2'
              : '-ml-3 -mt-3'
          } cursor-grab active:cursor-grabbing`}
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${draggingAngle}deg) translateY(-50px) rotate(-${draggingAngle}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <div className="w-full h-full rounded-full bg-[#004fff] shadow-lg" />
        </div>
      </div>
    </div>
  );
}

export default function ImageSection() {
  const [color, setColor] = useState('yellow');
  const [brightness, setBrightness] = useState(50);

  const getHueRotation = (color) => {
    switch (color) {
      case 'yellow':
        return 'hue-rotate(60deg)';
      case 'green':
        return 'hue-rotate(120deg)';
      case 'blue':
        return 'hue-rotate(240deg)';
      default:
        return 'none';
    }
  };

  return (
    <div>
      <div className="w-full h-fit px-[5vw] my-5">
        <div
          className="w-full h-[500px] md:h-[600px] mx-auto mb-6 bg-center bg-cover rounded-lg"
          style={{
            backgroundImage: `url(${image1})`,
            filter: `brightness(${brightness * 2}%) ${getHueRotation(color)}`,
          }}
        />
      </div>
      <div className="w-full md:translate-y-[-5vw] max-md:mb-10 px-[5vw] flex gap-6 justify-center flex-wrap">
        <ColorChangeController setColor={setColor} />
        <LightIntensity setBrightness={setBrightness} brightness={brightness} />
      </div>
    </div>
  );
}