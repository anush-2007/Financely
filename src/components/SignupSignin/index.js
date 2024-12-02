import React, { useState } from 'react'
import './styles.css';
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


function SignupSigninComponent() {
  const [name, setName] =useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");
  const [confirmPassword, setConfirmPassword] =useState("");
  const [loading, setLoading] =useState(false);

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("Confirm Password", confirmPassword);
    // Autheticate the user, or basically create a new account using email and password
    if(name != "" && email != "" && password != "" && confirmPassword != "") {
        if (password == confirmPassword) {
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
        } else {
          toast.error("Passwords do not match!")
          setLoading(false);
        }
      } else {
        toast.error("All fields are mandatory!")
        setLoading(false);
    }
    
  }
  return (
    <div className="signup-wrapper">
      <h2 className="title">
      Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
      </h2>
      <form>
        <Input 
          type="text"
          label={"Full Name"} 
          state={name} 
          setState={setName} 
          placeholder={"John Snow"} 
        />
        <Input 
          type="email"
          label={"Email"} 
          state={email} 
          setState={setEmail} 
          placeholder={"JohnSnow@gmail.com"} 
        />
        <Input
          type="password" 
          label={"Password"} 
          state={password} 
          setState={setPassword} 
          placeholder={"Example@123"}
        />
        <Input
          type="password" 
          label={"Confrim Password"} 
          state={confirmPassword} 
          setState={setConfirmPassword} 
          placeholder={"Example@123"} 
        />
        <Button 
        text={"Signup Using Email and Password"}
        onClick={signupWithEmail} />
        <p style={{ textAlign: "center" , margin:0 }}>or</p>
        <Button text={"Signup Using Google"} blue={true} />
      </form>
    </div>
  )
}

export default SignupSigninComponent