import React from 'react'
import { useState, useEffect } from 'react'


const Session = ({ session, key }) => {
   console.log('session from session', session)

    

    

return (
    <>
    <div>
        <h4>This a session</h4>
            <p>{session.user.username}</p>
            <p>{session.id} Session time {session.created_at} this is type {session.type} </p>
            <p>{session.comments}</p> 
    </div>
    </>
    
)

}

export default Session;