import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Inspiration = () => {
const [APOD, setAPOD] = useState(null)
const [PInSpace, setPInSpace] = useState(null)

useEffect(() => {
    console.log('effect called')
   const NASA_CALL = async () => {
           const res = await axios
            .get(
                'https://api.nasa.gov/planetary/apod?api_key=xPqRVxbLwdb2geB1ZR7QKEEKfyMnOE0cDhz8DjIi'
                );
                const res1 =  await axios
                .get(
                    'http://api.open-notify.org/astros.json'
                    );
                    setPInSpace(res1.data)
                    setAPOD(res.data)
                    console.log(res1.data)
                    console.log(PInSpace)
                };
                NASA_CALL()    
    }   
,[] );

    return(
        <>    
        {APOD && APOD.url ? 
        <div className='justify-content-center align-items-center'>
        <Container fluid>
            <Row>
                <Col>
            <Card style={{ width: '70rem' }}>
         <Card.Img variant="top" src={APOD.url} fluid />
        <Card.Body>
        <Card.Title>This is '{APOD.title}' taken by {APOD.copyright}</Card.Title>
        <Card.Text>
       {APOD.explanation}
       </Card.Text>
      </Card.Body>
      </Card>
      </Col>
      </Row>
      </Container>
      </div>
        : <p>Loading...</p>}

        {PInSpace && PInSpace.people ? (
            <Container fluid>
                <Card>
                <Row>
                    <Col className="text-center">
                <Card.Title >Number of people in space: {PInSpace.number}</Card.Title>
                
                {Array.isArray(PInSpace.people) && PInSpace.people.map((person, index) => (
                   <Card.Text key={index}>{person.name} on the {person.craft}</Card.Text>
                ))}
                </Col>
                </Row>
                </Card>
            </Container>
           
        ) : <p>Loading...</p> }
        
        </>
    )
}
export default Inspiration;