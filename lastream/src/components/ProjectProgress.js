import React, {useState, useEffect} from 'react'
import Axios from "axios"
import { useParams } from "react-router-dom"

function ProjectProgress() {

  const {proId} = useParams();
  const [progressvalue, setProgressvalue] = useState('')
  const [progress, setProgress] = useState('')
  
  const changeProgress =()=>{
    setProgress(progressvalue)

    //update progress in database
    Axios.post(`http://localhost:3001/changeProgress`, {
        proId: proId,
        progress: progress
    })

  }

  useEffect(()=>{
    //Get Project Data
    Axios.post(`http://localhost:3001/oneProjectData`, {
        proId: proId
    }).then((res)=>{
        setProgress(res.data[0].progress)
    })  
},[])

  return (
    <div>
      <div className = "ideas">
          <p>Progress</p>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <progress value={progress} max="100" style={{width:"500px", height: '30px'}} />{progress}% Complete
          <input type="text" placeholder="Enter progress here" onChange={(e)=>{setProgressvalue(e.target.value)}}/>
          <button className="btn btn-dark" onClick={changeProgress}>UPDATE PROGRESS</button>
      </div>
    </div>
  )
}

export default ProjectProgress