import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Axios from 'axios'
import ProjectTeam from './ProjectTeam';
import ProjectProgress from './ProjectProgress';
import ProjectProposal from './ProjectProposal';

function LeaderProjectDashboard() {
    const {proId} = useParams();
    const [progress,setProgress] = useState('')
    const [name, setName] = useState('')
    const [lead, setLead] = useState('')
    const [date, setDate] = useState('')
    const [file, setFile] = useState('')

    useEffect(()=>{
        //Get Project Data
        Axios.post(`http://localhost:3001/oneProjectData`, {
            proId:proId
        }).then((res)=>{
            setProgress(res.data.progress)
            setName(res.data[0].name)
            setLead(res.data[0].lead)
            setDate(res.data[0].date)
            setFile(res.data[0].file)
        })  
    },[])


    return (
        <div>
            <div className = "content">
            <div className ="slogan">
                Project {name} !
            </div>
                <ProjectProgress/>
                <ProjectTeam id={proId}/>
                <ProjectProposal id={proId}/>
            </div>
        </div>
    )
}

export default LeaderProjectDashboard