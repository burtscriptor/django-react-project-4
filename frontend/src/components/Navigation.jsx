// Todo
// responsive design needs to be improved
// Drop down menu?

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect } from 'react'

const Navigation = () => {
    
    return (
        <div>
            <Navbar expand='lg' bg='primary' data-bs-theme='dark' className='bg-body-tertiary'>
              <Container>
                <Navbar.Brand href="#home">Record Climber</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href='/dashboard'>Dashboard</Nav.Link> 
                        <Nav.Link href='/'>Start Session</Nav.Link> 
                        <Nav.Link href='/inspiration'>Inspiration</Nav.Link>
                        <Nav.Link href='/logout'>Logout</Nav.Link>  
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;