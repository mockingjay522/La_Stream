import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import Axios from "axios"

function ProjectProposal() {

  const {proId} = useParams();
  const [filepath, setFilePath] = useState('')
  const [fileName, setFileName] = useState('')


  useEffect(()=>{
    //Get Project Data
    Axios.post(`http://localhost:3001/oneProjectData`, {
        proId: proId
    }).then((res)=>{
        setFilePath(`file://`+res.data[0].file)
        setFileName(res.data[0].filename)
    })  
},[])

  return (
    <div>
    <div className = "ideas">
        <p>Project Proposal</p>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <p><a href={`http://127.0.0.1:8887/`+fileName}>Click here for project proposal</a></p>
    </div>
  </div>

  )
}

export default ProjectProposal