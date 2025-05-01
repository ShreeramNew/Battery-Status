/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
// import OnOffSwitch from "./OnOffSwitch";
import { dataContext } from "../contexts/DataController";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { ConfigProvider, Switch } from "antd";

export default function EachSavedAlarm({ uniqueId, percentage, isOn }) {
   const [height, setHeight] = useState(3);
   // const [showEditandDelete, setShowEditAndDelete] = useState(false);
   let ContextData = useContext(dataContext);
   const [isChecked, setIsChecked] = useState(isOn);

   let handleClick = () => {
      setHeight((prevHeight) => {
         return prevHeight === 3 ? 5 : 3;
      });
   };

   useEffect(() => {
      // setShowEditAndDelete(height === 5 ? true : false);
   }, [height]);

   let handleEdit = () => {
      ContextData.setEditID(uniqueId);
      ContextData.setShowSetAlarm(true);
      ContextData.setShowSavedAlarm(false);
   };

   let handleDelete = () => {
      //Delete perticular alarm
      let confirmation = window.confirm("Are you sure want to delete?");
      if (confirmation) {
         let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
         savedAlarms.forEach((alarm) => {
            if (alarm.uniqueId === uniqueId) {
               savedAlarms.splice(savedAlarms.indexOf(alarm), 1);
            }
         });
         localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
         ContextData.setReRender((prevValue) => prevValue + 1); //Trigger re-render
      }
   };

   //-----------------------Handle checkbox on or off---------------------------------
   let handleCheckBox = (checked) => {
      //update 'isOn' of alarm, when checkbox value changes
      let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
      savedAlarms.forEach((alarm) => {
         if (alarm.uniqueId === uniqueId) {
            alarm.isOn = checked;
         }
      });
      localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
      setIsChecked(checked);
   };
   return (
      <div
         onClick={handleClick}
         className={`relative mt-1 flex w-full justify-start items-start rounded-lg border-2 border-black bg-slate-900 cursor-pointer transition-all duration-300 overflow-hidden`}
         style={{ height: `${height}rem` }}
      >
         <div className=" h-[5rem] w-full flex flex-col justify-between items-center pb-[10px]">
            <div className=" w-full flex justify-between items-center border- px-[12px] pt-[6px]">
               <div className="text-xl text-white">{percentage}%</div>
               <ConfigProvider
                  theme={{
                     components: {
                        Switch: {
                           colorPrimary: "green",
                           colorPrimaryHover: "green",
                        },
                     },
                  }}
               >
                  <Switch checked={isChecked} onChange={handleCheckBox} />
               </ConfigProvider>
            </div>
            <div className=" w-full h-fit  flex justify-start items-center px-[1rem] gap-2 border-">
               <div
                  onClick={handleEdit}
                  title="Edit"
                  className="size-6 hover:scale-105 flex justify-center items-center bg-white rounded-full text-gray-700 cursor-pointer "
               >
                  <MdModeEditOutline />
               </div>
               <div
                  onClick={handleDelete}
                  title="Delete"
                  className="size-6 rounded-full hover:scale-105 flex justify-center items-center bg-white rounded-full text-gray-700 cursor-pointer "
               >
                  <MdDelete />
               </div>
            </div>
         </div>
      </div>
   );
}
