import '../style/App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import LeaderProjectDashboard from './LeaderProjectDashboard';
import DashboardBar from './DashboardBar';

function EmpprojectDashboard() {

    const [projectLead, setProjectLead] = useState([])
    const [projectother, setProjectother] = useState([])
    const [proName, setProName] = useState([])

    const openProjectLeader = (proId)=>{
      // let locationString = "./leaderProjectDashboard/"+proId;
      window.location.href = "./leaderProjectDashboard/"+proId
    }

    const openProjectOther = (proId)=>{
      window.location.href = "./otherProjectDashboard/"+proId
    }
    
    const getData = async() =>{
      const email = window.localStorage.getItem("employeeSession");
      const privilige = window.localStorage.getItem("privilige");
      const orgid = window.localStorage.getItem("orgId");

      //Redirect to Sign in page if the variables are not set
      if(email==="" || privilige !=="employee"){
        window.location.href="./employeesignin"
      }

      //Get Project Data
      await Axios.post(`http://localhost:3001/getProjectdata`, {
        orgid: orgid,
        email: email
      }).then((res)=>{
        setProjectLead(res.data)   
      })    
      
      await Axios.post(`http://localhost:3001/getOtherProject`, {
        orgid: orgid,
        email: email
      }).then((res)=>{
        setProjectother(res.data)   
      })  
      
    }

  //Employee Data
  useEffect(()=>{
    getData()
},[])


  return (
    //Assigned Projects
        <div className = "contente">
          <DashboardBar/>
            <div className ="slogan">
                Projects
            </div>
            <div className='signinform'>
            <form>
                <div className="form-row align-items-center">
                </div>
            </form>
            <br />
            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">PROJECT NAME</th>
                            <th scope="col">ROLE</th>
                            <th scope="col">VIEW</th> 
                        </tr>
                    </thead>
                    <tbody>
                            {projectLead.map((project) => 
                                <tr>
                                  <th scope="row">{project.name}</th>
                                  <td>Leader</td>
                                  <td><button className="btn btn-dark" onClick={()=>{
                                    openProjectLeader(project.projectId)
                                  }}>View</button></td>
                                </tr>)}
                            {projectother.map((project) => 
                                <tr>
                                  <th scope="row">{project.name}</th>
                                  <td>{project.role}</td>
                                  <td><button className="btn btn-dark" onClick={()=>{
                                    openProjectOther(project.projectId)
                                  }}>View</button></td>
                                </tr>)}
                    </tbody>
                </table>
            </div>
    </div>
  );
}

export default EmpprojectDashboard;