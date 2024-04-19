import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const Inspiration = () => {
const [APOD, setAPOD] = useState(null)
const [PInSpace, setPInSpace] = useState(null)

useEffect(() => {
    console.log('effect called')
   const NASA_CALL = async () => {
           const res = await axios
            .get(
                'https://api.nasa.gov/planetary/apod?api_key=xPqRVxbLwdb2geB1ZR7QKEEKfyMnOE0cDhz8DjIi'
                );
                const res1 =  await axios
                .get(
                    'http://api.open-notify.org/astros.json'
                    );
                    setPInSpace(res1.data)
                    setAPOD(res.data)
                    console.log(res1.data)
                    console.log(PInSpace)
                };
                NASA_CALL()    
    }   
,[] );

    return(
        <>    
        {APOD && APOD.url ? <div>
        
        <p>Today i the {APOD.date}</p>
        <p>And this is '{APOD.title}' taken by {APOD.copyright}.</p>
        <p>Story:</p>
        <p>{APOD.explanation}</p>
        <img src={APOD.url}/> 
        </div>
        : <p>Loading...</p>}

        {PInSpace && PInSpace.people ? (
            <div>
                <p>Current Number of people in space: {PInSpace.number}</p>
                {Array.isArray(PInSpace.people) && PInSpace.people.map((person, index) => (
                    <p key={index}>{person.name} on the {person.craft}</p>
                ))}
            </div>
        ) : <p>Loading...</p> }
        
        </>
    )
}
export default Inspiration;