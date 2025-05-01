/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

export default function OnOffSwitch(props) {
   //Modifying the uniqueID so that it can be used for class name and also as id for label
   let classNameForRound = props.uniqueId.replace(props.uniqueId[0], "a");
   let idForLabel = props.uniqueId
      .replace(props.uniqueId[0], "b")
      .replace(props.uniqueId[4], "unique");

   let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));

   useEffect(() => {
      //This is useful to keep switch on or off according 'isOn' of that alarm
      savedAlarms.forEach((alarm) => {
         let round = document.querySelector(`.${classNameForRound}`);
         if (alarm.uniqueId === props.uniqueId) {
            document.getElementById(`${props.uniqueId}`).checked = alarm.isOn;
            round.style.left = alarm.isOn ? "30px" : "0px";
            document.getElementById(`${idForLabel}`).style.backgroundColor = alarm.isOn
               ? "green"
               : "grey";
         }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   let handleCheckBox = (e) => {
      let round = document.querySelector(`.${classNameForRound}`);
      round.style.left = e.target.checked ? "30px" : "0px";
      document.getElementById(`${idForLabel}`).style.backgroundColor = e.target.checked
         ? "green"
         : "grey";

      //update 'isOn' of alarm, when checkbox value changes
      let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
      savedAlarms.forEach((alarm) => {
         if (alarm.uniqueId === props.uniqueId) {
            alarm.isOn = e.target.checked;
         }
      });
      localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
   };

   return (
      <div className=" relative">
         <label
            htmlFor={props.uniqueId}
            id={idForLabel}
            className="relative border-2 border-black bg-gray-500 w-[rem] h-fit rounded-[10rem]"
         >
            <div
               className={`${classNameForRound} absolute left-0 rounded-full border-2 border-black bg-gray-400`}
               style={{ width: "26px", height: "26px", transition: "all 0.2s", top: "2px" }}
            ></div>
         </label>
         <input
            onChange={handleCheckBox}
            type="checkbox"
            name="onOrOff"
            id={props.uniqueId}
            className=" hidden"
         />
      </div>
   );
}
