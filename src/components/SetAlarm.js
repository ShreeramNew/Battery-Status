import React, { useContext } from "react";
import audio1 from "../audio/bright-phone-ringing-3-152490.mp3";
import audio2 from "../audio/alarm-church-bell-18533.mp3";
import audio3 from "../audio/attention_tone_sm30-96953.mp3";
import audio4 from "../audio/din-alarm-european-74887.mp3";
import audio5 from "../audio/old-mechanic-alarm-clock-140410.mp3";
import { dataContext } from "../contexts/DataController";
let playingAudios = [];

export default function Alarm() {
   let ContextData = useContext(dataContext);
   let displayNotification = async () => {
      if ("Notification" in window) {
         let permission = await Notification.requestPermission();
         if (permission === "granted") {
            new Notification("Alert", { body: "Your charge is Full" });
            alertUser();
         }
      } else {
         console.log("Notification not supported");
      }
   };
   let alertUser = () => {};

   let handleSelctedAudio = () => {
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
      let inputPercentage = document.getElementById("percentage");
      if (inputPercentage.value) {
         let selectedPercentage = inputPercentage.value;
         let URLOfSelectedAudio = document.getElementById("alarm_audio").value;
         ContextData[0](selectedPercentage, URLOfSelectedAudio);
         ContextData[2](false);
      }
      else{
         alert("Please enter battery percentage")
         inputPercentage.focus();
      }
   };
   return (
      <div className="absolute z-30 top-16 left-1/4 w-2/4 border-black border-2 flex">
         <div className="w-full">
            <div className=" flex h-14 bg-blue-400 p-2 w-full relative">
               <label htmlFor="percentage">Enter the battery Percentage:</label>
               <input
                  type="number"
                  max={100}
                  min={0}
                  id="percentage"
                  className="border-black border-2 w-20 text-center h-8 absolute right-2"
               />
            </div>
            <div className="flex p-2 w-full bg-blue-700 h-14 relative">
               <label htmlFor="">Choose Alarm</label>
               <select
                  id="alarm_audio"
                  className=" mx-auto w-24 text-center absolute right-2 outline-none bg-sky-950 text-white"
                  onChange={handleSelctedAudio}
               >
                  <option value={audio1}>Bright-phone-ringing</option>
                  <option value={audio2}>Church-bell</option>
                  <option value={audio3}>Attention_tone</option>
                  <option value={audio4}>Din-alarm-european</option>
                  <option value={audio5}>Old-mechanic-alarm</option>
                  <option
                     value="custom-audio"
                     id="custom-audio"
                     className=" text-white font-bold  focus:text-orange-900 "
                  >
                     Choose from device
                  </option>
               </select>
            </div>
            <div className="bg-blue-900 flex justify-center p-2">
               <button onClick={handleSetAlarm} className=" bg-white p-2">
                  Set Alarm
               </button>
            </div>
         </div>
      </div>
   );
}
