/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import "../BatteryAnimation/animeStyle.css";
import chargingIcon from "../../images/Charging.png";
export default function BatteryAnimation(props) {
   useEffect(() => {
      document.querySelector(".charging").style.visibility = props.isCharging
         ? "visible"
         : "hidden";
   }, [props.isCharging]);
   let style = {
      height: `${parseInt(props.charge)}%`,
   };
   return (
      <div className="all-center container border-">
         <div className="battery all-center black-border z-10">
            <h1 id="charge-title">{parseInt(props.charge)}%</h1>
            <img src={chargingIcon} className="charging" alt="charging" />
            <div className="charge charge1" style={style}></div>
            <div className="charge charge2" style={style}></div>
            <div className="charge charge3" style={style}></div>
         </div>
         <div className="top black-border"></div>
         <div className="shadow"></div>
      </div>
   );
}
