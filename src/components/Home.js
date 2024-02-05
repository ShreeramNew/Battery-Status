import React, { useEffect, useState } from "react";

import BatteryAnimation from "./BatteryAnimation/BatteryAnimation";
export default function Home() {
   const [batteryStatus, setBatteryStatus] = useState(null);
   const [batteryIsCharging, setBatteryIsCharging] = useState(false);
   const [batteryLevel, setBatteryLevel] = useState(50);
   let playingAudios = [];

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

   let pauseAllAudio = () => {
      //This will pause all previously playing audio and removes them from playingAudios array 
      if (playingAudios) {
         playingAudios.forEach((audio) => {
            audio.pause();
         });
         playingAudios = [];
      }
   };

   let displayNotification = async () => {
      if ("Notification" in window) {
         let permission = await Notification.requestPermission();
         if (permission === "granted") {
            new Notification("Alert", { body: `Your charge reached ${batteryLevel}` });
         }
      } else {
         console.log("Notification not supported");
      }
   };


   useEffect(() => {
      //Check wether any saved alarm matches the current battery level
      let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
      pauseAllAudio();
      savedAlarms.forEach((alarm) => {
         if (alarm.isOn && parseInt(alarm.percentage) === parseInt(batteryLevel)) {
            let alarmAudio = new Audio(alarm.audioPath);
            playingAudios.push(alarmAudio);
            document.getElementById("dummyButton").click();
         }
      });
   }, [batteryLevel]);

   let handleDummyButton = () => {
      let alarmAudio = playingAudios[playingAudios.length - 1];
      alarmAudio.play();
      displayNotification();
   };



   return (
      <>
         <div className="flex justify-center items-center h-screen ">
            <div className="flex mt-28 gap-x-10 flex-row justify-center align-middle w-1/2 h-1/3 border-2 border-black">
                  <BatteryAnimation charge={batteryLevel} />
            </div>
            <button onClick={handleDummyButton} id="dummyButton" className=" hidden"></button>
         </div>
      </>
   );
}
