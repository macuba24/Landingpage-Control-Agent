import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cockpit from './Cockpit';

/**
 * Production (Vercel): `/` must load the Master Console only.
 * Do not add a static `public/index.html` — Vite would copy it over `dist/index.html` and break the SPA.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cockpit />} />
        <Route path="*" element={<Cockpit />} />
      </Routes>
    </Router>
  );
}
export default App;
