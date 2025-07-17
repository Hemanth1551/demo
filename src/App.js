import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

  // const [location, setLocation] = useState(null);
  // const [inCollege, setInCollege] = useState(null);

  const COLLEGE_COORDS = {
    lat: 16.5561096,
    lng: 81.9749443
  };
  const MAX_DISTANCE_KM = 0.5;


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
      navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const h = getDistanceFromCollege(lat, long);
      if (h <= MAX_DISTANCE_KM) {
            alert("your in clg");
          } else {
            alert("not clg");
          }
      alert(position.coords.latitude +" "+ position.coords.longitude);

    },
    (err) => {
      console.error(err);
    },
    {
      enableHighAccuracy: true,  // <--- Important!
      timeout: 10000,
      maximumAge: 0,
    }
  );
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
