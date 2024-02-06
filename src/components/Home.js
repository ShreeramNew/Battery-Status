import React, { useEffect, useState } from "react";
import "../responsive.css"
import BatteryAnimation from "./BatteryAnimation/BatteryAnimation";
export default function Home() {
   const [batteryIsCharging, setBatteryIsCharging] = useState(false);
   const [batteryLevel, setBatteryLevel] = useState(50);
   let playingAudios = [];

   //Fetch current battery state
   let fetchBatteryStatus = async () => {
      let battery = await navigator.getBattery();
      setBatteryIsCharging(battery.charging);
      setBatteryLevel(battery.level * 100);

      console.log(battery.chargingTime/60);
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
         <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-950  via-purple-100 via-10% to-blue-950 to-80% ggg" style={{background:'linear-gradient(to bottom right,rgb(13, 4, 64),rgb(112, 93, 160),rgb(1, 1, 65))'}}>
            <div className="flex mt-28 gap-x-10 flex-row justify-center align-middle w-1/2 h-1/3" id="batteryAnimationContainer">
                  <BatteryAnimation charge={batteryLevel} isCharging={batteryIsCharging} />
            </div>
            <button onClick={handleDummyButton} id="dummyButton" className=" hidden"></button>
         </div>
      </>
   );
}
