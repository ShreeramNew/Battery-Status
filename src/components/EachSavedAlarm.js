import React from "react";

export default function EachSavedAlarm(props) {
   return (
      <div className="w-full h-fit bg-blue-700">
         <div className="w-full h-4/6 bg-green-800 flex relative items-center">
            <div className="ml-5 mt-2 text-xl text-white">{props.percentage}%</div>
            <div className="absolute right-0">
               <input type="checkbox" name="" id="" />
            </div>
            <div className="w-6 h-6 bg-white absolute right-8">

            </div>
         </div>
      </div>
   );
}
