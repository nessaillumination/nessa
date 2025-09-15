import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  primaryKeyword = [],
  secondaryKeywords = [],
  ogTitle
}) => {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const allKeywords = [primaryKeyword, ...secondaryKeywords].join(", ");

  return (
    <Helmet>
      {/* Title Tag */}
      {title && <title>{title}</title>}

      {/* Meta Description */}
      {description && <meta name="description" content={description} />}

      {/* Meta Keywords (optional/legacy) */}
      <meta name="keywords" content={allKeywords} />
      {/* {<meta name="robots" content="index, follow" />} */}
      {ogTitle && <meta property="og:title" content={ogTitle}></meta>}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;






// export const seoPathForDynamicPages = {
//   airports:{
//     title:"Airport Lighting Solutions | LED Runway & Taxiway Lighting | Nessa",
//     description:"Reliable airport lighting solutions including LED runway lights, taxiway lighting, and advanced runway lighting systems for safe and efficient airport operations.",
//     keywords:["airport lighting solutions","LED airport lighting","runway lighting systems","taxiway lighting solutions","LED runway lights"]
//   } ,
//   mines:{
//     title:"LED Mining Lights & Flood Lights | Quarry & High Mast Solutions | Nessa",
//     description:"Reliable LED mining lights, flood lights, and high mast lighting for mines and quarries. Durable mining lighting solutions designed for safety and efficiency.",
//     keywords:["LED mining lights","mining lighting solutions","LED flood lights for mines","quarry lighting systems","LED high mast lighting for mines"]
//   } ,

// }


export const seoPathForDynamicPages = { 
  airports: {
    title: "Airport Lighting Solutions | LED Runway & Taxiway Lighting | Nessa",
    description: "Reliable airport lighting solutions including LED runway lights, taxiway lighting, and advanced runway lighting systems for safe and efficient airport operations.",
    keywords: ["airport lighting solutions","LED airport lighting","runway lighting systems","taxiway lighting solutions","LED runway lights"]
  },
  mines: {
    title: "LED Mining Lights & Flood Lights | Quarry & High Mast Solutions | Nessa",
    description: "Reliable LED mining lights, flood lights, and high mast lighting for mines and quarries. Durable mining lighting solutions designed for safety and efficiency.",
    keywords: ["LED mining lights","mining lighting solutions","LED flood lights for mines","quarry lighting systems","LED high mast lighting for mines"]
  },
  petrolpump: {
    title: "Petrol Pump Lighting Solutions | LED Canopy & Fuel Station Lights | Nessa",
    description: "Energy-efficient LED lights for petrol pumps and fuel stations. Reliable canopy lighting and tailored petrol station LED lighting solutions for safety and visibility.",
    keywords: ["petrol pump lighting solutions","LED lights for petrol pumps","LED canopy lights for fuel stations","fuel station lighting solutions","petrol station LED lighting"]
  },
  portslogisticparks: {
    title: "Port Lighting Solutions | LED High Mast & Warehouse Lights | Nessa",
    description: "LED high mast lighting and flood lights for ports and logistics parks. Efficient warehouse lighting solutions designed for safe, reliable port and logistics operations.",
    keywords: ["port lighting solutions","led high mast lighting","warehouse lighting solutions","logistics park lighting","led flood lights for ports"]
  },
  stadium: {
    title: "LED Stadium Lighting Solutions | Sports & Flood Lights | Nessa",
    description: "Advanced stadium lighting solutions with LED stadium lights, sports lighting, high mast, and flood lights. Perfect illumination for sports arenas and events.",
    keywords: ["stadium lighting solutions","LED stadium lights","sports stadium lighting","high mast stadium lighting","stadium flood lights"]
  },
 refinery:{
    title:"Industrial Lighting Manufacturer for Refineries | Nessa",
    ogTitle:"Industrial Lighting Manufacturer for Refineries | Nessa",
    description:"Nessa offers industrial lighting solutions for refineries, ensuring energy-efficient, reliable illumination in demanding industrial environments.",
    keywords:["explosion proof led lights","hazardous area lighting","led industrial lighting","oil and gas lighting","Industrial lighting Manufacturer"]
  },
  highways:{
    title:"Commercial LED Street & Solar Lights | High Mast Highway Lighting | Nessa",
    ogTitle:"Commercial LED Street & Solar Lights | High Mast Highway Lighting | Nessa",
    description:"Nessa offers commercial outdoor lighting and energy-efficient street lights for highways and urban roads, ensuring reliable, sustainable illumination.",
    keywords:["led street lights","high mast lighting","solar street lights","Commercial Outdoor Lighting","Street Light manufacturer"]
  },
  tunnels:{
    title:"LED Tunnel Lighting System | Tunnel Lights & Fixtures | Nessa",
    ogTitle:"LED Tunnel Lighting System | Tunnel Lights & Fixtures | Nessa",
    description:"Energy-efficient LED tunnel lighting systems and fixtures for clear visibility. Reliable tunnel lights and advanced LED solutions for tunnel safety and efficiency.",
    keywords:["tunnel lighting","led tunnel lights","tunnel light fixtures","tunnel lighting system","led tunnel lighting system"]
  },
    ruralhillyforestareas:{
    title:"Solar Street Lights for Rural Areas | Remote Area Lighting | Nessa",
    ogTitle:"Solar Street Lights for Rural Areas | Remote Area Lighting | Nessa",
    description:"Solar street lights and high mast lighting for rural, hilly, and forest areas. Reliable solar LED lights for villages and remote area lighting solutions.",
    keywords:["solar street lights for rural areas","rural area lighting solutions","Rural Lighting Solutions","solar led lights for villages","solar lighting for remote areas"]
  },
    hazardousareas:{
    title:"Explosion Proof LED Lights | Hazardous & ATEX Lighting | Nessa",
    ogTitle:"Explosion Proof LED Lights | Hazardous & ATEX Lighting | Nessa",
    description:"ATEX-certified explosion-proof LED lights and flameproof lighting for industrial hazardous areas. Intrinsically safe LED lighting solutions ensure safety, reliability, and energy efficiency in industrial environments.",
    keywords:["explosion proof led lights","hazardous area lighting","flameproof led lights","atex certified led lights","Industrial Led Lighting"]
  },
    thermalpowerplants:{
    title:"Innovative Thermal Power Plant Lighting | Industrial LED & High Mast | Nessa",
    ogTitle:"Innovative Thermal Power Plant Lighting | Industrial LED & High Mast | Nessa",
    description:"Nessa offers innovative lighting solutions for thermal power plants, ensuring energy-efficient, reliable illumination in demanding industrial operations.",
    keywords:["Thermal-power-plants","thermal power plant lighting","industrial led lighting","high mast lighting","led flood lights","Innovative Lighting Solutions"]
  },
 solarparks: {
  title:"Smart Solar Lights & Street Lights Manufacturer | Nessa",
  ogTitle:"Smart Solar Lights & Street Lights Manufacturer | Nessa",
  description:"Nessa offers smart solar lights, energy-efficient LED lighting, and solar street lights for solar parks and smart city projects, ensuring reliable performance.",
keywords : ["solar park lighting","solar high mast lighting","smart solar lights","Energy Efficient Led Lighting","Solar Street Light Manufacturer"]
  }
}

