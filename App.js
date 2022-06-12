import "./style.css";
import Otp from "./otp";
import Verification from "./Verification";
import Home from "./home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Otp />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

