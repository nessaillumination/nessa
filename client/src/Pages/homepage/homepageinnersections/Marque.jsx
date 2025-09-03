import React from 'react'
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


const Marque = () => {


  return (
    <div
      id='mq' className="w-fit h-[100px]    bg-[#005ab322]  max-sm:h-[100px] flex items-center justify-center overflow-x-auto overflow-y-hidden "
    >
        <style>
            {`
                .marqutag1{
                    animation-name: marqueanimation;
                    animation-duration: 40s;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                
                }
                #mq::-webkit-scrollbar{
                    display: none;
                }

                @keyframes marqueanimation {
                    0%{
                        transform: translate(0, 0);
                    }
                    100%{
                        transform: translatex(-3080px);
                    }
                    
                }
            `}
        </style>
      <div id="marqutag1" className="marqutag1 w-[3080px] px-[20px] flex justify-around gap-10  ">
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={adanilogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={adityabirlalogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={essarlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={ltlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={nationallogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={iimlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={nirmalogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={indianoillogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={suzlonlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={hdfclogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={eesllogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={dpworldlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={bidcologo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={torrentlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={jindallogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={ongclogo} alt="" />
 
      </div>
      <div id="marqutag1" className="marqutag1 w-[3080px] px-[20px] flex justify-around gap-10  ">
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={adanilogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={adityabirlalogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={essarlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={ltlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={nationallogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={iimlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={nirmalogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={indianoillogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={suzlonlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={hdfclogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={eesllogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={dpworldlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={bidcologo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={torrentlogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={jindallogo} alt="" />
        <img  loading='lazy' className="h-[100px] w-[150px] object-contain " src={ongclogo} alt="" />
      </div>
     
     
    </div>
  );
}

export default Marque