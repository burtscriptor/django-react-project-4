// After creating a session and logging some climbs (assoicated with that session)
// those climbs can be viewed and form the 'Session Details' 
// This component relies on useParams hook to access and destructure a number from the current URL
// The number in the URL is the sessionID  "<Link to={`/${session.id}`} key={session.id}>"" from the sessions model instance, and i want access to this number
// so that i can make a request to the server to get all the climbs that are assoicated with that particulare sessionID
// once that request is forefilled the data is stored in state. This component uses a number of array methods to extract key 
// information such as the number of climbs in the session, the style of the climbs, the hardest grade climbed.


// Todo
// move data extract to the backend
// add graphs? 
// finish styling


import api from "../api";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Accordion } from 'react-bootstrap';


const SessionDetails = () => {
    const [climbs, setClimbs] = useState([])
    const [sent, setSent] = useState([])
    const [projects, setProjects] = useState([])
    const [grade, setGrade] = useState([])
    const [favouriteStyle, setFavouriteStyle] = useState([])
    const [lead, setLead] = useState([])
    const { id } = useParams();
   

    useEffect(() => {
        const getClimbs = async () => {
            api 
                .get(`api/session/${id}/`)
                .then((res) => res.data)
                .then((data) => {
                    setClimbs(data)
                    console.log(data)
                    const sent= data.filter((climb) => climb.sent === true)
                    const project = data.filter((climb) => climb.project_send_attempt === true)
                    const lead = data.filter((climb) => climb.lead === true)
                    const grades = data.map(climb => climb.grade);
                    grades.sort((a, b) => b - a);
                    let style = data.map(climb => climb.style);
                    let favouriteStyleArray = style.reduce(function(a,b) {
                        return (
                            a[b] ? ++a[b] : (a[b] = 1),
                            a
                        );
                    }, [])
                    setSent(sent);
                    setProjects(project);
                    setGrade(grades);
                    setFavouriteStyle(favouriteStyleArray);
                    setLead(lead);
                });
        }
        getClimbs();
    }, []);

    return (
        <>
            <Container fluid className="mt-5">
                <Row className="justify-content-center">
                    <Col  xs={12} md={6} lg={4}>
                        <Card className="justify-content-center">
                            <Card.Body>
                                <Card.Title className="text-center">Overview</Card.Title>
                                <Card.Text className="mb-2 text-muted text-center">
                                    {climbs.length} climbs || {projects.length} project attempts || {sent.length} climbs sent || {grade[0]} Top grade || dominate style {Object.keys(favouriteStyle)[0]} || {lead.length} lead climbs
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            {climbs.length > 0 ?  
                climbs.map((climb,index) => (
                    <Container fluid className="mt-5"> 
                        <Row className="justify-content-center"> 
                            <Col xs={12} md={6} lg={4}> 
                                <Accordion key= {index} defaultActiveKey="1">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Climb {index + 1}</Accordion.Header>
                                        <Accordion.Body>
                                            <Card className="justify-content-center">
                                                <Card.Body>
                                                    <Card.Title>Style: {climb.style}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Grade: {climb.grade}</Card.Subtitle>
                                                    <Card.Text>
                                                        <ul>
                                                            <li>Lead? {climb.lead ? 'Yes' : 'No' }</li>
                                                            <li>Project send attempt? {climb.project_send_attempt? 'Yes'  : 'No' }</li>
                                                            <li>Sent? {climb.sent? 'Yes'  : 'No'} </li>
                                                            <li>Comments: {climb.comments}</li>
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Accordion.Body>
                                    </Accordion.Item>     
                                </Accordion>
                            </Col> 
                        </Row> 
                    </Container> 
                ))
                : <p>no climbs in session</p>
            }
        </>
    )
};

export default SessionDetails;
