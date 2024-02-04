import React, { useEffect, useState } from "react";
import OnOffSwitch from "./OnOffSwitch";
import editIcon from "../images/EditShower.svg";

export default function EachSavedAlarm(props) {
   const [height, setHieght] = useState(14);
   const [showEditandDelete, setShowEditAndDelete] = useState(false);
   let handleClick = () => {
      setHieght((prevHeight) => (prevHeight === 14 ? 20 : 14));
   };
   useEffect(() => {
      setShowEditAndDelete(height === 20 ? true : false);
   }, [height]);

   let handleEdit = () => {
      alert("Hello");
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
            ></img>
         )}
      </div>
   );
}
