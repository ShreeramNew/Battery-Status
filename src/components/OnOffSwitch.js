import React from "react";

export default function OnOffSwitch(props) {
   let classNameForRound=props.uniqueId.replace(props.uniqueId[0],'a')
   let idForLabel=props.uniqueId.replace(props.uniqueId[0],'b').replace(props.uniqueId[4],'unique')

   let handleCheckBox = (e) => {
      let round = document.querySelector(`.${classNameForRound}`);
      console.log(e.target);
      round.style.left = e.target.checked ? "30px" : "0px";
      document.getElementById(`${idForLabel}`).style.backgroundColor = e.target.checked
         ? "green"
         : "grey";
   };

   return (
      <div className=" absolute right-20 top-1">
         <label
            htmlFor={props.uniqueId}
            id={idForLabel}
            className="absolute top-0.5 left-0.5 bg-gray-500 border-black border-2"
            style={{ paddingLeft: "60px", paddingBottom: "30px", borderRadius: "20px" }}
         >
            <div
               className={`${classNameForRound} border-black border-2 rounded-full absolute bg-white left-0`}
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
