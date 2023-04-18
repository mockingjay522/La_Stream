import React, { useState, useRef } from "react";
import Axios from "axios";
import '../style/App.css';

function Employeesignin({onIdSubmit}) {
  const [orgid, setOrgid] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [noaccount, setNoaccount] = useState(false)
  const idRef = useRef()

  const handleSignin = async (e) =>{
   
    e.preventDefault();

     //Check if every box has been filled by user
     if(orgid.length===0||email.length===0||password.length===0){
      setError(true)
      return;
    }

    //Verify employee credentials
    await Axios.post(`http://localhost:3001/employeesignin/verify`, {
      orgid: orgid, 
      email: email, 
      password: password,
      }).then((res)=>{
        if(res.data.status==="ok"){
          //Set session variables
          window.localStorage.setItem("employeeSession", email)
          window.localStorage.setItem("privilige", "employee")
          window.localStorage.setItem("orgId", orgid)
          onIdSubmit(idRef.current.value)
          window.location.href="./employeehome"
        }else{
          setNoaccount(true)
        }
      })
  }

  //Employee Sign in Page Components
  return (
    <div className = "content">
        <div className ="slogan">
            <p>Employee Sign In</p>
        </div>
        <div>
            <form className = "signinform">
                {noaccount?<label className="error">Incorrect Employee Email or Password</label>:""} <br/>
                <label className="text">Organization ID</label>
                <br />
                <input className="text" type="text" id="orgid" name="orgid" hint="Organization ID" ref={idRef} onChange={(e)=>{
                  setOrgid(e.target.value)
                }}/> <br />
                {error&&orgid.length===0?<label className="error">Enter a valid Organization ID</label>:""}
                <br />
                <label className="text">Email</label>
                <br />
                <input className="text" type="text" id="email" name="email" hint="Email" ref={idRef} onChange={(e)=>{
                  setEmail(e.target.value)
                }}/> <br />
                {error&&email.length===0?<label className="error">Enter a valid Employee Email Address</label>:""}
                <br />
                <label className="text">Password</label>
                <br />
                <input className="text" type="password" id="password" name="password" hint="Password" onChange={(e)=>{
                  setPassword(e.target.value)
                }}/> <br />
                {error&&password.length===0?<label className="error">Enter a valid password</label>:""}
                <br />
                <br />
                <button type="submit" className="btn btn-dark" onClick={handleSignin}>SIGN IN</button>
                <br />
                <br />
                <p>Are you an admin looking to sign in? <a href="adminsignin">Click Here</a></p>
            </form>
        </div>
    </div>
  );
}

export default Employeesignin;
