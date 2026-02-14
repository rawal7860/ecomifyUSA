import React, { useState } from 'react';

const UKMap = () => {
  const [hoveredState, setHoveredState] = useState(null);

  // UK Data Object
  const ukData = {
    England: { fee: "£100", vat: "£90k", tax: "19-25%", desc: "HMRC & Companies House" },
    Scotland: { fee: "£100", vat: "£90k", tax: "19-25%", desc: "Scottish Limited Partnership" },
    Wales: { fee: "£100", vat: "£90k", tax: "19-25%", desc: "Standard UK Compliance" },
    NorthernIreland: { fee: "£100", vat: "£90k", tax: "19-25%", desc: "Dual Market Access" }
  };

  const handleHover = (name) => setHoveredState(name);

  return (
    <div className="flex flex-row items-start justify-center p-8 bg-gray-50 rounded-xl">
      {/* SVG MAP SECTION */}
      <svg viewBox="0 0 500 600" className="w-full max-w-md drop-shadow-2xl">
        {/* England */}
        <path
          d="M320,550 L300,500 L280,450 L350,350 L400,400 L420,500 Z"
          fill={hoveredState === 'England' ? '#3b82f6' : '#94a3b8'}
          className="transition-all duration-300 cursor-pointer hover:scale-[1.02] origin-center"
          onMouseEnter={() => handleHover('England')}
          onMouseLeave={() => handleHover(null)}
        />
        {/* Scotland */}
        <path
          d="M250,50 L350,150 L320,300 L250,280 L200,150 Z"
          fill={hoveredState === 'Scotland' ? '#3b82f6' : '#94a3b8'}
          className="transition-all duration-300 cursor-pointer hover:scale-[1.02] origin-center"
          onMouseEnter={() => handleHover('Scotland')}
        />
        {/* Wales */}
        <path
          d="M230,450 L200,400 L250,380 L270,420 Z"
          fill={hoveredState === 'Wales' ? '#3b82f6' : '#94a3b8'}
          className="transition-all duration-300 cursor-pointer hover:scale-[1.02] origin-center"
          onMouseEnter={() => handleHover('Wales')}
        />
        {/* Northern Ireland */}
        <path
          d="M150,250 L180,220 L210,250 L180,280 Z"
          fill={hoveredState === 'NorthernIreland' ? '#3b82f6' : '#94a3b8'}
          className="transition-all duration-300 cursor-pointer hover:scale-[1.02] origin-center"
          onMouseEnter={() => handleHover('NorthernIreland')}
        />
      </svg>

      {/* VERTICAL INFOGRAPHIC BOX */}
      <div className="ml-8 w-64 p-6 bg-white border-2 border-blue-500 rounded-lg shadow-xl min-h-[300px]">
        {hoveredState ? (
          <>
            <h2 className="text-2xl font-bold text-blue-700 border-b pb-2 mb-4">{hoveredState}</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <p><strong>Formation Fee:</strong> {ukData[hoveredState].fee}</p>
              <p><strong>VAT Threshold:</strong> {ukData[hoveredState].vat}</p>
              <p><strong>Corp Tax:</strong> {ukData[hoveredState].tax}</p>
              <p className="mt-4 italic">{ukData[hoveredState].desc}</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 mt-4">
                Select State
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400 italic text-center mt-20">Hover over a region to see details</p>
        )}
      </div>
    </div>
  );
};

export default UKMap;