import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const SessionsIndex = ({ sessions }) => {
   
return (
    <>
    <Row xs={1} md={2} className="g-4">
    {sessions.map((session, index) =>
    <Col key={index}>
        <Link to={`/${session.id}`} key={session.id}>
            <Card>
                <Card.Body>
                    <Card.Title>Session {index + 1} - click anywhere to see climbs on this session</Card.Title>
                        <Card.Text>
                        <ul>
        <li>Session on {session.created_at}</li>
        <li>Type {session.type}</li>
        <li>Comments: {session.comments}</li> 
        </ul>

                        </Card.Text>
            </Card.Body>
            </Card>   
        </Link>
        </Col>
       
    )}
     </Row>
    </>
    
);

};

export default SessionsIndex;

