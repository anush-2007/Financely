import React, { useState } from 'react'
import './styles.css';
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SignupSigninComponent() {
  const [name, setName] =useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] =useState("");
  const [confirmPassword, setConfirmPassword] =useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] =useState(false);
  const navigate = useNavigate();

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
            createDoc(user);
            navigate("/dashboard");
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

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);
    if( email != "" && password != "" ) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!");
        console.log("User Logged In", user);
        setLoading(false);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage);
      });
    } else {
      setLoading(false);
      toast.error("All fields are mandatory!")
    }
  }

  async function createDoc (user) {
    setLoading(true);
    //Make sure that the doc with the uid does not exist
    // Create a Doc
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef)
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false);
        toast.success("Doc Created!");
      }
      catch(e) {
        setLoading(false);
        toast.error(e.message);
      }
    }else {
      setLoading(false);
      toast.error("User already exists!");
    }
  }

  return (
    <>
    {loginForm ? 
      (
        <div className="signup-wrapper">
          <h2 className="title">
          Log In on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
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
            <Button 
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={loginUsingEmail} 
            />
            <p className="p-login" >or</p>
            <Button text={loading ? "Loading..." : "Login Using Google"} blue={true} />
            <p 
              className="p-login" 
              style={{ cursor: "pointer" }} 
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account? Click Here
            </p>
          </form>
        </div>
       ) : (
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
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail} 
            />
            <p className="p-login" >or</p>
            <Button text={loading ? "Loading..." : "Signup Using Google"} blue={true} />
            <p 
              className="p-login" 
              style={{ cursor: "pointer" }} 
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have An Account Already? Click Here
            </p>
          </form>
        </div>
      )}
      </> 
  )
}

export default SignupSigninComponent