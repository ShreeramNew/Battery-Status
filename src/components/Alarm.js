import React from "react";
import audio from "../audio/bright-phone-ringing-3-152490.mp3";

export default function Alarm() {
   let displayNotification = async () => {
      if ("Notification" in window) {
         let permission = await Notification.requestPermission();
         if (permission == "granted") {
            new Notification("Alert", { body: "Your charge is Full" });
            alertUser();
         }
      } else {
         console.log("Notification not supported");
      }
   };
   let alertUser = () => {
      let alarm = new Audio(audio);
      alarm.play();
   };

   return (
      <div className="absolute z-30 top-16 left-1/4 w-2/4  border-black border-2 flex">
         <div className="w-full">
            <div className=" flex h-14 bg-blue-400 p-2 w-full relative">
               <label htmlFor="percentage">Enter the battery Percentage:</label>
               <input
                  type="number"
                  max={100}
                  min={0}
                  id="percentage"
                  className="border-black border-2 w-20 text-center h-8 absolute right-2"
               />
            </div>
            <div className="flex p-2 w-full bg-blue-700 relative">
                <label htmlFor="">Choose Alarm</label>
                <select className=" mx-auto  w-20 absolute right-2">
                    <option value="">Audio1</option>
                    <option value="">Audio1</option>
                    <option value="">Audio1</option>
                    <option value="">Audio1</option>
                </select>
            </div>
            <div className="bg-blue-900 flex justify-center">
                  <button className=" bg-white p-2">Set Alarm</button>
            </div>

         </div>
      </div>
   );
}
