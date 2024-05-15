import { useNavigate, Link, useLocation } from "react-router-dom";
import { auth } from '../../firebase';
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import defaultAvatar from '../../img/not_found.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HeaderAccount() {
  const [authUser, setAuthUser] = useState(null);
  const [displaySettings, setDisplaySettings] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  const location = useLocation();

  useEffect(() => {
    if (location.state?.loggedIn) {
      toast("Logged in Successfully!!!");
    }
  }, [location]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if(user){
        setAuthUser(user);
      }else{
        setAuthUser(null);
      }
    })

    return () => listen();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        // window.location.reload();
      })
      .catch(err => err.message);
  }

  return (
    <div className="tablet:absolute w-auto right-[11%]
      mobile:absolute mobile:right-[21%]
    ">
      <ToastContainer />
      { authUser ? (<div
        className="relative flex items-center gap-2 flex-1" 
        onMouseEnter={() => setDisplaySettings(true)}
        onMouseLeave={() => setDisplaySettings(false)}
      >
          <img 
            src={authUser.photoURL || defaultAvatar} 
            alt="User Avatar" 
            className="rounded-full w-10 h-10 cursor-pointer"
          />
          <div className={`w-36 absolute top-[120%] left-[-100px] right-[-20px] text-white
            ${displaySettings ? 'block' : 'hidden'}
          `}>
            <p className="text-white font-bold px-2 py-2 bg-emerald-400 text-center">{authUser?.displayName || 'John'}</p>
            <Link to={'/favorite'}>
              <h3 className="w-full bg-gray-900 px-2 py-2 hover:bg-primary-rgba text-center"
              
              >Favorite</h3>
            </Link>
            <Link to={'/settings'}>
              <h3 className="w-full bg-gray-900 px-2 py-2 hover:bg-primary-rgba text-center"
              
              >Settings</h3>
            </Link>
            <button className="w-full bg-gray-900 px-2 py-2 hover:bg-primary-rgba"
              onClick={handleSignOut}
            >Sign out</button>
            <span className="before:content-[' '] before:block before:w-full before:h-4 
            before:transparent before:absolute before:top-[-15px]"> 
            </span>
          </div>
        </div>) 
          :
      <button className="border-solid border-primary border-2 rounded-[1.25631rem] text-xs text-white py-1 px-2
        duration-300 hover:bg-primary-rgba hover:text-black
      "
      onClick={handleNavigate}
      >SIGN IN</button>}
    </div>
  );
}

export default HeaderAccount;