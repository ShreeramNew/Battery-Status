import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../../contexts/DataController";
import EachSavedAlarm from "../EachSavedAlarm";
// import defaultAlarm from "../../audio/old-mechanic-alarm-clock-140410.mp3";
// import deleteIcon from "../../images/deleteIcon.png";
import "./ShowSavedAlarmStyle.css";
import { MdDelete } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { PiEmpty } from "react-icons/pi";

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
      // let newAlarm = {
      //    uniqueId: "a-nhd-ggdgde-23-7374",
      //    percentage: 93,
      //    audioPath: defaultAlarm,
      //    isOn: true,
      // };
      savedAlarms = [];
      localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
   }

   useEffect(() => {
      if (savedAlarms && savedAlarms.length > 0) {
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
      <div className=" flex flex-col justify-start items-start relative border- border-red-900 w-[23rem] md:w-auto ">
         <div className=" text-xl text-gray-300 font-medium my-[1rem]">Saved Alarms</div>
         <div className=" min-w-full md:min-w-[40rem] lg:min-w-[50rem] hide-scroll-bar  h-[15rem] overflow-y-scroll rounded-md border-2 border-black bg-gray-600 p-1 ">
            {savedAlarms &&
               savedAlarms.map((SavedAlarm) => {
                  return (
                     <EachSavedAlarm
                        key={SavedAlarm.uniqueId}
                        uniqueId={SavedAlarm.uniqueId}
                        percentage={SavedAlarm.percentage}
                        isOn={SavedAlarm.isOn}
                     />
                  );
               })}
            {!showClearAll && (
               <div className=" w-full h-full flex justify-center items-center text-gray-400 gap-2 select-none">
                  <PiEmpty size={30} />
                  <span>No Saved Alarms</span>
               </div>
            )}
         </div>
         <div className=" absolute bottom-[-3rem] w-full border- b flex gap-[1rem] justify-center items-center ">
            <div
               onClick={handlePlusSignClick}
               className="overflow-hidden rounded-lg border-[1px] border-[#1b2b5f] bg-blue-950 hover:bg-[#1b2b5f] cursor-pointer w-[8rem] h-[2.3rem] flex justify-center items-center gap-1 "
            >
               <LuAlarmClock size={20} className=" text-zinc-100" />
               <div className=" m-0 text-center text-zinc-50">Add Alarm</div>
            </div>
            <button
               onClick={handleClearAll}
               className={`flex gap-1 justify-center items-center rounded-lg border-[1px] ${
                  showClearAll
                     ? "border-black bg-gray-700 text-white hover:bg-red-600"
                     : "border-gray-600 bg-gray-400 text-gray-300 cursor-not-allowed"
               }  p-1   h-[2.3rem] w-[8rem]`}
            >
               Clear All <MdDelete size={20} />
            </button>
         </div>
      </div>
   );
}
