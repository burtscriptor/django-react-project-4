import React from 'react'
import { useState, useEffect } from 'react'


const Session = ({ session, key }) => {
   console.log('session from session', session)

    

    

return (
    <>
    <div>
        <h4>This a session</h4>
            <p>{session.user}</p>
            <p>{session.sessionId} {session.created_at} {session.type} </p>
            <p>{session.comments}</p> 
    </div>
    </>
    
)

}

export default Session;