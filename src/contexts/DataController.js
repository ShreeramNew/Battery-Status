import React, { useState } from "react";
import { createContext } from "react";

export const dataContext = createContext();
export default function DataController(props) {
   const [showSetAlarm, setShowSetAlarm] = useState(false);
   const savedAlarms = [];
   const recieveUserInput = (percentage, Path) => {
      savedAlarms.push([percentage, Path]);
      localStorage.setItem("savedAlarms",JSON.stringify(savedAlarms) );   
   };
   return (
      <dataContext.Provider value={[recieveUserInput, showSetAlarm, setShowSetAlarm]}>
         {props.children}
      </dataContext.Provider>
   );
}
