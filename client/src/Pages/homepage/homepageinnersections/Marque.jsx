import adanilogo from '../../../assets/images/homepageimages/marquelogos/compressed/adanilogo.webp'
import essarlogo from '../../../assets/images/homepageimages/marquelogos/compressed/essarlogo.webp'
import ltlogo from '../../../assets/images/homepageimages/marquelogos/compressed/l&tlogo.webp'
import jindallogo from '../../../assets/images/homepageimages/marquelogos/compressed/jindallogo.webp'
import torrentlogo from '../../../assets/images/homepageimages/marquelogos/compressed/torrentlogo.webp'
import nirmalogo from '../../../assets/images/homepageimages/marquelogos/compressed/nirmalogo.webp'
import adityabirlalogo from '../../../assets/images/homepageimages/marquelogos/compressed/adityabirlalogo.webp'
import bidcologo from '../../../assets/images/homepageimages/marquelogos/compressed/bidcologo.webp'
import dpworldlogo from '../../../assets/images/homepageimages/marquelogos/compressed/dpworldlogo.webp'
import eesllogo from '../../../assets/images/homepageimages/marquelogos/compressed/eesllogo.webp'
import hdfclogo from '../../../assets/images/homepageimages/marquelogos/compressed/hdfclogo.webp'
import iimlogo from '../../../assets/images/homepageimages/marquelogos/compressed/iimlogo.webp'
import indianoillogo from '../../../assets/images/homepageimages/marquelogos/compressed/indianoillogo.webp'
import nationallogo from '../../../assets/images/homepageimages/marquelogos/compressed/nationallogo.webp'
import ongclogo from '../../../assets/images/homepageimages/marquelogos/compressed/ongclogo.webp'
import suzlonlogo from '../../../assets/images/homepageimages/marquelogos/compressed/suzlonlogo.webp'
import b4 from '../../../assets/images/homepageimages/marquelogos/compressed/4.png'
import b6 from '../../../assets/images/homepageimages/marquelogos/compressed/6.png'
import b8 from '../../../assets/images/homepageimages/marquelogos/compressed/8.png'
import b10 from '../../../assets/images/homepageimages/marquelogos/compressed/10.png'
import b11 from '../../../assets/images/homepageimages/marquelogos/compressed/11.png'
import b13 from '../../../assets/images/homepageimages/marquelogos/compressed/13.png'
import b14 from '../../../assets/images/homepageimages/marquelogos/compressed/14.png'
import b16 from '../../../assets/images/homepageimages/marquelogos/compressed/16.png'
import b19 from '../../../assets/images/homepageimages/marquelogos/compressed/19.png'
import b43 from '../../../assets/images/homepageimages/marquelogos/compressed/43.png'
import b45 from '../../../assets/images/homepageimages/marquelogos/compressed/45.png'
import b49 from '../../../assets/images/homepageimages/marquelogos/compressed/49.png'
import b54 from '../../../assets/images/homepageimages/marquelogos/compressed/54.png'
import b56 from '../../../assets/images/homepageimages/marquelogos/compressed/56.png'

const Marque = () => {
  const logos = [
    adanilogo, adityabirlalogo, essarlogo, ltlogo, nationallogo,
    iimlogo, nirmalogo, indianoillogo, suzlonlogo, hdfclogo,
    eesllogo, dpworldlogo, bidcologo, torrentlogo, jindallogo,
    ongclogo, b4, b6, b8, b10, b11, b14, b13, b16, b19,
    b43, b45,b49, b54, b56
  ];

  return (
    <div className="w-full h-[100px] bg-[#005ab322] max-sm:h-[100px] flex items-center overflow-hidden">
      <style>
        {`
          @keyframes marqueeScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee-container {
            animation: marqueeScroll 40s linear infinite;
          }

          .marquee-container:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="flex marquee-container">
        {/* First set of logos */}
        <div className="flex gap-10 px-5 shrink-0">
          {logos.map((logo, index) => (
            <img
              key={`logo-1-${index}`}
              loading="lazy"
              className="h-[100px] w-[150px] object-contain shrink-0"
              src={logo}
              alt=""
            />
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-10 px-5 shrink-0">
          {logos.map((logo, index) => (
            <img
              key={`logo-2-${index}`}
              loading="lazy"
              className="h-[100px] w-[150px] object-contain shrink-0"
              src={logo}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marque;