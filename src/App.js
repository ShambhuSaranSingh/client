import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Applayout from './layout/Applayout';
import Dashboard from './pages/Dashboard';
import Error from "./pages/Error"; 
import Logout from "./pages/Logout";
import Register from "./register";
import { useDispatch, useSelector } from 'react-redux';
import { ServerEndpoint } from "./config";
import { SET_USER } from "./redux/user/actions";
import { useEffect, useState } from "react";
import axios from "axios";
import { updateUserDetails } from "./redux/user/actions";
import { serverEndpoint } from "./config"; 

function App() {
  // const [userDetails, setUserDetails] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  

  const logout = async () => {
    try {
      const response=await axios.post(`${serverEndpoint}/auth/logout`, {}, {
        withCredentials: true
      });
      dispatch({
        action: 'SET_USER',
        payload: response.data.user
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const response = await axios.post(
          `${serverEndpoint}/auth/is-user-logged-in`,
          {},
          { withCredentials: true }
        );
        dispatch({
        action: 'SET_USER',
        payload: response.data.user
      })
      } catch (error) {
        console.error("Not logged in or error:", error);
      }
    };

    isUserLoggedIn();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <Applayout>
              <Home />
            </Applayout>
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          userDetails ? (
            <Dashboard logout={logout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />


      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <Applayout>
              <Login updateUserDetails={updateUserDetails} />
            </Applayout>
          )
        }
      />
     

      <Route
        path="/logout"
        element={
          userDetails ? (
            <Logout updateUserDetails={updateUserDetails} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/error"
        element={
          userDetails ? (
            <Error />
          ) : (
            <Applayout>
              <Error />
            </Applayout>
          )
        }
      />


      <Route
        path="/register"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <Applayout>
              <Register />
            </Applayout>
          )
        }
      />

    </Routes>
  );
}

export default App;
