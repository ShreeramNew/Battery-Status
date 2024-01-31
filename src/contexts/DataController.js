import React, { useState } from "react";
import { createContext } from "react";

export const dataContext = createContext();
export default function DataController(props) {
   const [showSetAlarm, setShowSetAlarm] = useState(false);
   const recieveUserInput = (percentage, Path) => {
      let newAlarm=[percentage, Path];
      let savedAlarms=JSON.parse(localStorage.getItem('savedAlarms'));
      if(savedAlarms){
        savedAlarms.push(newAlarm)
        localStorage.setItem('savedAlarms',JSON.stringify(savedAlarms))
        console.log(JSON.parse(localStorage.getItem('savedAlarms')));
      }
      else{
         let savedAlarms=[newAlarm];
         localStorage.setItem('savedAlarms',JSON.stringify(savedAlarms))
      }
      
   };
   return (
      <dataContext.Provider value={[recieveUserInput, showSetAlarm, setShowSetAlarm]}>
         {props.children}
      </dataContext.Provider>
   );
}
