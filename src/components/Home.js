import React, { useEffect, useState } from "react";

import BatteryAnimation from "./BatteryAnimation/BatteryAnimation";
export default function Home() {
   const [batteryStatus, setBatteryStatus] = useState(null);
   const [batteryIsCharging, setBatteryIsCharging] = useState(false);
   const [batteryLevel, setBatteryLevel] = useState(50);

   //Fetch current battery state
   let fetchBatteryStatus = async () => {
      let battery = await navigator.getBattery();
      setBatteryIsCharging(battery.charging);
      setBatteryLevel(battery.level * 100);

      //Determine wether battery is charging or not
      battery.addEventListener("chargingchange", () => {
         setBatteryIsCharging(battery.charging);
      });

      //Determine the battery charge level on change
      battery.addEventListener("levelchange", () => {
         setBatteryLevel(battery.level * 100);
      });
   };

   useEffect(() => {
      fetchBatteryStatus();
   }, []);

   useEffect(() => {
      setBatteryStatus(batteryIsCharging ? "Charging" : "Not Charging");
   }, [batteryIsCharging]);

   return (
      <>
         <div className="flex justify-center items-center h-screen border-black border-2">
            <div className="flex mt-28 gap-x-10 flex-row justify-center align-middle bg-blue-200 text-white border-black border-2 w-1/2">
               <div className="border-black border-2 mt-10 bg-blue-800 w-1/4 min-h-1/4">
                  <BatteryAnimation charge={batteryLevel}/>
                  <h1>You Battery Charge Level is {parseInt(batteryLevel)}%</h1>
               </div>
            </div>
         </div>
      </>
   );
}
