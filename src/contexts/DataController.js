import React from "react";
import { createContext } from "react";

export const dataContext = createContext();
export default function DataController(props) {
   let data = [];
   const recieveUserInput = (percentage, Path) => {
      console.log(percentage, Path);
   };
   data.push(recieveUserInput);
   return <dataContext.Provider value={data}>{props.children}</dataContext.Provider>;
}
