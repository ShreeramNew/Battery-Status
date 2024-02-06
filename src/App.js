/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import Alarm from "./components/SetAlarm";
import Home from "./components/Home";
import ShowSavedAlarm from "./components/ShowSavedAlarm/ShowSavedAlarm";
import { dataContext } from "./contexts/DataController";

function App() {
  let ContextData=useContext(dataContext);
  return (
    <>
      <Home/>
      {ContextData.showSetAlarm&&<Alarm/>}
      {ContextData.showSavedAlarm&&<ShowSavedAlarm/>}
    </>
  );
}

export default App;
