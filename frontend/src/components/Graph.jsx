import React from 'react';
import AreaChartComponent from './AreaChart';
import BarChartComponent from './BarChart';
import RadarChartComponent from './RadarChart';
import PieChartComponent from './PieChart';
import { Container, Row, Col } from 'react-bootstrap';
import "../styles/Graph.css"

const Graph = ({ climbsPerSession, gradeData, climbsArray, sessionsByType, climbsByStyle }) => {
    return (
        <Container fluid id='graphs'>
            <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                    <AreaChartComponent climbsPerSession={climbsPerSession} />
                </Col>
                <Col className="d-flex justify-content-center">
                    <BarChartComponent gradeData={gradeData} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                    <RadarChartComponent climbsArray={climbsArray} />
                </Col>
                <Col className="d-flex justify-content-center">
                    <PieChartComponent sessionsByType={sessionsByType} climbsByStyle={climbsByStyle} />
                </Col>
            </Row>
        </Container>
    );
};

export default Graph;
