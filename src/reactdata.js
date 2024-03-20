import React, { useState, useEffect } from 'react';

const EasyBusFrontend = () => {
  const [stationName, setStationName] = useState('');
  const [busesPassing, setBusesPassing] = useState([]);
  const [closestBus, setClosestBus] = useState(null);

  // Function to fetch data from the backend and update state
  const fetchData = async () => {
    try {
      const response = await fetch('/api/buses/' + stationName);
      const data = await response.json();
      setBusesPassing(data.buses);
      setClosestBus(data.closestBus);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle station selection
  const handleStationChange = (event) => {
    setStationName(event.target.value);
  };

  // Function to format time remaining
  const formatTimeRemaining = (timeString) => {
    // Implement your formatting logic here
    return timeString;
  };

  // Fetch data when stationName changes
  useEffect(() => {
    if (stationName) {
      fetchData();
    }
  }, [stationName]);

  return (
    <div className="easybus-frontend">
      <h1>EasyBus</h1>
      <label htmlFor="stationSelect">Select a Station:</label>
      <select id="stationSelect" value={stationName} onChange={handleStationChange}>
        <option value="">Select a station</option>
        {/* Add options for stations dynamically here */}
      </select>

      <div className="bus-info">
        <h2>Buses Passing Through {stationName}:</h2>
        <ul>
          {busesPassing.map((bus, index) => (
            <li key={index}>
              Bus ID: {bus.busId} | Time Remaining: {formatTimeRemaining(bus.timeRemaining)}
            </li>
          ))}
        </ul>
      </div>

      {closestBus && (
        <div className="closest-bus">
          <h2>Closest Bus to {stationName}:</h2>
          <p>Bus ID: {closestBus.busId} | Time Remaining: {formatTimeRemaining(closestBus.timeRemaining)}</p>
        </div>
      )}
    </div>
  );
};

export default EasyBusFrontend;
