import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React, { useState, useEffect } from 'react'

const Navigation = () => {
    const [isAuth, setIsAuth] = useState(false)
    
    // useEffect(() => {
    //     console.log(isAuth)
    //     if(localStorage.getItem('access_token') !== null ) {
    //         setIsAuth(true)
    //     }
    // }, [isAuth])

    return (
        <div>
            <Navbar bg='dark' variant='dark'>
            <Nav className='me-auto'>
                   <Nav.Link href='/dashboard'>Dashboard</Nav.Link> 
                </Nav>
                <Nav className='me-auto'>
                   <Nav.Link href='/'>Session</Nav.Link> 
                </Nav>
                <Nav className='me-auto'>
                    <Nav.Link href='/inspiration'>Inspiration</Nav.Link>
                </Nav>
                <Nav>
                   <Nav.Link href='/logout'>Logout</Nav.Link>  
                </Nav>
               
            </Navbar>
        </div>
    );
};

export default Navigation;