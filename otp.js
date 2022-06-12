import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  let nav = useNavigate();
  const [mob, setMob] = useState("");
  const inputdetails = () => {
    
    if (mob != 9786752313) {
      alert("input wrong no ");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var material = JSON.stringify({
      token: "717dc2d82d86be210bef206cf512dba9",
      mobile: mob,
      action: "Signin_or_Signup",
      timestamp: 1652446231059
    });

    var optionsofrequest = {
      method: "POST",
      headers: myHeaders,
      body: material,
      redirect: "follow"
    };

    fetch(
      "https://agcare.platform.simplifii.com/api/v1/get_otp",
      optionsofrequest
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return nav("/verify", { state: mob });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="App">
      <div>
        <img style={{ margin: "70px" }} src={require("./logo.jpeg")} />
        <input
          className="inputBox"
          placeholder="Enter mobile no"
          type="number"
          value={mob}
          onChange={(e) => setMob(e.target.value)}
        />
        <br />
        <br />
        <button className="ctnBtn" onClick={inputdetails}>
          Continue
        </button>
      </div>
    </div>
  );
}
