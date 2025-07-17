import React, { useEffect, useState } from 'react';

const AttendanceCheck = () => {
  const [ip, setIp] = useState('');
  const [inCollege, setInCollege] = useState(null);
  const [distance, setDistance] = useState(null);

  // College coordinates
  const COLLEGE_COORDS = {
    lat: 16.5561096,
    lng: 81.9749443
  };

  const MAX_DISTANCE_KM = 0.2;

  // Get public IP
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(err => console.error("IP fetch error:", err));
  }, []);

  // Haversine distance
  function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) *
              Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Get location & check distance
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          const dist = getDistanceKm(latitude, longitude, COLLEGE_COORDS.lat, COLLEGE_COORDS.lng);
          setDistance(dist);
          setInCollege(dist <= MAX_DISTANCE_KM);
        },
        err => {
          console.error("Location error:", err);
          setInCollege(false);
        }
      );
    } else {
      alert("Geolocation not supported");
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>📡 Student Location Info</h2>

      <p><strong>Your IP Address:</strong> {ip || "Fetching..."}</p>

      {inCollege === null && <p>Checking your GPS location...</p>}
      {inCollege !== null && (
        <p>
          <strong>College Status:</strong> {inCollege ? "✅ Inside college area" : "❌ Outside college area"}
        </p>
      )}

      {distance !== null && (
        <p><strong>Distance from college:</strong> {distance.toFixed(3)} km</p>
      )}
    </div>
  );
};

export default AttendanceCheck;
