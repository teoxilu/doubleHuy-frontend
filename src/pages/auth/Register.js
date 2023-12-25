import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {toast} from "react-toastify";
import {useSelector } from "react-redux";


const Register = ({history}) => {
  const [email, setEmail] = useState("");
  const {user} = useSelector(state => ({...state}))

  useEffect(() => {
    if(user && user.token) history.push('/')
  }, [user, history])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `An email was sent to ${email}, please click the link in it to confirm your registration. `
    );

    //save user's email in local storage
    window.localStorage.setItem("emailForRegistration", email);

    //clear state
    setEmail("");
  };

  const registerform = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
        required
      />

      <br/>
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerform()}
        </div>
      </div>
    </div>
  );
};

export default Register;
