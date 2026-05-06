import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cockpit from "./Cockpit";
import LandingPage from "./LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cockpit" element={<Cockpit />} />
      </Routes>
    </BrowserRouter>
  );
}
