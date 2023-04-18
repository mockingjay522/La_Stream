import '../style/App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import calender from '../img/calender.png';
import profile from '../img/profile.png';
import video from '../img/video.png';
import logout from '../img/logout.png';


//Home Page of Employee
function DashboardBar({id}) {

  const [empname, setEmpname] = useState('')
  const [email, setEmail] = useState('')
  const [orgid, setOrgid] =useState('')
  const [organization, setOrganization]=useState('')
  
  //Log Out Function
  const logOut = async ()=>{
    await Axios.post(`http://localhost:3001/timesheet/out`, {
      email: email,
      orgid: orgid 
      }).then((res)=>{
        window.location.href="./employeesignIn"
      })
    
      //Unset the session variables upon logout
    window.localStorage.setItem("employeeSession", "")
    window.localStorage.setItem("privilige", "")
    window.localStorage.setItem("orgId", "")
    
  }

  //Video Conference
  const conference =()=>{
    window.location.href="./conferencelist"
  }

  const empProject =()=>{
    window.location.href="./empprojectDashboard"
  }

  const empProfile =()=>{
    window.location.href="./empProfile"
  }

  useEffect(()=>{

    const email = window.localStorage.getItem("employeeSession");
    const privilige = window.localStorage.getItem("privilige");
    const orgid = window.localStorage.getItem("orgId");

    //Redirect to Sign in page if the variables are not set
    if(email==="" || privilige !=="employee"){
      window.location.href="./employeesignin"
    }

    //Get Employee Data
    Axios.post(`http://localhost:3001/employeeData`, {
      email: email,
      orgid: orgid 
      }).then((res)=>{
        setEmpname(res.data.firstName)
        setEmail(res.data.email)
        setOrgid(res.data.orgid) 

        //Get organization Data
        Axios.post(`http://localhost:3001/orgData`, {
          orgid: orgid,
          }).then((res1)=>{
            setOrganization(res1.data.orgname)
          })
  })
   
},[])

  //Employee Home Page Components
  return (
      <div className="topBorder">
        <p className="emporg">{organization}</p>
        <div className="functionBar">
        <button className="empiconbutton"><img className="empicon" src={calender} alt="calender" onClick={empProject}/></button>
        <button className="empiconbutton"><img className="empicon" src={profile} alt="profile" onClick={empProfile}/></button>
        <button className="empiconbutton"><img className="empicon" src={video} alt="video" onClick={conference}/></button>
        <button className="empiconbutton" onClick={logOut}><img className="empicon" src={logout} alt="logout"/></button>
        </div>
      </div>
        
  );
}

export default DashboardBar;
