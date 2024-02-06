import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../../contexts/DataController";
import EachSavedAlarm from "../EachSavedAlarm";
import defaultAlarm from "../../audio/old-mechanic-alarm-clock-140410.mp3";
import deleteIcon from "../../images/deleteIcon.png";
import "./ShowSavedAlarmStyle.css";

export default function ShowSavedAlarm() {
   let ContextData = useContext(dataContext);
   const [showClearAll, setShowClearAll] = useState(false);

   let handlePlusSignClick = () => {
      ContextData.setShowSetAlarm(true);
      ContextData.setShowSavedAlarm(false);
   };

   let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
   if (savedAlarms) {
      savedAlarms = JSON.parse(localStorage.getItem("savedAlarms")).reverse();
   } else {
      //If savedAlarms is empty, create a default alarm
      let newAlarm = {
         uniqueId: "a-nhd-ggdgde-23-7374",
         percentage: 93,
         audioPath: defaultAlarm,
         isOn: true,
      };
      savedAlarms = [newAlarm];
      localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
   }

   useEffect(() => {
      if (savedAlarms && savedAlarms.length > 1) {
         setShowClearAll(true);
      } else {
         setShowClearAll(false);
      }
   }, [savedAlarms]);

   let handleClearAll = () => {
      //Delete all the alarm
      localStorage.clear();
      ContextData.setReRender((prevValue) => prevValue + 1); //trigger re-render
   };
   useEffect(() => {}, [ContextData.reRender]);

   return (
      <div className=" hide-scroll-bar absolute left-1/4 top-16 mt-10 h-fit max-h-40 min-h-40 w-2/4 overflow-y-scroll rounded-md border-2 border-black bg-gray-600 p-1">
         {savedAlarms &&
            savedAlarms.map((SavedAlarm) => {
               return (
                  <EachSavedAlarm
                     key={SavedAlarm.uniqueId}
                     uniqueId={SavedAlarm.uniqueId}
                     percentage={SavedAlarm.percentage}
                  />
               );
            })}

         <div
            onClick={handlePlusSignClick}
            className=" sticky bottom-1 m-auto size-8 overflow-hidden rounded-full border-2 border-black bg-blue-950 "
         >
            <h1 className=" m-0 scale-150 pb-1 text-center text-zinc-50">+</h1>
         </div>
         {showClearAll && (
            <button
               onClick={handleClearAll}
               className=" mb-2 ml-2  flex gap-2 rounded-lg border-2 border-black bg-gray-700 p-1 text-white hover:bg-red-500"
            >
               Clear All{" "}
               <img className="size-6 rounded-full" alt="clear all" src={deleteIcon}></img>
            </button>
         )}
      </div>
   );
}
