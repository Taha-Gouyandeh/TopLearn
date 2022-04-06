import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { cleareUser } from "../../actions/user";

const Logout = () => {
    const navigate=useNavigate();

    const dispatch=useDispatch()
    useEffect(()=>{
        localStorage.removeItem("token")
        dispatch(cleareUser())
        navigate("/", { replace: true });

    },[])

    return null;
};

export default Logout;
