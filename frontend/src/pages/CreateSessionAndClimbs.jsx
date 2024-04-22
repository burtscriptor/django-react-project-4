import { useState, useEffect } from "react";
import api from "../api";
import Climb from '../components/Climb'
import "../styles/Home.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Row';

function CreateSessionAndClimbs() {
    const [sessionId, setSessionId ] =useState(null)
    const [sessions, setSessions] = useState([])
    const [session, setSession] = useState({
        sessionId: "",
        type: "Fun",
        comments: "",
    });
   
    const [climb, setClimb] = useState({
        sessionId: 0,
        projectSendAttempt: false,
        sent: false,
        rests: 0,
        grade: 0,
        style: "",
        comments: "",
        lead: false,
    });

    const SESSION_TYPE = [ // may need to change back to array
        ['Project','Project'],
        ['Endurance','Endurance'],
        ['Skills','Skills'],
        ['Lead','Lead'],
        ['Fun','Fun']
    ]

    const STYLE = [ // may need to change back to array
        ['Vertical', 'Vertical'],
        ['Overhang','Overhang'],
        ['Roof','Roof'],
        ['Slab','Slab'],
    ]

    useEffect(() => {
        getSessions();
    }, []);
    

    const getSessions = () => {
        api
            .get("api/session/")
            .then((res) => res.data)
            .then((data)=> {
                data.reverse()
                setSessions(data)
                setSessionId(data[0].id)
                console.log('sessonS', data)
            });
    };

    
    const createSession = (event) => {
       console.log('from Cs', session)
        event.preventDefault()
        api
            .post('/api/session/', { ...session }) 
            .then((res) => {
                if (res.status === 201) alert('Session created!');
                else alert('Failed to make session.');
                getSessions();
            });
           
    };
    const handleChangeSession = (event) => {
        const { name, value, type, checked } = event.target;
        setSession({...session, [name]: value});
        
    }
    /////////////////////////////////////////////////////////////////////////////////
    


    const handleChange =(event) => {
        const { name, value, type, checked } = event.target;
        const val = type === 'checkbox' ? event.target.checked : event.target.value;
        setClimb({ ...climb, [name]: val });
    };
    const createClimb = (event) => {
        console.log('sessionId',sessionId)
        console.log('climb',climb)
        event.preventDefault();
        api
            .post("/api/climbs/", { ...climb, session: sessionId }) 
            .then((res) => {
                if (res.status === 201) alert("Climb created!");
                else alert("Failed to make climb.");
            })
            .catch((err) => alert(err));
    };




    return (
        <>       
         <Container fluid="md">
            <Row>
                <Col className ="text-center">
            <h2>Start Session</h2>
            <p>Select 'Session type' and add comments for example "Want to tick project today!"</p>
            </Col>
            </Row>
            </Container>
            <div>
            <form id='session' onSubmit={createSession}> 
            <select
                    id="type"
                    name="switch"
                    value={session.type}
                    onChange={handleChangeSession} 
                    >
                    <option value="">Session type</option>
                    {SESSION_TYPE.map(([code, label]) => (
                    <option key={code} value={code}>
                        {label}
                    </option>
                ))} 
            </select>
            <br/>
            <br/>
            <label htmlFor="comments">Session Comments</label>
                <br />
                <input
                    type="text"
                    id="comments"
                    name="comments"
                    required
                    onChange={handleChangeSession}
                    value={session.comments}
                />
                <p>Submit Session and start recording and submitting your climbs as you go!</p>
                <input type='submit' value='Submit Session'/>
                
            </form>
            

            <form id='climb' onSubmit={createClimb}>
                <h3>Climb</h3>
                <label htmlFor="session"></label>
                {/* <select onChange={(e) => setSessionId(e.target.value)}>
                    {sessions.map((session) => <option value={session.id} >{session.created_at}</option>)}
                </select> */}
                <label htmlFor="grade">Grade:</label>
                <br />
                <input
                    type="number"
                    id="grade"
                    name="grade"
                    required
                    onChange={handleChange}// handleChange
                    value={climb.grade}
                />
                <label htmlFor="goal">Project send attempt?:</label>
                <br />
                <input
                    type="checkbox"
                    id="goal"
                    name="goal"
                    onChange={handleChange}// setClimb(e.target.value) to handleChange 
                    value={climb.goal}
                />
                 <label htmlFor="lead">Lead?</label>
                <br />
                <input
                    type="checkbox"
                    id="lead"
                    name="lead"
                    onChange={handleChange}// setClimb(e.target.value) to handleChange 
                    value={climb.lead}
                />
                <label htmlFor="sent">Sent?</label>
                <br />
                <input 
                    type="checkbox"
                    id="sent"
                    name="sent"
                    value={climb.sent}
                    onChange={handleChange}// handlechange
                />
                <label htmlFor="style">Style:</label>
                <br />
                <br />
                <select
                    id="style"
                    name="style"
                    value={climb.style}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a style</option>
                    {STYLE.map(([code, label]) => (
                    <option key={code} value={code}>
                        {label}
                    </option>
                ))}
            </select>
                <br />
                <br />
                <label htmlFor="laps">Rests:</label>
                <br />
                <input
                    type="number"
                    id="rests"
                    name="rests"
                    required
                    onChange={handleChange}// handleChange
                    value={climb.rests}
                />  
            <br/>
            <br/>
               <label htmlFor="comments">Comments:</label>
                <br />
                <input
                    type="text"
                    id="comments"
                    name="comments"
                    required
                    onChange={handleChange}// handleChange
                    value={climb.comments}
                />
                <br />
                <input type="submit" value="Submit"/>
            </form>
            
        </div>
        </>

    );
}

export default CreateSessionAndClimbs;