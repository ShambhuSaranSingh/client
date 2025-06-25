import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../config";

function Logout({updateUserDetails}){
    const Navigate = useNavigate();
    const handleLogout = async () => {
        try{
            await axios.post(`${serverEndpoint}/auth/logout`, {}, {
                withCredentials: true, // to send cookies with the request
            });
            updateUserDetails(null); 
        }
        catch(error){
            console.error( error);
            Navigate('/error');
        }
    }

    useEffect(() =>{
        handleLogout();
    },[]);
}
export default Logout;