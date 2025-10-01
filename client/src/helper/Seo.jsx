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
  },

  // ---------------product pages data------------------
    slug679b2b093ffe331fe7df9f7e: {
    title: "18W LED Street Light | Energy Efficient Street Lighting | Nessa",
    description:
      "Shop 18 watt LED street lights for energy-efficient outdoor lighting. Explore Nessa’s 18W LED and solar street lighting solutions for roads, pathways, and campuses.",
    keywords: [
      "led street light 18w",
      "18 watt led street light",
      "solar street light 18w",
      "energy efficient street light",
      "led street lighting",
    ],
  },
  slug679b321e3ffe331fe7dfa01f: {
    title: "20W LED Street Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Buy 20 watt LED street lights for energy-efficient, bright outdoor lighting. Nessa offers 20W LED and solar street lighting for roads, pathways, and public spaces.",
    keywords: [
      "led street light 20w",
      "20 watt led street light",
      "solar street light 20w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug679b33e23ffe331fe7dfa04f: {
    title: "24W LED Street Light | Energy Efficient Street Lighting | Nessa",
    description:
      "Discover 24 watt LED street lights for energy-efficient outdoor lighting. Nessa’s 24W LED and solar street lighting is ideal for roads, pathways, and public areas.",
    keywords: [
      "led street light 24w",
      "24 watt led street light",
      "solar street light 24w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug679b372a3ffe331fe7dfa064: {
    title: "45W LED Street Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Shop 45 watt LED street lights for energy-efficient, bright outdoor lighting. Nessa’s 45W LED and solar street lighting is ideal for roads, campuses, and pathways.",
    keywords: [
      "led street light 45w",
      "45 watt led street light",
      "solar street light 45w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a05272b15bde2d27dddbf6: {
    title: "30W LED Street Light | Energy Efficient Street Lighting | Nessa",
    description:
      "Explore 30 watt LED street lights for energy-efficient outdoor lighting. Nessa’s 30W LED and solar street lighting is perfect for roads, pathways, and public areas.",
    keywords: [
      "led street light 30w",
      "30 watt led street light",
      "solar street light 30w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a0557ab15bde2d27dddc0e: {
    title: "60W LED Street Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Buy 60 watt LED street lights for energy-efficient, bright outdoor lighting. Nessa’s 60W LED and solar street lighting suits roads, highways, and public pathways.",
    keywords: [
      "led street light 60w",
      "60 watt led street light",
      "solar street light 60w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a057a5b15bde2d27dddc2c: {
    title: "75W LED Street Light | Energy Efficient Street Lighting | Nessa",
    description:
      "Explore 75 watt LED street lights for energy-efficient outdoor lighting. Nessa’s 75W LED and solar street lighting is ideal for roads, highways, and public areas.",
    keywords: [
      "led street light 75w",
      "75 watt led street light",
      "solar street light 75w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a0593eb15bde2d27dddc45: {
    title: "90W LED Street Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Shop 90 watt LED street lights for energy-efficient, bright outdoor lighting. Nessa’s 90W LED and solar street lighting suits roads, highways, and public areas.",
    keywords: [
      "led street light 90w",
      "90 watt led street light",
      "solar street light 90w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a05c33b15bde2d27dddc63: {
    title: "100W LED Street Light | Energy Efficient Street Lighting | Nessa",
    description:
      "Discover 100 watt LED street lights for energy-efficient outdoor lighting. Nessa’s 100W LED and solar street lighting is ideal for roads, highways, and campuses.",
    keywords: [
      "led street light 100w",
      "100 watt led street light",
      "solar street light 100w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a05db2b15bde2d27dddc7c: {
    title: "120W LED Street Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Buy 120 watt LED street lights for energy-efficient, bright outdoor lighting. Nessa’s 120W LED and solar street lighting suits roads, highways, and public areas.",
    keywords: [
      "led street light 120w",
      "120 watt led street light",
      "solar street light 120w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a05f58b15bde2d27dddc95: {
    title: "150W LED Street Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Explore 150 watt LED street lights for energy-efficient, bright outdoor lighting. Nessa’s 150W LED and solar street lighting is ideal for roads, highways, and campuses.",
    keywords: [
      "led street light 150w",
      "150 watt led street light",
      "solar street light 150w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a061a8b15bde2d27dddf2f: {
    title: "200W LED Street Light | Energy Efficient Street Lighting | Nessa",
    description:
      "Shop 200 watt LED street lights for energy-efficient outdoor lighting. Nessa’s 200W LED and solar street lighting suits roads, highways, and industrial areas.",
    keywords: [
      "led street light 200w",
      "200 watt led street light",
      "solar street light 200w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a06385b15bde2d27dddf4c: {
    title: "250W LED Street Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Discover 250 watt LED street lights for energy-efficient, bright outdoor lighting. Nessa’s 250W LED and solar street lighting is ideal for roads and industrial areas.",
    keywords: [
      "led street light 250w",
      "250 watt led street light",
      "solar street light 250w",
      "energy efficient street light",
      "led street lighting",
    ],
  },

  slug67a06781b15bde2d27dddf6b: {
    title: "30W LED Flood Light | Outdoor Energy Efficient Lighting | Nessa",
    description:
      "Explore 30 watt LED flood lights for energy-efficient outdoor lighting. Nessa’s 30W LED flood lighting offers bright, reliable illumination for outdoor spaces.",
    keywords: [
      "led flood light 30w",
      "30 watt led flood light",
      "outdoor led flood lights",
      "energy efficient flood lights",
      "led flood lighting",
    ],
  },

  slug67a06899b15bde2d27dddf8a: {
    title: "45W LED Flood Light | Outdoor Energy Efficient Lighting | Nessa",
    description:
      "Shop 45 watt LED flood lights for energy-efficient outdoor lighting. Nessa’s 45W LED flood lighting provides bright, durable illumination for outdoor spaces.",
    keywords: [
      "led flood light 45w",
      "45 watt led flood light",
      "outdoor led flood lights",
      "energy efficient flood lights",
      "led flood lighting",
    ],
  },

  slug67a069feb15bde2d27dddfa9: {
    title: "60W LED Flood Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Discover 60 watt LED flood lights for energy-efficient outdoor lighting. Nessa’s 60W LED flood lighting ensures bright, reliable illumination for outdoor areas.",
    keywords: [
      "led flood light 60w",
      "60 watt led flood light",
      "outdoor led flood lights",
      "energy efficient flood lights",
      "led flood lighting",
    ],
  },


  slug67a06b67b15bde2d27dde131: {
    title: "75W LED Flood Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Shop 75 watt LED flood lights for energy-efficient outdoor lighting. Nessa’s 75W LED flood lighting offers bright, durable illumination for outdoor spaces.",
    keywords: [
      "led flood light 75w",
      "75 watt led flood light",
      "outdoor led flood lights",
      "energy efficient flood lights",
      "led flood lighting",
    ],
  },

  slug67a06de88b7ec7560fa0aa75: {
    title: "100W LED Flood Light | Energy Efficient Outdoor Lighting | Nessa",
    description:
      "Buy 100 watt LED flood lights for energy-efficient outdoor lighting. Nessa’s 100W LED flood lighting ensures bright, reliable illumination for outdoor spaces.",
    keywords: [
      "led flood light 100w",
      "100 watt led flood light",
      "outdoor led flood lights",
      "energy efficient flood lights",
      "led flood lighting",
    ],
  },


  slug67a06f2b8b7ec7560fa0abf6: {
    title: "120W LED Floodlight | Outdoor Energy Efficient Lighting | Nessa",
    description:
      "Discover 120W LED floodlights for energy-efficient, waterproof outdoor lighting. Nessa’s LED floodlights deliver bright, reliable illumination for outdoor areas.",
    keywords: [
      "LED Floodlight",
      "Outdoor Floodlight",
      "Energy Efficient",
      "Waterproof Floodlight",
      "Nessa Floodlight",
    ],
  },

  slug67a08b448b7ec7560fa0e208: {
    title: "150W LED Floodlight | Outdoor Energy Efficient Lighting | Nessa",
    description:
      "Shop 150W LED floodlights for waterproof, energy-efficient outdoor lighting. Nessa’s high luminous efficacy LED floodlights ensure bright, reliable illumination.",
    keywords: [
      "LED Floodlight",
      "Outdoor Floodlight",
      "Energy Efficient",
      "Waterproof Floodlight",
      "High Luminous Efficacy",
    ],
  },


  slug67a08d278b7ec7560fa0e230: {
    title: "200W LED Floodlight | Outdoor High Luminous Lighting | Nessa",
    description:
      "Explore 200W LED floodlights for waterproof, energy-efficient outdoor lighting. Nessa’s high luminous efficacy LED floodlights provide bright, reliable illumination.",
    keywords: [
      "LED Floodlight",
      "Outdoor Floodlight",
      "High Luminous Efficacy",
      "Waterproof Floodlight",
      "Nessa Floodlight",
    ],
  },


  slug67a093068b7ec7560fa0e49f: {
    title: "250W LED Floodlight | High Lumen Outdoor Waterproof Light | Nessa",
    description:
      "Discover 250W LED floodlights for waterproof, high lumen outdoor lighting. Nessa’s industrial LED floodlights deliver bright, energy-efficient illumination.",
    keywords: [
      "LED Floodlight",
      "Outdoor LED Floodlight",
      "Waterproof LED Floodlight",
      "High Lumen LED Floodlight",
      "Industrial LED Floodlight",
    ],
  },


  slug67a095be8b7ec7560fa0e4ba: {
    title: "300W LED Floodlight | High Lumen Outdoor Waterproof Light | Nessa",
    description:
      "Explore 300W LED floodlights for waterproof, high lumen outdoor lighting. Nessa’s industrial LED floodlights provide bright, energy-efficient illumination.",
    keywords: [
      "LED Floodlight",
      "Outdoor LED Floodlight",
      "Waterproof LED Floodlight",
      "High Lumen LED Floodlight",
      "Industrial LED Floodlight",
    ],
  },

  slug67a095be8b7ec7560fa0e4ba: {
    title: "300W LED Floodlight | High Lumen Outdoor Waterproof Light | Nessa",
    description:
      "Shop 300W LED floodlights for high lumen, waterproof outdoor lighting. Nessa’s industrial LED floodlights deliver bright, energy-efficient illumination for large areas.",
    keywords: [
      "LED Floodlight",
      "Outdoor LED Floodlight",
      "Waterproof LED Floodlight",
      "High Lumen LED Floodlight",
      "Industrial LED Floodlight",
    ],
  },

  slug67a0984b8b7ec7560fa0e4db: {
    title: "350W LED Floodlight | Industrial Outdoor Waterproof Lighting | Nessa",
    description:
      "Discover 350W LED floodlights for high lumen, waterproof outdoor lighting. Nessa’s industrial LED floodlights offer bright, energy-efficient illumination.",
    keywords: [
      "350W LED Floodlight",
      "Outdoor LED Floodlight",
      "Waterproof LED Floodlight",
      "High Lumen LED Floodlight",
      "Industrial LED Floodlight",
    ],
  },

  slug67a09ae88b7ec7560fa0e4f6: {
    title: "400W LED Floodlight | High Power Outdoor Waterproof Light | Nessa",
    description:
      "Explore 400W LED floodlights for high power, waterproof outdoor lighting. Nessa’s LED floodlights deliver bright, energy-efficient illumination for large spaces.",
    keywords: [
      "LED Floodlight",
      "400W LED Floodlight",
      "Outdoor LED Floodlight",
      "Waterproof LED Floodlight",
      "High Power LED Floodlight",
    ],
  },

  slug67a09ae88b7ec7560fa0e4f6: {
    title: "400W LED Floodlight | Industrial Outdoor Waterproof Lighting | Nessa",
    description:
      "Shop 400W LED floodlights for high lumen, waterproof outdoor lighting. Nessa’s industrial LED floodlights deliver bright, energy-efficient illumination for large areas.",
    keywords: [
      "LED Floodlight",
      "Outdoor LED Floodlight",
      "Waterproof LED Floodlight",
      "High Lumen LED Floodlight",
      "Industrial LED Floodlight",
    ],
  },

  slug67a09ccf8b7ec7560fa0e511: {
    title: "500W LED Floodlight | Outdoor IP65 High Power Lighting | Nessa",
    description:
      "Shop 500W LED floodlights for outdoor, IP65 waterproof lighting. Nessa’s 500W LED floodlights deliver bright, energy-efficient illumination for large outdoor areas.",
    keywords: [
      "500W LED flood light",
      "500W flood light",
      "500 watt LED floodlight price",
      "outdoor LED flood light 500W",
      "IP65 LED flood light 500W",
    ],
  },

  slug67a0a3698b7ec7560fa0e537: {
    title: "50W Baylight LED Floodlight | Outdoor IP65 Lighting | Nessa",
    description:
      "Explore 50W Baylight LED floodlights with IP65 rating for outdoor lighting. Nessa’s 50W LED floodlights provide bright, energy-efficient illumination for various spaces.",
    keywords: [
      "50W baylight LED flood light",
      "50W flood light",
      "50W LED floodlight price",
      "outdoor LED flood light 50W",
      "IP65 50W baylight LED flood light",
    ],
  },

  slug67a0a7418b7ec7560fa0e54f: {
    title: "60W Baylight LED Floodlight | Outdoor IP65 Lighting | Nessa",
    description:
      "Discover 60W Baylight LED floodlights with IP65 waterproof design. Nessa’s 60W LED floodlights provide bright, energy-efficient outdoor illumination for diverse spaces.",
    keywords: [
      "60W baylight LED flood light",
      "60W flood light",
      "60W LED floodlight price",
      "outdoor LED flood light 60W",
      "IP65 60W baylight LED flood light",
    ],
  },

  slug67a06b67b15bde2d27dde131: {
    title: "75W LED Floodlight | Outdoor IP65 Energy Saving Light | Nessa",
    description:
      "Explore 75W LED floodlights with IP65 rating for outdoor use. Nessa’s 75W LED floodlights offer bright, energy-efficient lighting for gardens, pathways, and spaces.",
    keywords: [
      "75W LED flood light",
      "75W flood light",
      "75W LED floodlight price",
      "outdoor LED flood light 75W",
      "IP65 75W LED flood light",
    ],
  },


  slug67a0aa468b7ec7560fa0e70b: {
    title: "100W Baylight LED Floodlight | Outdoor IP65 Lighting | Nessa",
    description:
      "Shop 100W Baylight LED floodlights with IP65 waterproof design. Nessa’s 100W LED floodlights deliver bright, energy-efficient outdoor lighting for industrial needs.",
    keywords: [
      "100W baylight LED flood light",
      "100W flood light",
      "100W LED floodlight price",
      "outdoor LED flood light 100W",
      "IP65 100W baylight LED flood light",
    ],
  },


  slug67a0abca8b7ec7560fa0e723: {
    title: "120W Baylight LED Floodlight | Outdoor IP65 LED Lighting | Nessa",
    description:
      "Discover 120W Baylight LED floodlights with IP65 rating for outdoor use. Nessa’s 120W LED floodlights offer bright, energy-efficient lighting for large spaces.",
    keywords: [
      "120W baylight LED flood light",
      "120W flood light",
      "120W LED floodlight price",
      "outdoor LED flood light 120W",
      "IP65 120W baylight LED flood light",
    ],
  },


  slug67a0af7a8b7ec7560fa0e82c: {
    title: "150W Baylight LED Floodlight | Outdoor IP65 Lighting | Nessa",
    description:
      "Buy 150W Baylight LED floodlights with IP65 waterproof rating. Nessa’s 150W LED floodlights deliver powerful, energy-efficient lighting for outdoor and industrial areas.",
    keywords: [
      "150W baylight LED flood light",
      "150W flood light",
      "150W LED floodlight price",
      "outdoor LED flood light 150W",
      "IP65 150W baylight LED flood light",
    ],
  },


  slug67a0b09c8b7ec7560fa0e876: {
    title: "200W Baylight LED Floodlight | IP65 Outdoor Lighting | Nessa",
    description:
      "Get 200W Baylight LED floodlights for outdoor and industrial use. IP65-rated for durability, these LED floodlights provide high lumen, energy-efficient bright lighting.",
    keywords: [
      "200W baylight LED flood light",
      "200W flood light",
      "200W LED floodlight price",
      "outdoor LED flood light 200W",
      "IP65 200W baylight LED flood light",
    ],
  },


  slug67a0b4618b7ec7560fa0ec41: {
    title: "60W Baylight LED Floodlight | IP65 Outdoor Lighting | Nessa",
    description:
      "Shop 60W Baylight LED floodlights for outdoor spaces. IP65-rated for durability, these LED lights offer energy-efficient, bright illumination for all environments.",
    keywords: [
      "60W baylight LED flood light",
      "60W flood light",
      "60W LED floodlight price",
      "outdoor LED flood light 60W",
      "IP65 60W baylight LED flood light",
    ],
  },


  slug67a0b6858b7ec7560fa0eddd: {
    title: "20W Wellglass LED Floodlight | IP65 Outdoor Lighting | Nessa",
    description:
      "Discover 20W Wellglass LED floodlights for outdoor use. IP65-rated, energy-efficient lighting ideal for bright, durable illumination in various environments.",
    keywords: [
      "20W wellglass LED flood light",
      "20W flood light",
      "20W LED floodlight price",
      "outdoor LED flood light 20W",
      "IP65 20W wellglass LED flood light",
    ],
  },


  slug67a0bad38b7ec7560fa0ef6f: {
    title: "30W Wellglass LED Floodlight | Outdoor IP65 Lighting | Nessa",
    description:
      "Explore 30W Wellglass LED floodlights for outdoor areas. IP65-rated, energy-efficient, durable lighting for bright and consistent illumination in any environment.",
    keywords: [
      "30W wellglass LED flood light",
      "30W flood light",
      "30W LED floodlight price",
      "outdoor LED flood light 30W",
      "IP65 30W wellglass LED flood light",
    ],
  },


  slug67a0bc328b7ec7560fa0ef85: {
    title: "40W Wellglass LED Floodlight | Outdoor IP65 LED Lighting | Nessa",
    description:
      "Shop 40W Wellglass LED floodlights for outdoor use. IP65-rated, energy-efficient, durable lighting delivering bright illumination for industrial and outdoor areas.",
    keywords: [
      "40W wellglass LED flood light",
      "40W flood light",
      "40W LED floodlight price",
      "outdoor LED flood light 30W",
      "IP65 40W wellglass LED flood light",
    ],
  },


  slug67a0bda58b7ec7560fa0efb0: {
    title: "60W Wellglass LED Floodlight | Outdoor IP65 LED Lighting | Nessa",
    description:
      "Discover 60W Wellglass LED floodlights for outdoor use. IP65-rated, energy-efficient, bright, and durable lighting ideal for industrial and outdoor environments.",
    keywords: [
      "60W wellglass LED flood light",
      "60W flood light",
      "60W LED floodlight price",
      "outdoor LED flood light 60W",
      "IP65 60W wellglass LED flood light",
    ],
  },

  slug67a0beb48b7ec7560fa0efdc: {
    title: "75W Wellglass LED Floodlight | IP65 Outdoor LED Lighting | Nessa",
    description:
      "Explore 75W Wellglass LED floodlights with IP65 waterproof rating. Energy-efficient, bright, and durable lighting for outdoor and industrial applications.",
    keywords: [
      "75W wellglass LED flood light",
      "75W flood light",
      "75W LED floodlight price",
      "outdoor LED flood light 75W",
      "IP65 75W wellglass LED flood light",
    ],
  },

  slug67a0c7e58b7ec7560fa0f20b: {
    title: "24W Fission Series LED Street Light | IP65 Outdoor Lighting | Nessa",
    description:
      "Discover 24W Fission Series LED street lights with IP65 rating for outdoor use. Energy-efficient, durable, and bright lighting for streets and pathways.",
    keywords: [
      "24W fission series street light",
      "24W street light",
      "24W street light price",
      "outdoor LED street light 24W",
      "IP65 24W fission series street light",
    ],
  },


  slug67a0c9628b7ec7560fa0f224: {
    title: "30W Fission Series LED Street Light | IP65 Outdoor Lighting |Nessa",
    description:
      "Explore 30W Fission Series LED street lights with IP65 waterproof design. Ideal for outdoor, energy-efficient lighting for streets and pathways.",
    keywords: [
      "30W fission series street light",
      "30W street light",
      "30W street light price",
      "outdoor LED street light 30W",
      "IP65 30W fission series street light",
    ],
  },


  slug67a0caab8b7ec7560fa0f23e: {
    title: "36W Fission Series LED Street Light | Outdoor IP65 Lighting | Nessa",
    description:
      "Discover 36W Fission Series LED street lights with IP65 waterproof rating, ideal for outdoor energy-efficient lighting in streets, parks, and pathways.",
    keywords: [
      "36W fission series street light",
      "36W street light",
      "36W street light price",
      "outdoor LED street light 36W",
      "IP65 36W fission series street light",
    ],
  },


  slug67a1c9d6779058ba5bb865da: {
    title: "50W Fission Series LED Street Light | IP65 Outdoor Lighting | Nessa",
    description:
      "Explore 50W Fission Series LED street lights with IP65 waterproof design, perfect for outdoor energy-efficient lighting for roads, parks, and pathways.",
    keywords: [
      "50W fission series street light",
      "50W street light",
      "50W street light price",
      "outdoor LED street light 50W",
      "IP65 50W fission series street light",
    ],
  },

  slug67a1cb3f779058ba5bb865f3: {
    title: "60W Fission Series LED Street Light | Outdoor IP65 Lighting | Nessa",
    description:
      "Discover 60W Fission Series LED street lights with IP65 protection, offering energy-efficient outdoor lighting for streets, parks, and pathways at the best price.",
    keywords: [
      "60W fission series street light",
      "60W street light",
      "60W street light price",
      "outdoor LED street light 60W",
      "IP65 60W fission series street light",
    ],
  },


  slug67a1cc73779058ba5bb8660c: {
    title: "75W Fission LED Street Light | IP65 Outdoor Lighting India | Nessa",
    description:
      "Buy 75W Fission Series LED street lights with IP65 rating for reliable outdoor lighting. Energy-efficient, durable, and ideal for roads, parks, and pathways.",
    keywords: [
      "75W fission series street light",
      "75W street light",
      "75W street light price",
      "outdoor LED street light 75W",
      "IP65 75W fission series street light",
    ],
  },

  slug67a1cdad779058ba5bb86790: {
    title: "90W Fission LED Street Light | Outdoor IP65 Lighting India | Nessa",
    description:
      "Shop 90W Fission Series LED street lights with IP65 waterproof design. Energy-efficient outdoor lighting for streets, parks, and pathways in India.",
    keywords: [
      "90W fission series street light",
      "90W street light",
      "90W street light price",
      "outdoor LED street light 90W",
      "IP65 90W fission series street light",
    ],
  },

  slug67a1ceed779058ba5bb867a9: {
    title: "120W Fission LED Street Light | IP65 Outdoor Lighting India | Nessa",
    description:
      "Discover 120W Fission Series LED street lights with IP65 rating. Durable, energy-efficient outdoor lighting perfect for streets and public areas in India.",
    keywords: [
      "120W fission series street light",
      "120W street light",
      "120W street light price",
      "outdoor LED street light 120W",
      "IP65 120W fission series street light",
    ],
  },


  slug67a1d29ed43db9ad31aa2ba5: {
    title: "150W Fission LED Street Light | IP65 Outdoor LED Lighting India | Nessa",
    description:
      "Explore 150W Fission Series LED street lights with IP65 protection. Energy-efficient and durable outdoor lighting ideal for streets and public spaces in India.",
    keywords: [
      "150W fission series street light",
      "150W street light",
      "150W street light price",
      "outdoor LED street light 150W",
      "IP65 150W fission series street light",
    ],
  },


  slug67a1e37bd43db9ad31aa511d: {
    title: "24W LED Surface Light IP65 | Outdoor Energy Efficient Lighting India | Nessa",
    description:
      "Discover 24W LED surface lights with IP65 rating for durable outdoor use. Energy-efficient and reliable surface lighting solution perfect for India’s outdoor needs.",
    keywords: [
      "24W surface light",
      "24W LED surface light",
      "24W surface light price",
      "outdoor LED surface light 24W",
      "IP65 24W surface light",
    ],
  },

  slug67a1e59dd43db9ad31aa520e: {
    title: "40W LED Square Panel Light IP65 | Indoor Energy Efficient Lighting | Nessa",
    description:
      "Shop 40W LED square panel lights with IP65 rating for indoor use. Energy-efficient, durable, and cost-effective lighting solution perfect for modern interiors.",
    keywords: [
      "40W square panel light",
      "40W LED square panel light",
      "40W square panel light price",
      "indoor LED square panel light 40W",
      "IP65 40W square panel light",
    ],
  },



  slug67a1e9f3d43db9ad31aa5224: {
    title: "28W LED Square Panel Light IP65 | Indoor Energy Efficient Light | Nessa",
    description:
      "Discover 28W LED square panel lights with IP65 rating for indoor spaces. Energy-saving and durable lighting solution ideal for offices, homes, and commercial areas.",
    keywords: [
      "28W square panel light",
      "28W LED square panel light",
      "28W square panel light price",
      "indoor LED square panel light 28W",
      "IP65 28W square panel light",
    ],
  },


  slug67a1eb39d43db9ad31aa5231: {
    title: "36W LED Square Panel Light IP65 | Indoor Energy Efficient Light | Nessa",
    description:
      "Explore 36W LED square panel lights with IP65 protection for indoor use. Energy-efficient and reliable lighting perfect for offices, commercial, and residential spaces.",
    keywords: [
      "36W square panel light",
      "36W LED square panel light",
      "36W square panel light price",
      "indoor LED square panel light 36W",
      "IP65 36W square panel light",
    ],
  },

  slug67a1ed59d43db9ad31aa5300: {
    title: "9W LED Surface Light Square | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Discover the 9W square LED surface light with IP65 rating. Perfect for indoor spaces, energy-efficient and durable lighting solution ideal for homes and offices.",
    keywords: [
      "9W LED surface light",
      "9W surface light price",
      "indoor LED surface light 9W",
      "IP65 9W LED surface light",
      "9W square surface light",
    ],
  },

  slug67a1ef07d43db9ad31aa531d: {
    title: "6W LED Surface Light Square | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Shop 6W square LED surface light with IP65 protection. Ideal for indoor use, this energy-efficient light provides bright, durable illumination for homes and offices.",
    keywords: [
      "6W square LED surface light",
      "6W LED surface light",
      "6W surface light price",
      "indoor LED surface light 6W",
      "IP65 6W LED surface light",
    ],
  },


  slug67a1f434d43db9ad31aa532e: {
    title: "12W Square LED Surface Light | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Explore 12W square LED surface light with IP65 rating for indoor use. Energy-efficient and durable, perfect for brightening homes, offices, and commercial spaces.",
    keywords: [
      "12W square LED surface light",
      "12W LED surface light",
      "12W surface light price",
      "indoor LED surface light 12W",
      "IP65 12W square surface light",
    ],
  },


  slug67a1f5b0d43db9ad31aa5342: {
    title: "15W Square LED Surface Light | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Shop 15W square LED surface light with IP65 protection for indoor use. Energy-saving and reliable, ideal for homes, offices, and commercial lighting needs.",
    keywords: [
      "15W square LED surface light",
      "15W LED surface light",
      "15W surface light price",
      "indoor LED surface light 15W",
      "IP65 15W square surface light",
    ],
  },


  slug67a1f867d43db9ad31aa5372: {
    title: "18W Square LED Surface Light | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Buy 18W square LED surface light with IP65 rating for indoor use. Energy-efficient and durable lighting solution perfect for offices, homes, and commercial spaces.",
    keywords: [
      "18W square LED surface light",
      "18W LED surface light",
      "18W surface light price",
      "indoor LED surface light 18W",
      "IP65 18W square surface light",
    ],
  },

  slug67a1fa65d43db9ad31aa5380: {
    title: "24W Square LED Surface Light | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Shop 24W square LED surface light with IP65 protection for indoor use. Energy-saving and reliable lighting ideal for offices, commercial areas, and homes.",
    keywords: [
      "24W square LED surface light",
      "24W LED surface light",
      "24W surface light price",
      "indoor LED surface light 24W",
      "IP65 24W square surface light",
    ],
  },


  slug67a20a4cd43db9ad31aa5679: {
    title: "9W LED Round Panel Light | Indoor IP65 Energy Efficient Lighting | Nessa",
    description:
      "Discover 9W LED round panel light with IP65 rating for indoor use. Perfect for energy-efficient lighting in homes, offices, and commercial spaces. Durable & cost-effective.",
    keywords: [
      "9W round panel light",
      "9W LED round panel light",
      "9W round panel light price",
      "indoor LED round panel light 9W",
      "IP65 9W round panel light",
    ],
  },


  slug67a20ba0d43db9ad31aa57f2: {
    title: "6W LED Round Panel Light | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Shop 6W LED round panel light with IP65 rating for indoor spaces. Enjoy energy-efficient, bright, and durable lighting for homes and offices at the best price.",
    keywords: [
      "6W round panel light",
      "6W LED round panel light",
      "6W round panel light price",
      "indoor LED round panel light 6W",
      "IP65 6W round panel light",
    ],
  },


  slug67a20ce7d43db9ad31aa5801: {
    title: "12W LED Round Panel Light | Indoor IP65 Energy Saving Light | Nessa",
    description:
      "Discover 12W LED round panel light with IP65 rating for indoor use. Bright, energy-saving, and durable lighting for homes and offices at competitive prices.",
    keywords: [
      "12W round panel light",
      "12W LED round panel light",
      "12W round panel light price",
      "indoor LED round panel light 12W",
      "IP65 12W round panel light",
    ],
  },

  slug67a20db6d43db9ad31aa5814: {
    title: "15W LED Round Panel Light | Indoor IP65 Energy Efficient Light | Nessa",
    description:
      "Get 15W LED round panel light for indoor spaces. IP65, energy-efficient, and bright lighting solution for homes, offices, and shops at a competitive price.",
    keywords: [
      "15W round panel light",
      "15W LED round panel light",
      "15W round panel light price",
      "indoor LED round panel light 15W",
      "IP65 15W round panel light",
    ],
  },

  slug67a20e92d43db9ad31aa5af5: {
    title: "18W LED Round Panel Light | IP65 Indoor Energy Efficient Light | Nessa",
    description:
      "Buy 18W LED round panel light for indoor use. IP65 rated, energy-efficient, and bright lighting for homes, offices, and shops at a competitive price from Nessa.",
    keywords: [
      "18W LED round panel light",
      "18W round panel light",
      "18W LED panel light price",
      "indoor LED round panel light 18W",
      "IP65 18W LED round panel light",
    ],
  },


  slug67a20f7dd43db9ad31aa5b0b: {
    title: "24W LED Round Panel Light | IP65 Indoor Energy Saving Lighting | Nessa",
    description:
      "Shop 24W LED round panel light for indoor spaces. IP65 rated, energy-efficient, bright lighting for homes, offices, and retail. Check competitive prices at Nessa.",
    keywords: [
      "24W LED round panel light",
      "24W round panel light",
      "24W LED panel light price",
      "indoor LED round panel light 24W",
      "IP65 24W LED round panel light",
    ],
  },

  slug67a2127dd43db9ad31aa5b18: {
    title: "9W LED Spike Light | Outdoor Waterproof Garden Lighting IP65 | Nessa",
    description:
      "Buy 9W LED spike light for gardens and landscapes. Outdoor waterproof, IP65 rated, energy-efficient garden lighting. Perfect for pathways and lawns from Nessa.",
    keywords: [
      "9W LED spike light",
      "outdoor LED spike light",
      "garden spike light",
      "waterproof LED spike light",
      "IP65 LED spike light",
    ],
  },

  slug67a21465d43db9ad31aa5cb0: {
    title: "12W LED Downlight | Square Recessed Ceiling Light India | Nessa",
    description:
      "Shop 12W LED downlight for energy-efficient lighting. Square recessed ceiling light, IP44 rated, ideal for modern interiors. Buy LED downlights online in India.",
    keywords: [
      "12w led downlight",
      "led recessed ceiling light",
      "square led downlight india",
      "energy efficient downlight",
      "ip44 led downlight",
    ],
  },

  slug67a21d00d43db9ad31aa5cca: {
    title: "12W LED Tube Light India | T8 Energy Efficient Tubelight | Nessa",
    description:
      "Buy 12W LED tube light online in India. T8 energy-efficient LED tubelight for bright, long-lasting lighting at the best price. Upgrade to LED tube lights now.",
    keywords: [
      "led tube light india",
      "12w led tube light",
      "t8 led tube light",
      "led tubelight price",
      "energy efficient tube light",
    ],
  },

  slug67a22032d43db9ad31aa5ce6: {
    title: "18W LED Driver Price India | AC Constant Current Power Driver | Nessa",
    description:
      "Buy 18W LED driver online in India. AC constant current LED power driver for reliable performance and energy efficiency. Explore 18W LED driver price and details now.",
    keywords: [
      "18w led driver",
      "ac driver 18w",
      "led power driver 18w",
      "18w led driver price india",
      "constant current led driver 18w",
    ],
  },

  slug67a22111d43db9ad31aa5cf6: {
    title: "35W LED Driver Price India | AC Constant Current Power Driver | Nessa",
    description:
      "Get 35W LED driver in India for reliable LED lighting. AC constant current power driver ensures energy efficiency. Check 35W LED driver price and specifications online.",
    keywords: [
      "35w led driver",
      "ac driver 35w",
      "led power driver 35w",
      "35w led driver price india",
      "constant current led driver 35w",
    ],
  },

  slug67a22201d43db9ad31aa5d0c: {
    title: "45W LED Driver Price India | AC Constant Current LED Driver | Nessa",
    description:
      "Buy 45W LED driver in India for efficient LED lighting. AC constant current LED driver ensures stable performance. Check 45W LED driver price and details online.",
    keywords: [
      "45w led driver",
      "ac driver 45w",
      "led power driver 45w",
      "45w led driver price india",
      "constant current led driver 45w",
    ],
  },


  slug67a222dad43db9ad31aa5d1a: {
    title: "6W LED Driver Price India | AC Constant Current LED Driver | Nessa",
    description:
      "Buy 6W LED driver in India for stable LED lighting. AC constant current LED power driver ensures reliability. Check 6W LED driver price and specs online now.",
    keywords: [
      "6w led driver",
      "ac driver 6w",
      "led power driver 6w",
      "6w led driver price india",
      "constant current led driver 6w",
    ],
  },

  slug67a22394d43db9ad31aa5d29: {
    title: "80W LED Driver Price India | Constant Current DAC LED Driver | Nessa",
    description:
      "Buy 80W DAC LED driver in India for stable, energy-efficient lighting. Get AC constant current 80W LED driver details, specs, and best price online today.",
    keywords: [
      "80w led driver",
      "80w ac driver",
      "dac led driver 80w",
      "80w led driver price india",
      "constant current 80w led driver",
    ],
  },

  slug67a2259bd43db9ad31aa5d39: {
    title: "120W LED Driver Price India | Constant Current DAC Driver | Nessa",
    description:
      "Buy 120W DAC LED driver in India for stable, energy-efficient lighting. Explore AC constant current 120W LED driver specs and get the best price online now.",
    keywords: [
      "120w led driver",
      "120w ac driver",
      "dac led driver 120w",
      "120w led driver price india",
      "constant current 120w led driver",
    ],
  },

  slug67a2fedcd43db9ad31aa69fc: {
    title: "10kA Surge Protection Device India | SPD for Home & Industry | Nessa",
    description:
      "Buy 10kA SPD in India for home and industrial safety. Get reliable electrical surge protection devices to safeguard appliances and systems from voltage spikes.",
    keywords: [
      "surge protection device india",
      "spd 10ka",
      "10kA surge protector",
      "surge protection for home",
      "electrical surge protector spd",
    ],
  },


  slug67a2ffcfd43db9ad31aa6ad0: {
    title: "20kA Surge Protection Device India | Industrial SPD Solutions | Nessa",
    description:
      "Get 20kA SPD in India for industrial and electrical protection. Reliable surge protection devices to safeguard equipment from voltage surges and power spikes effectively.",
    keywords: [
      "surge protection device india",
      "spd 20ka",
      "20kA surge protector",
      "industrial surge protector india",
      "electrical surge protection 20ka",
    ],
  },


  slug67a30253d43db9ad31aa6ade: {
    title: "15W DC LED Driver India | Constant Voltage LED Power Driver | Nessa",
    description:
      "Shop 15W DC LED drivers in India for stable, constant voltage power delivery. Reliable 15W LED power drivers at the best price for energy-efficient LED lighting systems.",
    keywords: [
      "15w dc led driver",
      "dc led driver 15w",
      "15w led power driver",
      "15w dc driver price india",
      "constant voltage dc led driver 15w",
    ],
  },

  slug67a3043bd43db9ad31aa6aec: {
    title: "30W DC LED Driver India | Constant Voltage LED Power Driver | Nessa",
    description:
      "Get 30W DC LED drivers in India for reliable, constant voltage power. Ideal 30W LED power drivers ensuring energy efficiency for advanced LED lighting system needs.",
    keywords: [
      "30w dc led driver",
      "dc led driver 30w",
      "30w led power driver",
      "30w dc driver price india",
      "constant voltage 30w led driver",
    ],
  },

  slug67a30725d43db9ad31aa6aff: {
    title: "25W DC LED Driver India | Constant Voltage LED Power Driver | Nessa",
    description:
      "Buy 25W DC LED driver in India for stable, constant voltage LED power. Energy-efficient 25W LED drivers ideal for advanced lighting system performance and reliability.",
    keywords: [
      "25w dc led driver",
      "dc led driver 25w",
      "25w led power driver",
      "25w dc driver price india",
      "constant voltage 25w led driver",
    ],
  },

  slug67a30851d43db9ad31aa6c8c: {
    title: "20A MPPT Solar Charge Controller India | 20 Amp Solar Controller | Nessa",
    description:
      "Buy 20A MPPT solar charge controller in India for efficient charging. Affordable 20 amp MPPT controller for stable, reliable solar power system performance.",
    keywords: [
      "20a mppt solar charge controller",
      "mppt solar controller 20a",
      "solar charge controller india",
      "20 amp mppt controller price",
      "solar mppt charge controller 20a",
    ],
  },

  slug67a30b2cd43db9ad31aa6ca1: {
    title: "24V 20A MPPT Solar Charge Controller | Solar Controller India | Nessa",
    description:
      "Shop 24V 20A MPPT solar charge controller in India for reliable solar systems. Get stable, efficient charging with our 24V MPPT charge controller at best price.",
    keywords: [
      "24v 20a mppt solar charge controller",
      "mppt solar charge controller 24v",
      "20a solar mppt controller india",
      "24v mppt charge controller price",
      "solar charge controller 24v 20a",
    ],
  },


  slug67a30c6cd43db9ad31aa6cad: {
    title: "15A Solar Charge Controller 12V/24V | PV Controller India | Nessa",
    description:
      "Buy 15A solar charge controller 12V/24V in India for stable PV charging. Get reliable solar charge controller at best price for your solar power systems.",
    keywords: [
      "15a solar charge controller india",
      "12v 15a solar charge controller",
      "24v solar charge controller 15a",
      "solar pv charge controller 15a",
      "solar charge controller price india",
    ],
  },


  slug67a30d7dd43db9ad31aa6cba: {
    title: "10A Solar Charge Controller 12V/24V | PV Controller India | Nessa",
    description:
      "Shop 10A solar charge controller 12V/24V for efficient PV charging. Get reliable solar charge controller at best price in India for your solar power needs.",
    keywords: [
      "10a solar charge controller india",
      "12v 10a solar charge controller",
      "24v solar charge controller 10a",
      "solar charge controller 10 amp price",
      "solar pv charge controller 10a",
    ],
  },


  slug67a30efed43db9ad31aa6cc8: {
    title: "15W MPPT Solar Charge Controller Combo | Solar Combo India | Nessa",
    description:
      "Buy 15W MPPT solar charge controller combo for efficient solar charging. Get compact, reliable 15W solar MPPT combo at the best price in India for your setup.",
    keywords: [
      "15w mppt solar combo india",
      "mppt solar charge combo 15w",
      "15w solar controller combo",
      "solar mppt combo price india",
      "15w mppt combo solar controller",
    ],
  },

  slug67a3106bd43db9ad31aa6cd7: {
    title: "30W PWM Solar Charge Controller Combo | Solar Combo India | Nessa",
    description:
      "Get a 30W PWM solar charge controller combo for stable, efficient charging. Shop 30W solar PWM combo at the best price in India for your solar power needs.",
    keywords: [
      "30w pwm solar controller combo",
      "pwm solar charge controller 30w",
      "30w solar controller combo india",
      "solar pwm combo price india",
      "30w pwm charge controller combo",
    ],
  },

  slug67a31276d43db9ad31aa6d22: {
    title: "25W Solar Charge Controller | PWM Solar Controller India | Nessa",
    description:
      "Buy a 25W PWM solar charge controller for stable solar PV management. Explore 25W solar controllers and regulators for efficient solar power use in India.",
    keywords: [
      "25w solar controller india",
      "solar charge controller 25w",
      "25w pwm solar controller",
      "solar pv controller 25w",
      "25w solar regulator india",
    ],
  },

  slug67a31443d43db9ad31aa6d32: {
    title: "18W Solar Charge Controller | PWM Solar Controller India | Nessa",
    description:
      "Get 18W PWM solar charge controllers for efficient solar PV systems. Buy 18W solar regulators for stable solar power management and energy savings in India.",
    keywords: [
      "18w solar controller india",
      "solar charge controller 18w",
      "18w pwm solar controller",
      "solar pv controller 18w",
      "18w solar regulator india",
    ],
  },


  slug67a31564d43db9ad31aa6d43: {
    title: "15W Solar Charge Controller | PWM Solar Controller India | Nessa",
    description:
      "Buy 15W PWM solar charge controllers for stable solar PV systems. Get efficient 15W solar regulators for effective solar power management and energy savings in India.",
    keywords: [
      "15w solar controller india",
      "15w pwm solar controller",
      "solar charge controller 15w",
      "solar pv controller 15w",
      "15w solar regulator india",
    ],
  },

  slug67a3161dd43db9ad31aa6d63: {
    title: "Motion Sensor Light India | PIR Motion Detector & Switch | Nessa",
    description:
      "Shop PIR motion sensor lights, motion sensor switches, and wireless motion detectors for home and office security in India. Enhance safety with smart sensing.",
    keywords: [
      "motion sensor light india",
      "pir motion sensor",
      "motion sensor switch",
      "motion detector sensor",
      "wireless motion sensor india",
    ],
  },

  slug67a3176ad43db9ad31aa6d73: {
    title: "D2D Motion Sensor Door Detector for Security | Wireless PIR Motion Sensor India | Nessa",
    description:
      "Discover Nessa’s D2D motion sensor door detectors, wireless PIR motion sensors, and automation solutions for homes and businesses in India. Reliable, energy-efficient detection for safety.",
    keywords: [
      "motion sensor door detector",
      "door motion sensor india",
      "d2d motion sensor light",
      "wireless door motion sensor",
      "pir motion sensor door",
    ],
  },

  slug67a32b30d43db9ad31aa7350: {
    title: "12W Integrated Solar LED Street Light in India | Nessa",
    description:
      "Explore Nessa’s 12W integrated solar LED street lights for energy-efficient outdoor lighting in India. Wireless design, durable build, and best price for streets, pathways, and community areas.",
    keywords: [
      "12w solar street light india",
      "integrated solar street light 12w",
      "solar led street light 12w price",
      "12w solar street lamp",
      "wireless solar street light 12w",
    ],
  },

  slug67a32c68d43db9ad31aa7362: {
    title: "15W All-in-One Solar LED Street Light | Wireless Lighting | Nessa",
    description:
      "Explore 15W all-in-one integrated solar LED street lights. Wireless, energy-efficient outdoor lighting with durable performance and low maintenance.",
    keywords: [
      "15w solar street light india",
      "all in one solar street light 15w",
      "integrated solar street light 15w",
      "15w solar led street lamp",
      "wireless solar street light 15w",
    ],
  },


  slug67a32d6ad43db9ad31aa7374: {
    title: "18W All-in-One Solar LED Street Light | Integrated Lighting | Nessa",
    description:
      "Discover 18W all-in-one integrated solar LED street lights. Wireless, energy-efficient outdoor lighting with durable design and low maintenance needs.",
    keywords: [
      "18w solar street light india",
      "all in one solar street light 18w",
      "integrated solar street light 18w",
      "18w solar led street lamp",
      "wireless solar street light 18w",
    ],
  },

  slug67a32e4cd43db9ad31aa738b: {
    title: "24W All-in-One Solar LED Street Light | Integrated Solution | Nessa",
    description:
      "Upgrade to 24W all-in-one integrated solar LED street lights. Wireless, energy-efficient outdoor lighting for reliable, low-maintenance performance.",
    keywords: [
      "24w solar street light india",
      "all in one solar street light 24w",
      "integrated solar street light 24w",
      "24w solar led street lamp",
      "wireless solar street light 24w",
    ],
  },

  slug67a32faed43db9ad31aa73a5: {
    title: "30W All-in-One Solar LED Street Light | Integrated Lighting|Nessa",
    description:
      "Switch to 30W all-in-one integrated solar LED street lights. Enjoy wireless, energy-efficient, durable outdoor lighting with easy installation.",
    keywords: [
      "30w solar street light india",
      "all in one solar street light 30w",
      "integrated solar street light 30w",
      "30w solar led street lamp",
      "wireless solar street light 30w",
    ],
  },

  slug67a33086d43db9ad31aa73b5: {
    title: "40W All-in-One Solar LED Street Light | Integrated Design | Nessa",
    description:
      "Discover 40W all-in-one integrated solar LED street lights for efficient, wireless outdoor lighting with easy installation and low maintenance.",
    keywords: [
      "40w solar street light india",
      "all in one solar street light 40w",
      "integrated solar street light 40w",
      "40w solar led street lamp",
      "wireless solar street light 40w",
    ],
  },


  slug67a061a8b15bde2d27dddf2f: {
    title: "200W Solar LED Street Light | Integrated Outdoor Lighting | Nessa",
    description:
      "Explore 200W integrated solar LED street lights for bright, wireless outdoor lighting with energy efficiency and durable design for streets and pathways.",
    keywords: [
      "200w solar street light india",
      "200w solar street light price",
      "integrated 200w solar street light",
      "200w solar led street lamp",
      "wireless solar street light 200w",
    ],
  },

  slug67a33c82d43db9ad31aa73e1: {
    title: "9W Semi Integrated Two in One Solar LED Street Light |Nessa",
    description:
      "Discover 9W semi-integrated solar LED street lights with two-in-one design for efficient, wireless outdoor lighting on streets and pathways.",
    keywords: [
      "9w solar street light india",
      "two in one solar street light 9w",
      "semi integrated solar street light 9w",
      "9w solar led street lamp",
      "wireless solar street light 9w",
    ],
  },

  slug67a33ea8d43db9ad31aa73f8: {
    title: "12W Solar LED Street Light India | Semi Integrated Two in One | Nessa",
    description:
      "Buy 12W semi integrated solar LED street lamp in India. Two in one, wireless solar street light for efficient outdoor lighting. Shop now for quality & durability.",
    keywords: [
      "12w solar street light india",
      "two in one solar street light 12w",
      "semi integrated solar street light 12w",
      "12w solar led street lamp",
      "wireless solar street light 12w",
    ],
  },

  slug67a34b87d43db9ad31aa7414: {
    title: "15W Solar LED Street Light India | Semi Integrated Two in One | Nessa",
    description:
      "Buy 15W semi integrated solar LED street lamp in India. Two in one, wireless solar street light for outdoor lighting. Durable, energy-efficient solution.",
    keywords: [
      "15w solar street light india",
      "two in one solar street light 15w",
      "semi integrated solar street light 15w",
      "15w solar led street lamp",
      "wireless solar street light 15w",
    ],
  },

  slug67a34d18d43db9ad31aa742e: {
    title: "Solar Street Light India | Semi Integrated Two in One LED Lamp | Nessa",
    description:
      "Buy semi integrated two in one solar LED street lamp in India. Wireless solar street light for outdoor lighting. Durable, efficient, eco-friendly solution.",
    keywords: [
      "solar street light india",
      "semi integrated solar street light",
      "two in one solar street light",
      "solar led street lamp",
      "wireless solar street light",
    ],
  },

  slug67a34f4cd43db9ad31aa745f: {
    title: "24W Solar Street Light India | Semi Integrated Two in One LED | Nessa",
    description:
      "Buy 24W semi integrated solar LED street lamp in India. Two in one, wireless solar street light for outdoor lighting. Durable, energy-efficient solution.",
    keywords: [
      "24w solar street light india",
      "two in one solar street light 24w",
      "semi integrated solar street light 24w",
      "24w solar led street lamp",
      "wireless solar street light 24w",
    ],
  },

  slug67a351ead43db9ad31aa7475: {
    title: "30W Solar Street Light India | Semi Integrated Two in One LED | Nessa",
    description:
      "Buy 30W semi integrated solar LED street lamp in India. Two in one, wireless solar street light for outdoor lighting. Durable and energy-efficient solution.",
    keywords: [
      "30w solar street light india",
      "two in one solar street light 30w",
      "semi integrated solar street light 30w",
      "30w solar led street lamp",
      "wireless solar street light 30w",
    ],
  },


  slug67a364dcd43db9ad31aa74b0: {
    title: "60W Solar Street Light | Semi Integrated Two in One LED Lamp | Nessa",
    description:
      "Buy 60W semi integrated solar LED street lamp. Two in one wireless solar street light for outdoor lighting. Durable, energy-efficient, and easy to install.",
    keywords: [
      "60w solar street light india",
      "two in one solar street light 60w",
      "semi integrated solar street light 60w",
      "60w solar led street lamp",
      "wireless solar street light 60w",
    ],
  },


  slug67a376abd43db9ad31aa869d: {
    title: "15W Hybrid Solar Street Light | Semi Integrated Wireless Lamp | Nessa",
    description:
      "Buy 15W hybrid semi integrated solar street light. Wireless hybrid solar street lamp for efficient outdoor lighting. Durable, energy-saving, and easy to install.",
    keywords: [
      "15w hybrid solar street light india",
      "hybrid solar street light 15w",
      "semi integrated hybrid solar light 15w",
      "15w solar street lamp hybrid",
      "wireless hybrid solar street light",
    ],
  },


  slug67a37987d43db9ad31aa86b6: {
    title: "30W Hybrid Solar Street Light | Semi Integrated Wireless Lamp | Nessa",
    description:
      "30W Hybrid Solar Street Light | Semi Integrated Wireless Lamp | NessaBuy 30W hybrid semi integrated solar street light. Wireless hybrid solar street lamp for efficient, durable outdoor lighting. Energy-saving and easy to install.",
    keywords: [
      "30w hybrid solar street light india",
      "hybrid solar street light 30w",
      "semi integrated hybrid solar light 30w",
      "30w solar street lamp hybrid",
      "wireless hybrid solar street light 30w",
    ],
  },


  slug67a37ae9d43db9ad31aa86cb: {
    title: "45W Hybrid Solar Street Light | Semi Integrated Wireless Lamp | Nessa",
    description:
      "Buy 45W hybrid semi integrated solar street light. Wireless hybrid solar street lamp offering efficient, durable outdoor lighting. Energy-saving and easy to install.",
    keywords: [
      "45w hybrid solar street light india",
      "hybrid solar street light 45w",
      "semi integrated hybrid solar light 45w",
      "45w solar street lamp hybrid",
      "wireless hybrid solar street light 45w",
    ],
  },

  slug67a39829d43db9ad31aa8703: {
    title: "60W Hybrid Solar Street Light | Semi Integrated Wireless Lamp | Nessa",
    description:
      "Buy 60W hybrid semi integrated solar street light. Wireless hybrid solar street lamp for efficient, durable outdoor lighting. Energy-saving and easy to install.",
    keywords: [
      "60w hybrid solar street light india",
      "hybrid solar street light 60w",
      "semi integrated hybrid solar light 60w",
      "60w solar street lamp hybrid",
      "wireless hybrid solar street light 60w",
    ],
  },


  slug67a39b51d43db9ad31aa8728: {
    title: "60W Hybrid Solar Street Light | Semi Integrated Wireless Lamp | Nessa",
    description:
      "Buy 60W hybrid semi integrated solar street light. Wireless hybrid solar street lamp for efficient, durable outdoor lighting. Energy-saving and easy to install.",
    keywords: [
      "60w hybrid solar street light india",
      "hybrid solar street light 60w",
      "semi integrated hybrid solar light 60w",
      "60w solar street lamp hybrid",
      "wireless hybrid solar street light 60w",
    ],
  },

  slug67a39e39d43db9ad31aa873d: {
    title: "45W Hybrid Solar Street Light | Integrated Wireless Solar Lamp | Nessa",
    description:
      "Buy 45W integrated hybrid solar street light. Wireless hybrid solar street lamp for efficient, durable outdoor lighting. Energy-saving and easy to install.",
    keywords: [
      "45w hybrid solar street light india",
      "hybrid solar street light 45w",
      "integrated hybrid solar street light 45w",
      "45w solar street lamp hybrid",
      "wireless hybrid solar street light 45w",
    ],
  },

  slug67a3a023d43db9ad31aa8756: {
    title: "30W Hybrid Solar Street Light | Semi Integrated Wireless Lamp | Nessa",
    description:
      "Buy 30W hybrid semi integrated solar street light. Wireless hybrid solar street lamp for efficient, durable outdoor lighting. Energy-saving and easy to install.",
    keywords: [
      "30w hybrid solar street light india",
      "hybrid solar street light 30w",
      "semi integrated hybrid solar light 30w",
      "30w solar street lamp hybrid",
      "wireless hybrid solar street light 30w",
    ],
  },


  slug67a3a216d43db9ad31aa876b: {
    title: "15W Hybrid Solar Street Light | Integrated Wireless Solar Lamp | Nessa",
    description:
      "Buy 15W integrated hybrid solar street light. Wireless hybrid solar street lamp for efficient, durable outdoor lighting. Energy-saving and easy to install.",
    keywords: [
      "15w hybrid solar street light india",
      "hybrid solar street light 15w",
      "integrated hybrid solar street light 15w",
      "15w solar led street lamp hybrid",
      "wireless hybrid solar street light 15w",
    ],
  },

  slug67a44de8d43db9ad31aa9541: {
    title: "120W Smart Street Light | Energy-Efficient LED with Sensor | Nessa",
    description:
      "Buy 120W smart solar street light with sensor. Energy-efficient outdoor LED street lighting for enhanced security and cost savings. Durable and easy to install.",
    keywords: [
      "120w smart street light india",
      "smart solar street light 120w",
      "120w led street light with sensor",
      "smart outdoor street lighting 120w",
      "energy-efficient 120w street light",
    ],
  },


  slug67a450d9d43db9ad31aa9555: {
    title: "60W LED Flood Light | Energy-Efficient Outdoor IP65 Garden Lamp | Nessa",
    description:
      "Buy 60W LED flood light with IP65 rating. Energy-efficient outdoor lighting ideal for gardens and spaces. Durable, bright, and weather-resistant flood lamp.",
    keywords: [
      "60w LED flood light India",
      "LED flood light 60w outdoor",
      "IP65 LED flood light 60w",
      "energy-efficient 60w LED flood light",
      "60w LED flood light for garden",
    ],
  },

  slug67a45241d43db9ad31aa956a: {
    title: "50W LED Flood Light | Energy-Efficient Outdoor IP65 Garden Lamp | Nessa",
    description:
      "Buy 50W LED flood light with IP65 rating. Energy-efficient outdoor lighting perfect for gardens and open spaces. Durable, bright, and weather-resistant flood lamp.",
    keywords: [
      "50w LED flood light India",
      "LED flood light 50w outdoor",
      "IP65 LED flood light 50w",
      "energy-efficient 50w LED flood light",
      "50w LED flood light for garden",
    ],
  },

  slug67a453dbd43db9ad31aa9580: {
    title: "75W LED Flood Light | Energy-Efficient Outdoor IP65 Garden Lamp | Nessa",
    description:
      "Buy 75W LED flood light with IP65 rating. Energy-efficient outdoor lighting ideal for gardens and open spaces. Durable, bright, and weather-resistant flood lamp.",
    keywords: [
      "75w LED flood light India",
      "LED flood light 75w outdoor",
      "IP65 LED flood light 75w",
      "energy-efficient 75w LED flood light",
      "75w LED flood light for",
    ],
  },

  slug67a454f8d43db9ad31aa959a: {
    title: "100W LED Flood Light | Energy-Efficient Outdoor IP65 Garden Lamp | Nessa",
    description:
      "Buy 100W LED flood light with IP65 rating. Energy-efficient outdoor lighting ideal for gardens and open spaces. Durable, bright, and weather-resistant flood lamp.",
    keywords: [
      "100w LED flood light India",
      "LED flood light 100w outdoor",
      "IP65 LED flood light 100w",
      "energy efficient 100w LED flood light",
      "100w LED flood light for garden",
    ],
  },


  slug67a4565bd43db9ad31aa95b4: {
    title: "150W LED Flood Light | Energy-Efficient Outdoor IP65 Garden Lamp | Nessa",
    description:
      "Buy 150W LED flood light with IP65 rating. Energy-efficient outdoor lighting ideal for gardens and open spaces. Durable, bright, and weather-resistant flood lamp.",
    keywords: [
      "150w LED flood light India",
      "LED flood light 150w outdoor",
      "IP65 LED flood light 150w",
      "energy-efficient 150w LED flood light",
      "150w LED flood light for garden",
    ],
  },

  slug67a45752d43db9ad31aa95cc: {
    title: "200W LED Flood Light | Energy-Efficient Outdoor IP66 Garden Lamp | Nessa",
    description:
      "Buy 200W LED flood light with IP66 rating. Energy-efficient outdoor lighting ideal for gardens and large spaces. Durable, bright, and weather-resistant flood lamp.",
    keywords: [
      "200w LED flood light India",
      "LED flood light 200w outdoor",
      "IP66 LED flood light 200w",
      "energy-efficient 200w LED flood light",
      "200w LED flood light for garden",
    ],
  }
}

