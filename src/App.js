import { useContext } from "react";
import Alarm from "./components/SetAlarm";
import Home from "./components/Home";
import ShowSavedAlarm from "./components/ShowSavedAlarm";
import { dataContext } from "./contexts/DataController";

function App() {
  let ContextData=useContext(dataContext);
  return (
    <>
      <Home/>
      {ContextData[1]&&<Alarm/>}
      <ShowSavedAlarm/>
    </>
  );
}

export default App;
