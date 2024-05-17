import { useState } from "react";
import SettingMain from "./SettingMain";
import SettingNav from "./SettingNav";

function SettingComponent() {

  const [selectedSection, setSelectedSection] = useState('general');

  return (
    <div className="grid grid-cols-12 bg-slate-900">
      <SettingNav 
        setSelectedSection={setSelectedSection}
      />
      
      <SettingMain 
        selectedSection={selectedSection}
      />
    </div>
  );
}

export default SettingComponent;