// This component is used by App.jsx, all of the routes/components in the frontend are wrapped in this component thus
// making them children of this component, hence the prop 'children'
// Its role is to gate keep and enure that who ever is logged in has a validated and unexpired JWT token before being allowed
// navigate to another part of the web application
// It pivots on a function 'Auth' which checks the local storage for a valid and unexpired JWT token, which is called when the
// component 'mounts'
// if a valid one is found then the state isAuthorized is set to true, otherise it is set to false and the loggin page
// is rendered. Additionally if a token is found then it checks its expiration and if it is expired 
// then it sends a request to the server for a new token and when it is returned it puts it in local storage

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect } from "react";


function ProtectedRoute({ isAuthorized, setIsAuthorized, children }) {
   
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;