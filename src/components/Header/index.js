import React, { useEffect } from 'react'
import './styles.css';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

function Header() {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  
  function logoutFnc() {
    try {
      signOut(auth)
      .then (() => {
        // Sign-out successfull.
        navigate("/");
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
        // An error happened.
      })
    } catch (error) {
      toast.error(error.message);
    }
    alert("Logout!");
  }

  return (
    <div className="navbar">
      <p className='logo'>Financely.</p>
      {user && (
        <p className='logo link' onClick={logoutFnc}>
        Logout
      </p>
      )}
    </div>
  )
}

export default Header