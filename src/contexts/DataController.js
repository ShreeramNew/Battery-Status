/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const dataContext = createContext();
export default function DataController(props) {
   const [showSetAlarm, setShowSetAlarm] = useState(false);
   const [showSavedAlarm,setShowSavedAlarm]=useState(true)
   const [editID, setEditID] = useState(null);
   const [reRender,setReRender]=useState(0)

   let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
   const recieveUserInput = (percentage, Path) => {
      //If the newInput is to edit, then 'if' block is executed,else new alarm is created 
      if (editID) {
         savedAlarms.forEach((alarm) => {
            if (alarm.uniqueId === editID) {
               alarm.percentage = percentage;
               alarm.audioPath = Path;
               alarm.isOn = true;
            }
         });
         setEditID(null);
         localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
      } else {
         let newAlarm = {
            uniqueId: uuidv4(),
            percentage: percentage,
            audioPath: Path,
            isOn: true,
         };
         // console.log(newAlarm);
         savedAlarms.push(newAlarm);
         localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
         console.log(JSON.parse(localStorage.getItem("savedAlarms")));
      }
   };
   let data = {
      showSetAlarm: showSetAlarm,
      setShowSetAlarm: setShowSetAlarm,
      recieveUserInput: recieveUserInput,
      editID: editID,
      setEditID: setEditID,
      reRender:reRender,
      setReRender:setReRender,
      showSavedAlarm:showSavedAlarm,
      setShowSavedAlarm:setShowSavedAlarm
   };
   return <dataContext.Provider value={data}>{props.children}</dataContext.Provider>;
}
