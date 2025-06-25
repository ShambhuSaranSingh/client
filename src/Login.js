import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import { serverEndpoint } from "./config";

function Login({ updateUserDetails }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (formData.email.trim() === '') {
      isValid = false;
      newErrors.email = "Email is mandatory";
    }

    if (formData.password.trim() === '') {
      isValid = false;
      newErrors.password = "Password is mandatory";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const body = {
        email: formData.email,
        password: formData.password
      };
      const config = {
        withCredentials: true
      };

      try {
        const response = await axios.post(`${serverEndpoint}/auth/login`, body, config);
        updateUserDetails(response.data.user);
      } catch (error) {
        console.log(error);
        setErrors({ message: "Something went wrong" });
      }
    }
  };

  const handleGoogleSignin = async (authResponse)=>{
    try{
      const response = await 
axios.post(`${serverEndpoint}/auth/google-auth`,{
  idToken:authResponse.credentials},{
    withCredentials: true
  });
  updateUserDetails(response.data.userDetails);
  }catch(error){
    console.log(error);
    setErrors({message: 'Something went wrong while google signin'});
        }
      };
      const handleGoogleSigninFailure = async(error)=>{
        console.log(error);
        setErrors({message : 'Something went wrong while google signin'});
      };
  

  return (
    <div className="container text-center mt-4">
      {errors.message && <p><strong>{errors.message}</strong></p>}

      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>

        <div className="mt-3">
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
        </div>

        <div className="mt-4">
          <button type="submit">Submit</button>
        </div>

        <p className="mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        
      </form>

      <h2>OR</h2>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={handleGoogleSignin} onError={handleGoogleSigninFailure}/>
      </GoogleOAuthProvider>

    </div>
  );
}

export default Login;
