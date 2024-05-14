import React, { useState } from 'react';

function SettingNav({ setSelectedSection }) {
  const [selected, setSelected] = useState('general');

  const handleSelection = (section) => {
    setSelected(section);
    setSelectedSection(section);
  };

  return (
    <div className="col-span-3">
      <ul className="text-white">
        <li
          className={`w-full px-9 py-5 hover:bg-slate-800 cursor-pointer 
            ${selected === 'general' ? 'bg-slate-800' : ''}`}
            onClick={() => handleSelection('general')}
        >General</li>
        <li
          className={`w-full px-9 py-5 hover:bg-slate-800 cursor-pointer
            ${selected === 'changePassword' ? 'bg-slate-800' : ''}`}
            onClick={() => handleSelection('changePassword')}
        >Change Password</li>
        <li
          className={`w-full px-9 py-5 hover:bg-slate-800 cursor-pointer
            ${selected === 'theme' ? 'bg-slate-800' : ''}`}
            onClick={() => handleSelection('theme')}
        >Theme</li>
      </ul>
    </div>
  );
}

export default SettingNav;