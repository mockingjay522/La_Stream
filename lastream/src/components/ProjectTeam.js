import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'

function ProjectTeam() {

  const {proId} = useParams();
  const [name, setName] = useState('')
  const [projectTeam, setProjectTeam] = useState([])
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newResponsibilities, setNewResponsibilities] = useState('')
  const [orgid, setOrgid] = useState('')

    useEffect(()=>{
        setOrgid(window.localStorage.getItem("orgId"))
        //Get Project Data
        Axios.post(`http://localhost:3001/ProjectTeamData`, {
            proId: proId
        }).then((res)=>{
          setProjectTeam(res.data)
        })

        Axios.post(`http://localhost:3001/oneProjectData`, {
            proId:proId
        }).then((res)=>{
            setName(res.data[0].name)
        })
    },[])

    const handleAdd = () =>{
      Axios.post(`http://localhost:3001/addProjectMember`, {
        name: name,
        orgid: orgid,
        proId: proId,
        newEmail:newEmail,
        newRole:newRole,
        newResponsibilities: newResponsibilities
    })
    }

  return (
    <div>
      <div className = "ideas">
          <p>Team</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:"50% 50%"}}>
      {projectTeam.map((team) => 
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">{team.email}</h5>
              <p class="card-text">{team.role}</p>
              <a href="#" className="btn btn-primary">View Responsibilities</a>
            </div>
          </div>
      )}
      </div>
        <form>
        <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name="email" onChange={(e)=>{
                        setNewEmail(e.target.value)
                        }} required/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Role</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Full Stack Developer" name="role" onChange={(e)=>{
                        setNewRole(e.target.value)
                        }} required/>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Responsibilities</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="April 14, 2023  :   Front End Submission " name="responsibilities" onChange={(e)=>{
                        setNewResponsibilities(e.target.value)
                        }} required></textarea>
        </div>
        <button type="submit" className="btn btn-dark" onClick={handleAdd}>ADD MEMBER</button>
        </form>
    </div>
  )
}

export default ProjectTeam