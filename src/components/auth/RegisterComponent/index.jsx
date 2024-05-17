import { auth } from '../../../firebase';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function RegisterComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const notify = () => toast("Registered Successfully!!!");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if(userCredential)
        {
          navigate('/login' , {state:{Registered: true}});
          notify();
        }
      }).catch(error => console.log(error));
  }

  return (
    <div className='h-auto w-full'>
      <form onSubmit={handleSubmit}
        className='w-1/2 m-auto p-10 flex flex-col gap-7 mt-36 bg-slate-900 bg-opacity-70 rounded-2xl
        tablet:w-[90%]  mobile:w-full mobile:mt-28
        '
      >
        <h1 className='text-6xl mx-auto font-extrabold text-primary'>REGISTER</h1>
        <div className='flex flex-col '>
          <label className='text-primary w-[50%] mobile:w-[90%] mx-auto'>Email</label>
          <input type="email"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='w-[50%] mobile:w-[90%] mx-auto p-3 rounded-md outline-1 outline-primary-rgba border-2 border-lime-300'
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
        >REGISTER</button>
        <div className='flex justify-end mobile:flex-col'>
          <p className=' text-white text-sm mr-1'>If you already had an account ? </p>
          <Link to={'/login'} className="text-primary text-sm hover:underline"> Login now</Link>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default RegisterComponent;