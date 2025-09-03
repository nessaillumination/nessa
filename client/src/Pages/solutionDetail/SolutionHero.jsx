import React from 'react';

// Import statements remain the same
import AirportThumbnail from '../../assets/images/solutionsImages/hero/Aeroplane.jpg'
import HazardousThumbnail from '../../assets/images/solutionsImages/hero/Hazardous Areas.jpg'
import HighwaysThumbnail from '../../assets/images/solutionsImages/hero/Highway Light.jpg'
import MinesThumbnail from '../../assets/images/solutionsImages/hero/Mines.jpg'
import PetrolPumpThumbnail from '../../assets/images/solutionsImages/hero/Petrol Pump.jpg'
import PortsThumbnail from '../../assets/images/solutionsImages/hero/Port Light.jpg'
import RefineryThumbnail from '../../assets/images/solutionsImages/hero/Refinery Light.jpg'
import RuralThumbnail from '../../assets/images/solutionsImages/hero/Rural Light.jpg'
import SolarThumbnail from '../../assets/images/solutionsImages/hero/Solar Parks.jpg'
import StadiumThumbnail from '../../assets/images/solutionsImages/hero/Stadium Light.jpg'
import ThermalThumbnail from '../../assets/images/solutionsImages/hero/Thermal.jpg'
import TunnelsThumbnail from '../../assets/images/solutionsImages/hero/Tunnel Light.jpg'

// Create a case-insensitive mapping of thumbnails
export const SOLUTION_THUMBNAILS = Object.fromEntries(
  Object.entries({
    'Airports': AirportThumbnail,
    'Hazardous areas': HazardousThumbnail,
    'Highways': HighwaysThumbnail,
    'Mines': MinesThumbnail,
    'Petrol pump': PetrolPumpThumbnail,
    'Ports & logistic parks': PortsThumbnail,
    'Refinery': RefineryThumbnail,
    'Rural, hilly & forest areas': RuralThumbnail,
    'Solar parks': SolarThumbnail,
    'Stadium': StadiumThumbnail,
    'Thermal power plants': ThermalThumbnail,
    'Tunnels': TunnelsThumbnail
  }).map(([key, value]) => [key.toLowerCase(), value])
);

export const SolutionHero = ({ solution }) => {
  // Convert the subcategory to lowercase for case-insensitive matching
  const thumbnailSrc = 
    SOLUTION_THUMBNAILS[solution.subcategories?.toLowerCase()] || AirportThumbnail;

  return (
    <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center justify-start">
      <img
        className="w-full h-full object-cover absolute"
        src={thumbnailSrc}
        alt={`${solution.title} hero`}
      />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white ml-[5vw] relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
        {solution.title}
      </h1>
    </div>
  );
};

export default SolutionHero;