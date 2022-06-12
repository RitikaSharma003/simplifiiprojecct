import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const loc = useLocation();
  let nav = useNavigate();

  useEffect(() => {
    if (loc.state === null) {
    
      nav("/");
    }
  }, []);
  return (
    <div className="App">
      <h1> You have successfully logged-in</h1>
    </div>
  );
}