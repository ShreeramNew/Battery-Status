import React, { useContext } from "react";
import { dataContext } from "../contexts/DataController";
import EachSavedAlarm from "./EachSavedAlarm";
import {v4 as uuidv4} from 'uuid';

export default function ShowSavedAlarm() {
   let ContextData = useContext(dataContext);
   let handleClick = () => {
      ContextData[2](true);
   };
   let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms")).reverse();
   return (
      <div className=" border-black border-2 h-fit max-h-32 mt-10 overflow-y-scroll w-2/4  absolute top-16 left-1/4">
         {savedAlarms&&savedAlarms.map((SavedAlarm) => {
            return <EachSavedAlarm key={uuidv4()} uniqueId={uuidv4()} percentage={SavedAlarm[0] } />;
         })}

         <div
            onClick={handleClick}
            className=" w-8 h-8 rounded-full sticky bg-blue-950 overflow-hidden border-2 bottom-1 m-auto  border-black"
         >
            <h1 className=" text-center text-zinc-50 scale-150 m-0 pb-1">+</h1>
         </div>
      </div>
   );
}
