import { useState } from "react";
import api from "../api";
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