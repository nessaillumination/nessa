import React, { useState } from 'react'
import SideComponent from '../../Components/sideComponent/SideComponent'
import Navbar from '../../Components/Header/Navbar'
import hero from '../../assets/images/calculator/hero.png'
import sun1 from '../../assets/images/calculator/sun1.svg'
import sun2 from '../../assets/images/calculator/sun2.svg'
import sun3 from '../../assets/images/calculator/sun3.svg'
import battery from '../../assets/images/calculator/battery.svg'
import Footer from '../../Components/Footer'

const BatteryAHcalculator = () => {
  const [lightWattageDimming, setLightWattageDimming] = useState('');
  const [batteryVoltageDimming, setBatteryVoltageDimming] = useState('12.8');
  const [batteryAhWithLossDimming, setBatteryAhWithLossDimming] = useState(0);
  
  const [lightWattageNoDimming, setLightWattageNoDimming] = useState('');
  const [batteryVoltageNoDimming, setBatteryVoltageNoDimming] = useState('12.8');
  const [batteryAhWithLossNoDimming, setBatteryAhWithLossNoDimming] = useState(0);
  
  const [showDimmingResult, setShowDimmingResult] = useState(false);
  const [showNoDimmingResult, setShowNoDimmingResult] = useState(false);
  const [lifePo4Result, setLifePo4Result] = useState(0);

  const calculateBatteryAhDimming = () => {
    if (!lightWattageDimming) return;
    
    // Calculate battery watt hours with dimming pattern
    const wattage = parseFloat(lightWattageDimming);
    const batteryWattHours = (2.5 * wattage) + (3 * (wattage * 0.5)) + (7 * (wattage * 0.25));
    
    // Calculate battery AH with loss
    const batteryAhWithLoss = batteryWattHours / 0.9;
    setBatteryAhWithLossDimming(batteryAhWithLoss.toFixed(2));
    
    // Calculate LiFePo4 battery AH
    const voltage = parseFloat(batteryVoltageDimming);
    const lifepo4Ah = batteryAhWithLoss / voltage;
    
    // Round to nearest multiple of 6
    const roundedResult = Math.round(lifepo4Ah / 6) * 6;
    setLifePo4Result(roundedResult);
    
    setShowDimmingResult(true);
  };

  const calculateBatteryAhNoDimming = () => {
    if (!lightWattageNoDimming) return;
    
    // Calculate battery watt hours without dimming (12 hours at full power)
    const wattage = parseFloat(lightWattageNoDimming);
    const batteryWattHours = 12 * wattage; // 12 hours at 100% brightness
    
    // Updated formula for battery AH with loss: B16 + (B16 * 0.2) where B16 is battery watt hours
    const batteryAhWithLoss = batteryWattHours + (batteryWattHours * 0.2); // batteryWattHours * 1.2
    setBatteryAhWithLossNoDimming(batteryAhWithLoss.toFixed(2));
    
    // Calculate LiFePo4 battery AH
    const voltage = parseFloat(batteryVoltageNoDimming);
    const lifepo4Ah = batteryAhWithLoss / voltage;
    
    // Round to nearest multiple of 6
    const roundedResult = Math.round(lifepo4Ah / 6) * 6;
    setLifePo4Result(roundedResult);
    
    setShowNoDimmingResult(true);
  };

  // Update the handleWattageChangeDimming function to calculate in real-time
  const handleWattageChangeDimming = (e) => {
    const newWattage = e.target.value;
    setLightWattageDimming(newWattage);
    
    if (newWattage && !isNaN(newWattage)) {
      // Calculate battery watt hours with dimming pattern
      const wattage = parseFloat(newWattage);
      const batteryWattHours = (2.5 * wattage) + (3 * (wattage * 0.5)) + (7 * (wattage * 0.25));
      
      // Calculate battery AH with loss
      const batteryAhWithLoss = batteryWattHours / 0.9;
      setBatteryAhWithLossDimming(batteryAhWithLoss.toFixed(2));
    } else {
      setBatteryAhWithLossDimming(0);
    }
  };

  // Update the handleWattageChangeNoDimming function to calculate in real-time
  const handleWattageChangeNoDimming = (e) => {
    const newWattage = e.target.value;
    setLightWattageNoDimming(newWattage);
    
    if (newWattage && !isNaN(newWattage)) {
      // Calculate battery watt hours without dimming
      const wattage = parseFloat(newWattage);
      const batteryWattHours = 12 * wattage; // 12 hours at 100% brightness
      
      // Updated formula for battery AH with loss
      const batteryAhWithLoss = batteryWattHours + (batteryWattHours * 0.2); // batteryWattHours * 1.2
      setBatteryAhWithLossNoDimming(batteryAhWithLoss.toFixed(2));
    } else {
      setBatteryAhWithLossNoDimming(0);
    }
  };

  return (
    <div className='w-full overflow-hidden text-xl'>
        <Navbar />
        <SideComponent />

        <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center  justify-start ">
                <img
                    className="w-full h-full object-cover object-left absolute "
                    src={hero}
                    alt=""
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white ml-[5vw] relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    Battery AH Calculator
                </h1>
            </div>

        {/* Main content sections */}
        <div className="my-[50px]">
            {/* Introduction Section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-6">Accurately Estimate Your Battery Requirements</h2>
                <div className="w-[51px] h-2.5 bg-blue-200 mx-auto mb-6 rounded-[50px]"></div>
                <p className="text-gray-700">
                    Choosing the right battery capacity is essential for efficient energy storage and longer backup power. Our 
                    Battery AH Calculator helps you determine the amp-hour (AH) rating required for your lighting system based 
                    on power consumption, voltage, and efficiency.
                </p>
            </div>

            {/* How it Works Section */}
            <div className="bg-blue-50 py-12 px-6 rounded-lg mb-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-6">How it Works</h2>
                    <div className="w-[51px] h-2.5 rounded-[50px] bg-blue-200 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-10  md:justify-items-center ">
                    <div>
                        <h3 className="text-lg font-medium mb-4">Enter Key Parameters Such as:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <div className="w-5 flex-shrink-0 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <span className=" text-white text-xs">✓</span>
                                </div>
                                <span>Light Wattage</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-5 flex-shrink-0 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <span className=" text-white text-xs">✓</span>
                                </div>
                                <span>Battery Watt-Hours (WH)</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-5 flex-shrink-0 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <span className=" text-white text-xs">✓</span>
                                </div>
                                <span>Battery Voltage</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-5 flex-shrink-0 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <span className=" text-white text-xs">✓</span>
                                </div>
                                <span>Battery Efficiency</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">The Calculator will Provide:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <div className="w-5 flex-shrink-0 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                                    <span className=" text-white text-xs">✓</span>
                                </div>
                                <span>Battery AH Calculation with and without dimming</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-5 flex-shrink-0 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                                    <span className=" text-white text-xs">✓</span>
                                </div>
                                <span>Comparison for Li-ion, LiFePo4, and SMP/Gel Batteries</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-5 flex-shrink-0 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                                    <span className=" text-white text-xs">✓</span>
                                </div>
                                <span>Estimated Number of Parallel Cells Required</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Standard Dimming Pattern Section */}
            <div className="w-full mb-16 flex flex-col items-center justify-center">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-6">Standard Dimming Pattern</h2>
                    <div className="w-[51px] h-2.5 rounded-[50px] bg-blue-200 mx-auto mb-6"></div>
                    <p className="text-gray-700 px-4">
                        For optimized energy efficiency, the AH Calculator implements the following dimming schedule:
                    </p>
                </div>

                <div className="space-y-6  px-4">
                    <div className="flex items-center">
                        <div className=" flex-shrink-0 mr-2">
                            <img loading="lazy" src={sun1} alt="" />
                        </div>
                        <span className="text-lg"><strong>2.5 hours</strong> - 100% brightness</span>
                    </div>
                    <div className="flex items-center">
                        <div className=" flex-shrink-0 mr-2">
                            <img loading="lazy" src={sun2} alt="" />
                        </div>
                        <span className="text-lg"><strong>3 hours</strong> - 50% brightness</span>
                    </div>
                    <div className="flex items-center">
                        <div className=" flex-shrink-0 mr-2">
                            <img loading="lazy" src={sun3} alt="" />
                        </div>
                        <span className="text-lg"><strong>6.5 hours</strong> - 25% brightness</span>
                    </div>
                </div>

                <p className="text-center mt-8 text-gray-700 px-4">
                    This pattern ensures accurate battery capacity estimation, balancing performance and longevity.
                </p>
            </div>

            {/* Battery Selection Made Easy Section */}
            <div className="w-full bg-blue-50 py-12 px-6 rounded-lg flex flex-col items-center justify-center" >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-6">Battery Selection Made Easy</h2>
                    <div className="w-[51px] h-2.5 rounded-[50px] bg-blue-200 mx-auto"></div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start ">
                        <img loading="lazy" className='mr-2' src={battery} alt="" />
                        <div>
                            <span className="font-semibold">SMP/GEL vs. LiFePo4 Batteries</span> - Compare different battery technologies
                        </div>
                    </div>
                    <div className="flex items-start ">
                        <img loading="lazy" className='mr-2' src={battery} alt="" />
                        <div>
                            <span className="font-semibold">Dimming vs. Non-Dimming</span> - Optimize battery performance based on usage
                        </div>
                    </div>
                    <div className="flex items-start ">
                        <img loading="lazy" className='mr-2' src={battery} alt="" />
                        <div>
                            <span className="font-semibold">Voltage-Based Adjustments</span> - Ensure the right system voltage for your setup
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-8">Calculate your Battery AH Now</h2>
          <div className="w-[100px] h-2.5 bg-blue-200 mx-auto mb-12 rounded-[50px]"></div>
          <p className="text-center mb-12">Enter your details and get an accurate battery capacity recommendation.</p>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Dimming Calculator */}
            <div className="flex-1 border border-blue-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Ah Calculator for Dimming</h3>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Light Wattage</label>
                <div className="flex">
                  <input 
                    type="number" 
                    value={lightWattageDimming}
                    onChange={handleWattageChangeDimming}
                    className="flex-1 border rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter wattage"
                  />
                  <span className="bg-gray-100 border border-l-0 rounded-r-md p-3 flex items-center justify-center w-12">W</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Battery Voltage</label>
                <div className="relative">
                  <select 
                    value={batteryVoltageDimming}
                    onChange={(e) => setBatteryVoltageDimming(e.target.value)}
                    className="w-full border rounded-md p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="12.8">12.8 V</option>
                    <option value="25.6">25.6 V</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Battery Ah With Loss Calculation</label>
                <p className="p-3 bg-gray-50 rounded-md">{batteryAhWithLossDimming}</p>
              </div>
              
              <button 
                onClick={calculateBatteryAhDimming}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-200"
              >
                Calculate Battery Ah
              </button>
            </div>
            
            {/* No Dimming Calculator */}
            <div className="flex-1 border border-blue-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Ah Calculator without Dimming</h3>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Light Wattage</label>
                <div className="flex">
                  <input 
                    type="number" 
                    value={lightWattageNoDimming}
                    onChange={handleWattageChangeNoDimming}
                    className="flex-1 border rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter wattage"
                  />
                  <span className="bg-gray-100 border border-l-0 rounded-r-md p-3 flex items-center justify-center w-12">W</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Battery Voltage</label>
                <div className="relative">
                  <select 
                    value={batteryVoltageNoDimming}
                    onChange={(e) => setBatteryVoltageNoDimming(e.target.value)}
                    className="w-full border rounded-md p-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="12.8">12.8 V</option>
                    <option value="25.6">25.6 V</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Battery Ah With Loss Calculation</label>
                <p className="p-3 bg-gray-50 rounded-md">{batteryAhWithLossNoDimming}</p>
              </div>
              
              <button 
                onClick={calculateBatteryAhNoDimming}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-200"
              >
                Calculate Battery Ah
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Dialog - Dimming */}
        {showDimmingResult && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-center">AH calculation for dimming</h3>
              <h4 className="text-xl font-semibold mb-6 text-center">Battery AH of LiFePo4 = {lifePo4Result}</h4>
              <button 
                onClick={() => setShowDimmingResult(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-200"
              >
                Calculate Again
              </button>
            </div>
          </div>
        )}
        
        {/* Results Dialog - No Dimming */}
        {showNoDimmingResult && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-center">AH calculation without dimming</h3>
              <h4 className="text-xl font-semibold mb-6 text-center">Battery AH of LiFePo4 = {lifePo4Result}</h4>
              <button 
                onClick={() => setShowNoDimmingResult(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-200"
              >
                Calculate Again
              </button>
            </div>
          </div>
        )}

        <Footer />

    </div>
  )
}

export default BatteryAHcalculator