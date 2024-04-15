import React from 'react';
import { useState, useEffect } from "react";
import Session from '../components/Session'

const SessionPage = () => {
    const [session, setSession] = useState({
        'type': "",
        'date': "",
        'comments': "",
    });

    

    return(
        <Session />
    )
}

export default SessionPage;