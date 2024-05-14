import Header from '../../components/Header'
import Footer from '../../components/Footer';
import SettingComponent from '../../components/auth/SettingComponent';

function Settings() {
  return (
    <div className='pt-24'>
      <Header />
      <SettingComponent />
      <Footer />
    </div>
  );
}

export default Settings;