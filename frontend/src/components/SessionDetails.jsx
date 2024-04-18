import api from "../api";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const SessionDetails = () => {
    const [climbs, setClimbs] = useState([])
    const [sent, setSent] = useState([])
    const [projects, setProjects] = useState([])
    const [grade, setGrade] = useState([])
    const [favouriteStyle, setFavouriteStyle] = useState([])
    const [lead, setLead] = useState([])
    const { id } = useParams();
    console.log(id)


useEffect(() => {
    const getClimbs = async () => {
        api 
            .get(`api/session/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setClimbs(data)
                console.log(data)
                const sent= data.filter((climb) => climb.sent === true)
                const project = data.filter((climb) => climb.project_send_attempt === true)
                const lead = data.filter((climb) => climb.lead === true)
                const grades = data.map(climb => climb.grade);
                grades.sort((a, b) => b - a);
                let style = data.map(climb => climb.style);
                let favouriteStyleArray = style.reduce(function(a,b) {
                    return (
                        a[b] ? ++a[b] : (a[b] = 1),
                        a
                    );
                }, [])
               setSent(sent);
               setProjects(project);
               setGrade(grades);
               setFavouriteStyle(favouriteStyleArray);
               setLead(lead);
            });
    }
    getClimbs();
}, []);

   
    return (
        <>
        <div>
            <ul>
            <li>Total climbs per session: {climbs.length} </li>
            <li> Number of project attempts: {projects.length} </li>
            <li> Number of climbs sent: {sent.length} </li>
            <li>Hardest grade climbed: {grade[0]} </li>
            <li>Favourite style: {Object.keys(favouriteStyle)[0]}   </li>
            <li>Number of Lead climbs: {lead.length}</li>
            </ul>
        </div>
        {climbs.length > 0 ?  
            climbs.map((climb,index) => (
             
            <div key={climb.index}>
                
                <p>Climb {index + 1}</p>
                <ul>
                    <li>Grade: {climb.grade}</li>
                    <li>Style: {climb.style}</li>
                    <li>Lead? {climb.lead ? 'Yes' : 'No' }</li>
                    <li>Project send attempt? {climb.project_send_attempt? 'Yes'  : 'No' }</li>
                    <li>Sent? {climb.sent? 'Yes'  : 'No'} </li>
                    <li>Comments: {climb.comments}</li>
                </ul>
            </div>
     ) )
        : <p>no climbs in session</p>
            }
        </>
    )
};

export default SessionDetails;