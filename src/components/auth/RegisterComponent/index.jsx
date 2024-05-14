import { auth } from '../../../firebase';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function RegisterComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      }).catch(error => console.log(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>REGISTER</h1>
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
        <button className="text-white" type="submit">REGISTER</button>
        <Link to={'/login'} className="text-white">Move to login page</Link>
      </form>
    </div>
  );
}

export default RegisterComponent;