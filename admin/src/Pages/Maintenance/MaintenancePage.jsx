
import { useState, useEffect } from 'react';
import { Settings, Mail, Phone, Sparkles, ArrowRight, Clock, Shield } from 'lucide-react';
import logo from '../../assets/logo.svg'

const MaintenancePage = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 0.5 : 0);
    }, 100);
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, []);
  
  useEffect(() => {
    document.title = "Nessa - Crafting Something Amazing";
  }, []);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Automation",
      status: "In Development",
      description: "Advanced AI-powered tools to streamline your workflow",
      gradient: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-500/20"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enhanced Security",
      status: "Final Testing",
      description: "State-of-the-art protection for your valuable data",
      gradient: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/20"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Next-Gen Interface",
      status: "Polishing",
      description: "Beautiful, intuitive design that adapts to you",
      gradient: "from-blue-300 to-blue-500",
      shadowColor: "shadow-blue-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-blue-100 backdrop-blur-xl bg-white/80">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-600 animate-spin-slow" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                <img className="w-24" src={logo} alt="Nessa Logo" />
                </span>
              </div>
              <div className="flex items-center gap-4 bg-blue-50 px-4 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm text-blue-900">System Status</span>
                </div>
                <div className="w-px h-4 bg-blue-200" />
                <span className="text-sm font-medium text-blue-900">{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-8 relative">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-xl opacity-50" />
              <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 p-8 rounded-full">
                <Settings className="w-16 h-16 text-white" />
              </div> */}
              <img className="w-40" src={logo} alt="Nessa Logo" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Crafting Something Amazing
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Innovative Lighting Solutions for Every Industry
            With over 16 years of expertise and a global presence in 20+ countries, Nessa delivers sustainable, high-performance lighting tailored to meet diverse industrial needs.
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-20">
            <div className="bg-blue-50 backdrop-blur border border-blue-100 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-900">System Upgrade</h3>
                <span className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</span>
              </div>
              <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6IiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6IiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6IiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTAgMGg1djVIMFYwek0xMCAwaDV2NWgtNVYwek0wIDEwaDV2NUgwdi01ek0xMCAxMGg1djVoLTV2LTV6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')] animate-slide" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white border border-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-r ${feature.gradient} ${feature.shadowColor} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">{feature.title}</h3>
                <div className="inline-block px-3 py-1 bg-blue-50 rounded-full text-sm font-medium mb-4 text-blue-600">
                  {feature.status}
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <a
              href="mailto:info@nessa.in"
              className="group bg-white border border-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 flex items-center justify-between hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium text-blue-900">info@nessa.in</span>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-2 transition-transform" />
            </a>
            <a
              href="tel:+918690779778"
              className="group bg-white border border-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 flex items-center justify-between hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium text-blue-900">+91 8690 779 778</span>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          {/* Status Indicator */}
          <div className="flex justify-center">
            <div className="bg-white border border-blue-100 rounded-full py-4 px-8 flex items-center gap-4">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-blue-500 transition-all duration-300"
                    style={{
                      opacity: i === Math.floor(progress / 20) ? 1 : 0.2,
                      transform: i === Math.floor(progress / 20) ? 'scale(1.5)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>
              <span className="text-gray-600">Estimated completion soon</span>
            </div>
          </div>
        </main>

        <footer className="border-t border-blue-100 py-8 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-600 mb-2">&copy; {new Date().getFullYear()} Nessa. All rights reserved.</p>
            <p className="text-gray-500">Building the future of digital experiences.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MaintenancePage;