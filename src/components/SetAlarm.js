import React, { useContext } from "react";
import audio1 from "../audio/bright-phone-ringing-3-152490.mp3";
import audio2 from "../audio/alarm-church-bell-18533.mp3";
import audio3 from "../audio/attention_tone_sm30-96953.mp3";
import audio4 from "../audio/din-alarm-european-74887.mp3";
import audio5 from "../audio/old-mechanic-alarm-clock-140410.mp3";
import "../responsive.css";
import { dataContext } from "../contexts/DataController";
let playingAudios = [];

export default function Alarm() {
   let ContextData = useContext(dataContext);

   let handlePause = () => {
      //This will pause and remove all the audios previously selected
      if (playingAudios) {
         console.log(playingAudios);
         playingAudios.forEach((storedAudio) => {
            storedAudio.pause();
         });
         playingAudios = [];
      }
   };
   let handleSelctedAudio = () => {
      handlePause();
      let audioOptions = document.getElementById("alarm_audio");
      if (audioOptions.value === "custom-audio") {
         //This will handle choose from device option
         let fileSelector = document.createElement("input");
         fileSelector.type = "file";
         fileSelector.accept = "audio/*";
         fileSelector.click();
         fileSelector.addEventListener("change", () => {
            let selectedFile = fileSelector.files;
            let fileReader = new FileReader();
            fileReader.onload = () => {
               //After completion of reading the audio file, it will be played and added to option list
               let audioUrl = fileReader.result;
               let customAudio = new Audio(audioUrl);
               let newOption = document.createElement("option");
               newOption.value = audioUrl;
               newOption.innerHTML = selectedFile[0].name;
               let lastOption = document.getElementById("custom-audio");
               audioOptions.insertBefore(newOption, lastOption);
               newOption.selected = true;
               handlePause();
               customAudio.play();
               playingAudios.push(customAudio);
            };
            fileReader.readAsDataURL(selectedFile[0]); //It will read the file and convert it into a Base64-encoded representation, that acts as URL to the file (Asynchronusly)
         });
      } else {
         let currentMusic = new Audio(audioOptions.value);
         currentMusic.play();
         playingAudios.push(currentMusic);
      }
   };

   let handleSetAlarm = () => {
      //Handles the click on 'Set Alarm' Button
      handlePause();
      let inputPercentage = document.getElementById("percentage");
      if (inputPercentage.value && inputPercentage.value < 100 && inputPercentage.value > 0) {
         let selectedPercentage = inputPercentage.value;
         let URLOfSelectedAudio = document.getElementById("alarm_audio").value;
         ContextData.recieveUserInput(selectedPercentage, URLOfSelectedAudio);
         ContextData.setShowSetAlarm(false);
         ContextData.setShowSavedAlarm(true);
      } else {
         alert("Please enter valid battery percentage");
         inputPercentage.value = null;
         inputPercentage.focus();
      }
   };

   let handleClose = () => {
      ContextData.setShowSetAlarm(false);
      ContextData.setShowSavedAlarm(true);
      handlePause();
   };
   return (
      <div className="setAlarmContainer absolute left-1/4 top-16 z-30 flex w-2/4 overflow-hidden rounded-xl border-2 border-black">
         <div className="w-full">
            <div className=" relative flex h-14 w-full bg-blue-900 p-2 px-[1rem] pt-[1rem] text-white">
               <label htmlFor="percentage">Enter the battery Percentage:</label>
               <input
                  type="number"
                  max={100}
                  min={0}
                  id="percentage"
                  className="absolute right-2 h-8 w-20 rounded-md border-[1px] border-gray-400 text-center text-black outline-none"
                  autoFocus
               />
            </div>
            <div className="relative flex h-14 w-full bg-blue-900 p-2 px-[1rem] text-white">
               <label htmlFor="">Choose Alarm</label>
               <select
                  id="alarm_audio"
                  className=" absolute right-2 mx-auto w-24 rounded-md bg-sky-950 text-center text-white outline-none"
                  onChange={handleSelctedAudio}
               >
                  <option value={audio1}>Bright-phone-ringing</option>
                  <option value={audio2}>Church-bell</option>
                  <option value={audio3}>Attention_tone</option>
                  <option value={audio4}>Din-alarm-european</option>
                  <option value={audio5}>Old-mechanic-alarm</option>
                  <option value="custom-audio" id="custom-audio" className=" font-bold text-white">
                     Choose from device
                  </option>
               </select>
            </div>
            <div className="flex justify-center gap-4 bg-blue-900 p-2">
               <button
                  onClick={handleSetAlarm}
                  className=" rounded-[10px] bg-white px-[1rem] py-[5px] hover:bg-green-200"
               >
                  Set Alarm
               </button>
               <button
                  onClick={handleClose}
                  className="rounded-[10px] bg-white px-[1rem] py-[5px] hover:bg-red-200"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
}
