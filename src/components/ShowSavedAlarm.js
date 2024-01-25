import React from "react";

export default function ShowSavedAlarm() {
   return (
      <div className="absolute top-16 left-1/4 z-10 w-1/2 h-32 border-black border-2 flex overflow-y-scroll">
         <div className="w-full">
            <div className=" flex h-14 bg-blue-400 items-center p-2 w-full relative">
               <h2>98%</h2>
               <input type="checkbox" className="absolute right-0" />
            </div>
            <div className=" flex h-14 bg-blue-400 items-center p-2 w-full relative">
               <h2>98%</h2>
               <input type="checkbox" className="absolute right-0" />
            </div>
            <div className=" flex h-14 bg-blue-400 items-center p-2 w-full relative">
               <h2>98%</h2>
               <input type="checkbox" className="absolute right-0" />
            </div>
         </div>
         <div className="border-black border-2 absolute w-9 h-9 rounded-full">
            <h1 className=" text-2xl">+</h1>
         </div>
      </div>
   );
}
