import React, {useState, useEffect} from "react";
import '../style/App.css';
import Axios from "axios";

function CreateProject() {

const [proName, setProName] = useState('')
const [proLead, setProLead] = useState('')
const [proDate, setProDate] = useState('')
const [proFile, setProFile] = useState('')
const [orgid, setOrgid] = useState('')

useEffect(()=>{
    //Get session variables
    const ademail = window.localStorage.getItem("userSession");
    
    //Get admin data
    Axios.post(`http://localhost:3001/adminData`, {
      email: ademail, 
      }).then((res)=>{
        setOrgid(res.data.orgid)
    })},[])


const submitProject =async (e)=>{

    const data = new FormData()
    data.append('file', proFile, proFile.name)
    
    e.preventDefault()
    
    //Create New Project
    Axios.post(`http://localhost:3001/uploadFile`, data, {
            orgid: orgid,
            proName: proName,
            proLead: proLead,
            proDate: proDate,
            proFile: proFile
        })
        .then((res)=>{
            const filepath = res.data.filepath
            const filename = res.data.fileName
            Axios.post(`http://localhost:3001/createProject`,  {  
                orgid: orgid,
                proName: proName,
                proLead: proLead,
                proDate: proDate,
                proFile: filepath,
                filename: filename
            }).then((res)=>{
                alert("Thank you. The project has been created")
                window.location.href="./adminhome"
            })
    })
}

//New Project Page Components
return (
    <div className = "content">
        <div className ="slogan">
            <p>CREATE NEW PROJECT</p>
        </div>
        <form className = "signinform">
            <label className="text">Project Name</label><br/>
            <input className="text" type="text" id="proName" name="proName" onChange={(e)=>{
                setProName(e.target.value)
            }}/><br/>
            <label className="text">Project Leader</label><br/>
            <input className="text" type="text" id="proLead" name="proLead" onChange={(e)=>{
                setProLead(e.target.value)
            }}/><br/>
            <label className="text">Due Date</label><br/>
            <input className="text" type="date" id="proDate" name="proDate" onChange={(e)=>{
                setProDate(e.target.value)
            }}/><br/>
            <label className="text">Final Proposal</label><br/>
             <input className="text" type="file" id="proFile" name="proFile" onChange={(e)=>{
                setProFile(e.target.files[0])
            }}/><br/><br/>
            <button className="btn btn-dark" onClick={submitProject}>CREATE PROJECT</button>
            <br />
            <br />
        </form>
    </div>
  );
}

export default CreateProject;
