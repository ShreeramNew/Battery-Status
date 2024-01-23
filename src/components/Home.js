import React, { useEffect, useState } from "react";
import charging from "../images/Battery.png";
import notCharging from "../images/Unplug.png";
import lowBattery from "../images/LowBattery.svg";
import unknownStatus from "../images/Unknown.svg"
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
         <div className="flex justify-center items-center h-screen border-black border-2 h-10">
            <div className="flex gap-x-10 flex-row justify-center align-middle bg-blue-200 text-white border-black border-2 w-1/2">
               <div className="border-black border-2 m-10 w-1/4 min-h-1/4 bg-red-500">
                  <img
                     src={batteryIsCharging ? charging : notCharging}
                     className=" bg-white"
                     alt=""
                  />
                  <h1>Your Battery is {batteryStatus}</h1>
               </div>
               <div className="border-black border-2 m-10 bg-blue-800 w-1/4 min-h-1/4">
                  <img
                     src={unknownStatus}
                     className=" bg-white"
                     alt=""
                  />
                  <h1>You Battery Charge Level is {batteryLevel}%</h1>
               </div>
            </div>
         </div>
      </>
   );
}
