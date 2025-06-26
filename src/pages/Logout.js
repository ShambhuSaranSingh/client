import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../config";
import { useDispatch } from "react-redux";
import { CLEAR_USER } from "../redux/user/actions";

function Logout({updateUserDetails}){
    const Navigate = useNavigate();
    const handleLogout = async () => {
        try{
            await axios.post(`${serverEndpoint}/auth/logout`, {}, {
                withCredentials: true, // to send cookies with the request
            });
            dispatchEvent({
                type: CLEAR_USER
            });
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