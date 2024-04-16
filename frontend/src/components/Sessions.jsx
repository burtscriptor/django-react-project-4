import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import Session from './Session'

const Sessions = () => {
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
    {sessions.map((session) =>
    <Session session={session} key={session.id}/>
    )};
    </>
    
);

};

export default Sessions;

