import GeneralSetting from "./GeneralSetting";
import PasswordSetting from "./PasswordSetting";
import ThemeSetting from "./ThemeSetting";


function SettingMain({ selectedSection, auth }) {
  return (
    <div className="col-span-9 px-9">
      {selectedSection === 'general' && <GeneralSetting auth={auth} />}
      {selectedSection === 'changePassword' && <PasswordSetting auth={auth} />}
      {selectedSection === 'theme' && <ThemeSetting auth={auth} />}
    </div>
  );
}

export default SettingMain;