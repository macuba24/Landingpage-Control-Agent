import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cockpit from './Cockpit';

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
