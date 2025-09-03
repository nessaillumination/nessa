export const EApplicationEnvironment = Object.freeze({
    PRODUCTION: 'production',
    DEVELOPMENT: 'development'
});

export const ExternalApiUrls = Object.freeze({
    LOCATION_DETAILS: 'https://freeipapi.com/api/json/'
});

export const EProductCategories = Object.freeze({
    AC_LIGHTING: 'AC Lighting',
    ELECTRONICS: 'Electronics',
    SOLAR: 'Solar',
    HYBRID_LIGHTS: 'Hybrid Lights',
    INDOOR_LIGHTING: 'Indoor Lighting',
    SMART_LIGHTING_SOLUTION:'Smart Lighting Solutions',
    SOLUTIONS: 'Solutions',
});

export const EACLightingSubCategories = Object.freeze({
    STREET_LIGHT: 'Street Light',
    FLOOD_LIGHT: 'Flood Light',
    HIGHWAY_LIGHT: 'Highway Light',
    WELL_GLASS_LIGHT: 'Well Glass Light',
    FISSION_LED_STREET_LIGHT: 'Fission LED Street Light',
    FISSION_FLOOD_LIGHT: 'Fission Flood Light',
    AC_HIGH_MAST: 'AC High Mast',
    RGB_LIGHT : 'RGB Light',
    TRAFFIC_BLINKER_LIGHT: 'TRAFFIC Blinker Light'
});

export const EElectronicsSubCategories = Object.freeze({
    DC_DRIVERS: 'DC Drivers',
    CHARGE_CONTROLLERS: 'Charge Controllers',
    MOTION_SENSOR: 'Motion Sensor',
    AC_DRIVER: 'AC Driver',
    SPD: 'SPD',
    DC_DRIVER_COMBO: 'DC Driver & Combo',
});

export const ESolarSubCategories = Object.freeze({
    SEMI_INTEGRATED_SOLAR: 'Semi Integrated Street Light (Two in One)',
    INDUSTRIAL_SOLAR: 'Integrated Street Light (All In One)',
    SOLAR_STREET_LIGHT: 'Solar Street Light (Full System)',
    SOLAR_PUMPS: 'Solar Pumps',
    SOLAR_ROOF_TOP: 'Solar Roof Top',
    SOLAR_HIGH_MAST: 'Solar High Mast'
});


export const EHybridLightsSubCategories = Object.freeze({
    HYBRID_SEMI_INTEGRATED: 'Hybrid Semi Integrated Solar Street Light Light',
    HYBRID_INTEGRATED: 'Hybrid Integrated Solar Street Light'
});


export const EIndoorLightingSubCategories = Object.freeze({
    SURFACE_LIGHT: 'Surface Light',
    SPIKE_LIGHT: 'Spike Light',
    TUBE_LIGHT: 'Tube Light',
    DOWNLIGHT: 'Downlight',
    PANEL_LIGHT: 'Panel Light'
});

export const ESmartLightingSolutions = Object.freeze({
    AC_SMART_STREET_LIGHT: 'AC Smart Street Light',
    SOLAR_SMART_STREET_LIGHT: 'Smart Solar Street Light'
})

export const ESolutionsSubCategories = Object.freeze({
    AIRPORTS: 'Airports',
    MINES: 'Mines',
    STADIUM: 'Stadium',
    PETROL_PUMP: 'Petrol Pump',
    REFINERY: 'Refinery',
    HIGHWAYS: 'Highways',
    TUNNELS: 'Tunnels',
    RURAL_HILLY_FOREST_AREAS: 'Rural, Hilly & Forest Areas',
    PORTS_LOGISTIC_PARKS: 'Ports & Logistic Parks',
    HAZARDOUS_AREAS: 'Hazardous Areas',
    THERMAL_POWER_PLANTS: 'Thermal Power Plants',
    SOLAR_PARKS: 'Solar Parks',
});

export const EBestSuitedFor = Object.freeze({
    OFFICES: 'Offices',
    BANK: 'Bank',
    INDUSTRIES: 'Industries',
})

export const ESubject = Object.freeze({
    GENERAL_INQUIRY: 'General Inquiry',
    INTERNATION_INQUIRY: 'International Inquiry',
    DOMESTIC_INQUIRY: 'Domestic Inquiry',
    SERVICE_INQUIRY: 'Service Inquiry',
    CSR_INQUIRY: 'CSR Inquiry',
    CAREER_INQUIRY: 'Career Inquiry'
})

export const allowedUsers = Object.freeze([
    { email: 'info@nessa.in', password: 'Nessa@Info8949' },
    { email: 'Arpit.d@nessa.in', password: 'Nessa@Arpit8949' }
]);

export const DELETE_BY_TYPE = Object.freeze({
    'PRODUCT':"PRODUCT",
    "SOLUTION":"SOLUTION",
    "TESTIMONIAL":"TESTIMONIAL",
    "PROJECT":"PROJECT",
    "BLOG":"BLOG",
    "MEDIA":"MEDIA"
})

export const BLOG_TYPES = Object.freeze({
    "BLOGS":"BLOGS",
    "CASE_STUDIES":"CASE_STUDIES",
    "WHITE_PAPERS":"WHITE_PAPERS",
    "ARTICLES": "ARTICLES",
    "OTHERS":"OTHRES"
})
export const MEDIA_TYPES = Object.freeze({
    "PRESS_RELEASE":"PRESS_RELEASE",
    "MEDIA_COVERAGE":"MEDIA_COVERAGE",
    "EVENTS_AND_EXHIBITION":"EVENTS_AND_EXHIBITION",
    "MEDIA_KIT": "MEDIA_KIT",
    "VIDEOS":"VIDEOS"
})