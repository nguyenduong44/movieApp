import { auth } from '../../../firebase';
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.state?.Registered) {
      toast("Registered in Successfully!!! Please Log in");
    }
  }, [location]);


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if(userCredential)
        {
            navigate('/', { state: { loggedIn: true } });
        }
      }).catch(error => alert(error));
  }

  return (
    <div className='h-auto w-full'>
      <ToastContainer />
      <form onSubmit={handleSubmit}
        className='w-1/2 m-auto p-10 flex flex-col gap-7 mt-36 bg-slate-900 bg-opacity-70 rounded-2xl
          tablet:w-[90%] mobile:w-full mobile:mt-28
        '
      >
        <h1 className='text-6xl mx-auto font-extrabold text-primary'>LOGIN</h1>
        <div className='flex flex-col '>
          <label className='text-primary w-[50%] mobile:w-[90%] mx-auto'>Email</label>
          <input type="email"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-[50%] mx-auto p-3 rounded-md outline-1 outline-primary-rgba border-2 border-lime-300
              mobile:w-[90%]
            '
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-primary w-[50%] mobile:w-[90%] mx-auto'>Password</label>
          <input type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='w-[50%] mobile:w-[90%] mx-auto p-3 rounded-md outline-1 outline-primary-rgba border-2 border-lime-300'
          />
        </div>
        <button 
          className="text-white mx-auto py-2 bg-primary-rgba w-[25%] rounded-lg font-bold"
          type="submit"
        >LOGIN</button>
        <div className='flex justify-end mobile:flex-col'>
          <p className=' text-white text-sm mr-1'>If you don't haven't register yet ? </p>
          <Link to={'/register'} className="text-primary text-sm hover:underline"> Register now</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;