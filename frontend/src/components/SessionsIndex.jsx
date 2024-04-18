import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom';

// Todo key information to display at the top
// Total number of sessions
// Number of sessions via type
// Average number of climbs per session - fat models thin controllers

const SessionsIndex = () => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        console.log('useeffect')
        const getSessions = async () => {
            api
                .get("api/session/")
                .then((res) => res.data)
                .then((data)=> {
                    setSessions(data)
                    console.log('sessonS', sessions)
                })
    
        }
        getSessions();
    }, [])

return (
    <>
    {sessions.map((session, index) =>
        <Link to={`/${session.id}`} key={session.id}>
            <div id={session.id}>
                <h4>Session {index + 1} - click anywhere to see climbs on this session</h4>
        <ul>
        <li>Session on {session.created_at}</li>
        <li>Type {session.type}</li>
        <li>Comments: {session.comments}</li> 
        </ul>
            </div>
        </Link>
    )}
    </>
    
);

};

export default SessionsIndex;

