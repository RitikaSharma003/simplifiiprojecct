import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Verification() {
  const location = useLocation();
  let nav = useNavigate();
 
  var mob = location.state;
  const [OTP, setOTP] = useState();
  const [timerem, settimerem] = useState(30);

  const sendcode = () => {
    console.log(mob);
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
        settimerem(30);
        return nav("/verify", { state: mob });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (location.state === null) {
      

      nav("/");
    }
  }, []);

  useEffect(() => {
    if (timerem === 0) {
      
      settimerem(null);
    }

    if (!timerem) return;

    const intervalId = setInterval(() => {
      settimerem(timerem - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerem]);

  const verifyOTP = () => {
    if (OTP != 260599) {
      alert("Wrong OTP input ");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var material = JSON.stringify({
      username: mob,
      password: OTP,
      os: "ANDROID"
    });

    var optionsofrequest = {
      method: "POST",
      headers: myHeaders,
      body: material,
      redirect: "follow"
    };

    fetch(
      "https://agcare.platform.simplifii.com/api/v1/admin/authenticate",
      optionsofrequest
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result["msg"] === "Success") {
          return nav("/home", { state: "Success" });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="App">
      <h1 style={{ color: "#ffba40" }}>OTP Verification</h1>
      <p>OTP has been sent to +91 {mob}</p>
      <input
        className="Box"
        type="number"
        value={OTP}
        onChange={(e) => setOTP(e.target.value)}
      />
      <br />
      <br />
      <button className="ctnBtn" onClick={verifyOTP}>
        Continue
      </button>

      <p>
        {timerem === null ? (
          <div onClick={sendcode} style={{ cursor: "pointer" }}>
            Resend OTP
          </div>
        ) : (
          "00:" + timerem
        )}
      </p>
    </div>
  );
}
