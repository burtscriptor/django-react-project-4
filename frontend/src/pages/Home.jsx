import { useState, useEffect } from "react";
import api from "../api";
import Climb from '../components/Climb'
import "../styles/Home.css"

function Home() {
    const [session, setSession] = useState({
        created: new Date(),
        type: "Fun",
        comments: "",
    });
    const [climbs, setClimbs] = useState([]);
    const [climb, setClimb] = useState({
        projectSendAttempt: false,
        sent: false,
        rests: 0,
        grade: 0,
        style: "",
        comments: "",
        lead: false,
    });

    const SESSION_TYPE = [ // may need to change back to array
        ['P', 'Project'],
        ['E', 'Endurance'],
        ['S', 'Skills'],
        ['L', 'Lead'],
        ['F', 'Fun']
    ]

    const STYLE = [ // may need to change back to array
        ['V', 'Vertical'],
        ['O','Overhang'],
        ['R','Roof'],
        ['S','Slab'],
    ]

    const handleChange =(event) => {
        const { name, value, type, checked } = event.target;
        const val = type === 'checkbox' ? event.target.checked : event.target.value;
        setClimb({ ...climb, [name]: val });
    }

    const handleChangeSession = (event) => {
        const { name, value, type, checked } = event.target;
        setSession({...climb, [name]: value });
        console.log(session)
    }

    const createSession = (event) => {
        console.log(session)
        event.preventDefault()
        api
            .post('/api/session/', { ...session }) 
            .then((res) => {
                if (res.status === 201) alert('Session created!');
                else alert('Failed to make session.');
            })
    }

    const createClimb = (event) => {
        console.log(climb)
        event.preventDefault();
        api
            .post("/api/notes/", { ...climb }) 
            .then((res) => {
                if (res.status === 201) alert("Climb created!");
                else alert("Failed to make climb.");
                getClimbs();
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getClimbs();
    }, []);

    const getClimbs = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setClimbs(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getClimbs();
            })
            .catch((error) => alert(error));
    };


    return (
        <div>
            
            <h2>Session</h2>
            <form id='session' onSubmit={createSession}> 
            <select
                    id="type"
                    name="type"
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
                <input type='submit' value='submit session'/>
            </form>
            
            <form id='climb' onSubmit={createClimb}>
                <h3>Climb</h3>
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
                    required
                    onChange={handleChange}// setClimb(e.target.value) to handleChange 
                    value={climb.goal}
                />
                 <label htmlFor="lead">Lead?</label>
                <br />
                <input
                    type="checkbox"
                    id="lead"
                    name="lead"
                    required
                    onChange={handleChange}// setClimb(e.target.value) to handleChange 
                    value={climb.lead}
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
                <label htmlFor="sent">Sent?</label>
                <br />
                <input 
                    type="checkbox"
                    id="sent"
                    name="sent"
                    required
                    value={climb.sent}
                    onChange={handleChange}// handlechange
                />
                <label htmlFor="laps">Rests:</label>
                <br />
                <input
                    type="number"
                    id="laps"
                    name="laps"
                    required
                    onChange={handleChange}// handleChange
                    value={climb.laps}
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
            <div>
                <h2>Climbs</h2>
                {climbs.map((climb) => (
                    <Climb climb={climb} onDelete={deleteNote} key={climb.id} /> // climb
                ))}
            </div>
        </div>
    );
}

export default Home;