import '../style/App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function Adminhome() {

  const [orgname, setOrgname] = useState('')  
  const [email, setEmail] = useState('')

  //Clear the admin session variables
  const logOut =()=>{
    window.localStorage.setItem("userSession", "")
    window.localStorage.setItem("privilige", "")
    window.location.href="./adminsignIn"
  }

  useEffect(()=>{
    
    //Get session variables
    const email = window.localStorage.getItem("userSession");
    const privilige = window.localStorage.getItem("privilige");

    //Redirect to signin page if session variables are not set
    if(email==="" || privilige !=="admin"){
      window.location.href="./adminsignin"
    }

    //Get admin data from database
    Axios.post(`http://localhost:3001/adminData`, {
      email: email, 
      }).then((res)=>{
        setOrgname(res.data.orgname)
        setEmail(res.data.email) 
  })},[])

  return (
    //Admin Home Components
    <div className = "content">
        <div className ="slogan">
            Welcome {orgname} !
        </div>
        <div className='signinform'>
          <p>What would you like do do today?</p>
          <br />
          <a className="signin" href="employeesignup"><button className="btn btn-dark">CREATE EMPLOYEE</button></a>
          <br />
          <br />
          <a className="signin" href="attendance"><button className="btn btn-dark">VIEW TIMESHEET</button></a>
          <br/>
          <br />
          <a className="signin" href="createproject"><button className="btn btn-dark">CREATE NEW PROJECT</button></a>
          <br/>
          <br/>
          <button className="btn btn-dark" onClick={logOut}>LOG OUT</button>
        </div>
        
    </div>
  );
}

export default Adminhome;
