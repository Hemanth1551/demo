import React, { useEffect, useState } from 'react';

const AttendanceCheck = () => {
  const [location, setLocation] = useState(null);
  const [inCollege, setInCollege] = useState(null);

  // Your college location
  const COLLEGE_COORDS = {
    lat: 16.556101,
    lng: 81.9789753
  };

  const MAX_DISTANCE_KM = 0.2; // 200 meters

  // Haversine distance function
  function getDistanceFromCollege(lat1, lon1) {
    const R = 6371;
    const lat2 = COLLEGE_COORDS.lat;
    const lon2 = COLLEGE_COORDS.lng;

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) *
              Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          const distance = getDistanceFromCollege(latitude, longitude);
          console.log(`Distance from college: ${distance.toFixed(3)} km`);

          if (distance <= MAX_DISTANCE_KM) {
            setInCollege(true);
          } else {
            setInCollege(false);
          }
        },
        error => {
          console.error("Geolocation error:", error);
          alert("Failed to get location");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div>
      <h2>College Attendance Check</h2>

      {location && (
        <p>Your location: {location.lat}, {location.lng}</p>
      )}

      {inCollege === null && <p>📡 Checking location...</p>}
      {inCollege === true && <p style={{ color: 'green' }}>✅ You are inside the college area.</p>}
      {inCollege === false && <p style={{ color: 'red' }}>❌ You are NOT in the college area.</p>}
    </div>
  );
};

export default AttendanceCheck;
