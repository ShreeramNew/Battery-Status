import React from "react";
import "../BatteryAnimation/animeStyle.css"
export default function BatteryAnimation(props) {
   let k=parseInt(33.33)
   console.log(k);
   let style={
      "height":`${parseInt(props.charge)}%`
   }
   return (
      <div className="container all-center black-border">
         <div className="battery all-center black-border">
            <h1 id="charge-title">{parseInt(props.charge)}%</h1>
            <div className="charge charge1" style={style}></div>
            <div className="charge charge2" style={style}></div>
            <div className="top black-border">
            </div>
         </div>
      </div>
   );
}
