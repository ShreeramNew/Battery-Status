import React, { useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const dataContext = createContext();
export default function DataController(props) {
   const [showSetAlarm, setShowSetAlarm] = useState(false);
   const recieveUserInput = (percentage, Path) => {
      let newAlarm = {
         uniqueId: uuidv4(),
         percentage: percentage,
         audioPath: Path,
         isOn: true,
      };

      let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
      savedAlarms.push(newAlarm);
      localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
      console.log(JSON.parse(localStorage.getItem("savedAlarms")));
   };
   let data = {
      showSetAlarm: showSetAlarm,
      setShowSetAlarm: setShowSetAlarm,
      recieveUserInput: recieveUserInput,
   };
   return <dataContext.Provider value={data}>{props.children}</dataContext.Provider>;
}
