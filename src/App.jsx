import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WorkflowText from "./components/WorkflowText";
import WorkflowImage from "./components/WorkflowImage";

const App = () => {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "text" ? <WorkflowText /> : <WorkflowImage />}
    </div>
  );
};

export default App;
