import React, { useContext, useEffect, useState } from "react";
import OnOffSwitch from "./OnOffSwitch";
import editIcon from "../images/EditShower.svg";
import deleteIcon from "../images/deleteIcon.png";
import { dataContext } from "../contexts/DataController";

export default function EachSavedAlarm(props) {
   const [height, setHeight] = useState(14);
   const [showEditandDelete, setShowEditAndDelete] = useState(false);
   let ContextData = useContext(dataContext);

   let handleClick = () => {
      setHeight((prevHeight) => (prevHeight === 14 ? 20 : 14));
   };
   useEffect(() => {
      setShowEditAndDelete(height === 20 ? true : false);
   }, [height]);

   let handleEdit = () => {
      ContextData.setEditID(props.uniqueId);
      ContextData.setShowSetAlarm(true);
   };

   let handleDelete = () => {
      let confirmation = window.confirm("Are you sure want to delete?");
      if (confirmation) {
         let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
         savedAlarms.forEach((alarm) => {
            if (alarm.uniqueId === props.uniqueId) {
               savedAlarms.splice(savedAlarms.indexOf(alarm), 1);
            }
         });
         localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
        ContextData.setReRender(prevValue=>prevValue+1)
      }
   };
   return (
      <div
         onClick={handleClick}
         className={`w-full h-${height} bg-green-800 border-2 border-black flex relative items-center`}
      >
         <div className="ml-5 mt-2 text-xl text-white absolute top-1">{props.percentage}%</div>
         <OnOffSwitch uniqueId={props.uniqueId} />
         {showEditandDelete && (
            <img
               onClick={handleEdit}
               src={editIcon}
               alt="Edit"
               className="w-6 h-6 absolute left-2 bottom-1 hover:scale-105"
               title="Edit"
            ></img>
         )}
         {showEditandDelete && (
            <img
               onClick={handleDelete}
               src={deleteIcon}
               alt="Edit"
               className="w-6 h-6 absolute left-10 bottom-1 hover:scale-105 rounded-full"
               title="Delete"
            ></img>
         )}
      </div>
   );
}
