import api from "../api";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Accordion } from 'react-bootstrap';
import RadiarBarChartComponenet from "./RadialBarChart";

const SessionDetails = () => {
    const [climbs, setClimbs] = useState([])
    const [sent, setSent] = useState([])
    const [projects, setProjects] = useState([])
    const [grade, setGrade] = useState([])
    const [favouriteStyle, setFavouriteStyle] = useState([])
    const [lead, setLead] = useState([])
    const { id } = useParams();
    console.log(id)

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
                    console.log('FSA',favouriteStyleArray)
                    setFavouriteStyle(favouriteStyleArray);
                    setLead(lead);
                });
        }
        getClimbs();
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Text className="text-center">
                                    {climbs.length} climbs || {projects.length} project attempts || {sent.length} climbs sent || {grade[0]} Top grade || Dominate style {Object.keys(favouriteStyle)[0]} || {lead.length} lead climbs
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
