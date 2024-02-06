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
      <div className=" border-black border-2 h-fit min-h-40 max-h-40 mt-10 overflow-y-scroll w-2/4 absolute top-16 left-1/4 rounded-md bg-gray-600 hide-scroll-bar p-1">
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
            className=" w-8 h-8 rounded-full sticky bg-blue-950 overflow-hidden border-2 bottom-1 m-auto border-black "
         >
            <h1 className=" text-center text-zinc-50 scale-150 m-0 pb-1">+</h1>
         </div>
         {showClearAll && (
            <button
               onClick={handleClearAll}
               className=" border-2 border-black  ml-2 mb-2 p-1 rounded-lg flex gap-2 hover:bg-red-500 text-white bg-gray-700"
            >
               Clear All{" "}
               <img className="w-6 h-6 rounded-full" alt="clear all" src={deleteIcon}></img>
            </button>
         )}
      </div>
   );
}
