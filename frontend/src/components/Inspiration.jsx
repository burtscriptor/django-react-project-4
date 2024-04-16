import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const Inspiration = () => {
const [APOD, setAPOD] = useState(null)

useEffect(() => {
    console.log('effect called')
   const NASA_CALL = async () => {
           const res = await axios
            .get(
                'https://api.nasa.gov/planetary/apod?api_key=xPqRVxbLwdb2geB1ZR7QKEEKfyMnOE0cDhz8DjIi'
                );
                    setAPOD(res.data)
                    console.log(res.data)
                    console.log(APOD)
                };
                NASA_CALL()      
    }
   
, [] );

    return(
        <div>
            <iframe src=''></iframe>
        {APOD && APOD.url ? <>
        
        <p>Today is the {APOD.date}</p>
        <p>And this is '{APOD.title}'</p>
        <img src={APOD.url}/> 
        </>: <p>no</p>}
    
        </div>
    )
}
export default Inspiration;