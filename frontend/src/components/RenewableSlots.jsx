import React, { useState } from 'react';
import './RenewableSlots.css'; // Assuming you have a CSS file for styling

const RenewableSlots = () => {
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const renewableEnergySlots = [
    { type: 'Solar Energy', name: 'Solar Panel', image: '/assets/images/SolarPanel.png' },
    { type: 'Solar Energy', name: 'Solar Roof Tiles', image: '/assets/images/SolarRoofTiles.png' },
    { type: 'Solar Energy', name: 'Solar Water Heating', image: '/assets/images/SolarWaterHeating.png' },
    { type: 'Wind Energy', name: 'Small Wind Turbines', image: '/assets/images/SmallWindTurbine.png' },
    { type: 'Wind Energy', name: 'Vertical Axis Wind Turbines', image: '/assets/images/VerticalAxisWindTurbine.png' },
    { type: 'Geothermal Energy', name: 'Heat Pump', image: '/assets/images/HeatPump.png' },
    { type: 'HydroPower Energy', name: 'Micro Hydropower System', image: '/assets/images/MicroHydroPowerSystem.png' },
    { type: 'HydroPower Energy', name: 'Pico Hydropower', image: '/assets/images/PicoHydroPower.png' },
    { type: 'Urban Farming', name: 'Vertical Farming', image: '/assets/images/VerticalFarming.png' },
  ];

  const handleSlotHover = (index) => {
    setHoveredSlot(index);
  };

  const handleSlotLeave = () => {
    setHoveredSlot(null);
  };

  return (
    <div className="hotbar-container">
      <div className="recommendation-text">
        <span className="highly-recommended">Highly Recommended</span>
        <span className="least-recommended">Least Recommended</span>
      </div>
      <div className="hotbar">
        {renewableEnergySlots.map((slot, index) => (
          <div
            key={index}
            className="slot"
            onMouseEnter={() => handleSlotHover(index)}
            onMouseLeave={handleSlotLeave}
          >
            <img src={slot.image} alt={slot.name} className="slot-image" />
            {hoveredSlot === index && (
              <div className="tooltip">
                <strong>{slot.type}</strong>
                <div>{slot.name}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenewableSlots;