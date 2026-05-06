import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Cockpit from './Cockpit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cockpit />} />
        <Route path="/cockpit" element={<Cockpit />} />
        <Route path="/info" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
export default App;
