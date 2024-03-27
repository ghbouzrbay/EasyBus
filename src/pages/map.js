// Example code for real-time map
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example data for bus stops
const busStops = [
{ id: 1, name: 'Stop 1', lat: 51.505, lon: -0.09 },
{ id: 2, name: 'Stop 2', lat: 51.506, lon: -0.08 },
{ id: 3, name: 'Stop 3', lat: 51.507, lon: -0.07 }
];

// Example code for adding bus stops to the map
for (const stop of busStops) {
const marker = L.marker([stop.lat, stop.lon]).addTo(map);
marker.bindPopup(`<strong>${stop.name}</strong>`);
}