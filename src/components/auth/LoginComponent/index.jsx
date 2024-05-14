import { auth } from '../../../firebase';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/');
      }).catch(error => alert(error));
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <input type="email" 
          placeholder="enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input type="password" 
          placeholder="enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="text-white" type="submit">LOGIN</button>
        <Link to={'/register'} className="text-white">Move to register page</Link>
      </form>
    </div>
  );
}

export default LoginComponent;