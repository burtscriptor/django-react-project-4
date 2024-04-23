// This is the gate way to the application and presents the user with a form for login in or creating a login
// This component is utilised by two pages - login, register - they both pass two props to the component 'method' and 'route'
// but the value each is different depending on which page is calling the component
// 'method' is evalated in a ternary expression 
// the value of method determines where the user is routed to
// useState stores the username and password and then this information is 'posted' to the server to side
// if the method is set to 'login' the username and password are compared to the User model, if the 'Username' is found
// then JWT tokens are generated on the server side and returned to the client in the response for to be stored in local storage
// anytime the user makes a 'post' or 'get' request to the server the the tokens are set with the request and evaluated for authenication with that 
// request
// if the 'method' is register then URL pattern for the 'post' request is different to login, and this is passed as a paramter to the api module 

import { useState } from "react";
import api from "../api";   // this module allows communicatipn between browser and server
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function FormComponent({ route, method, setUserName }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setUserName(username)
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access); 
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/dashboard")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
        <div className='login template d-flex justify-content-center align-items-center 200-w vh-100 bg-primary '>
            <div className='40-w p-5 rounded bg-white'>
        <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group  >
            <h1>{name}</h1>
             <div className ='mb-2'>              
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            </div>
            <div className ='mb-2'> 
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            </div>
            <div className='mb-2 justify-content-center align-items-center'>
            {loading && <LoadingIndicator />}
            <Button className=" form-button justify-content-center align-items-center" type="submit">
                {name}
              
            </Button>
            </div>
            {method === 'login' ? <Link to='/register' id='form-link' >Don't have an account? Sign up</Link> : null}
            
            </Form.Group>
        </Form>
        </div>
        </div>
        
        </>
    );
}

export default FormComponent;