import React, { useEffect, useState } from "react";
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
      <div>
         <h1>Your Battery is {batteryStatus}</h1>
         <h1>You Battery Charge Level is {batteryLevel}%</h1>
      </div>
   );
}
