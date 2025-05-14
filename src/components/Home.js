import "../responsive.css";
import { useContext } from "react";
import Alarm from "../components/SetAlarm";
import React, { useEffect, useState } from "react";
import { dataContext } from "../contexts/DataController";
import BatteryAnimation from "./BatteryAnimation/BatteryAnimation";
import ShowSavedAlarm from "../components/ShowSavedAlarm/ShowSavedAlarm";

export default function Home() {
   let ContextData = useContext(dataContext);
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
      if (savedAlarms) {
         savedAlarms.forEach((alarm) => {
            if (alarm.isOn && parseInt(alarm.percentage) === parseInt(batteryLevel)) {
               let alarmAudio = new Audio(alarm.audioPath);
               playingAudios.push(alarmAudio);
               document.getElementById("dummyButton").click();
            }
         });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [batteryLevel]);

   let handleDummyButton = () => {
      let alarmAudio = playingAudios[playingAudios.length - 1];
      alarmAudio.play();
      displayNotification();
   };

   return (
      <div className=" w-full min-h-screen flex justify-center items-center bg-gradient-to-br  from-gray-950 via-gray-800  to-gray-950 ">
         <div className=" max-w-[23rem] md:max-w-[40rem] ipadMini:max-w-[60rem] ipad-air-portrait:max-w-[45rem] ipad-air:max-w-[70rem] lg:max-w-[78rem] mx-auto flex justify-between items-end gap-[10rem] border-">
            <ShowSavedAlarm />
            <div
               className=" w-fit flex h-fit flex-row justify-center gap-x-10 align-middle border-"
               id="batteryAnimationContainer"
            >
               <BatteryAnimation charge={batteryLevel} isCharging={batteryIsCharging} />
            </div>
            <button onClick={handleDummyButton} id="dummyButton" className=" hidden"></button>
         </div>
         {ContextData.showSetAlarm && <Alarm />}
      </div>
   );
}
