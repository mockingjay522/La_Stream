import React, { useState } from "react";
import Axios from "axios";
import '../style/App.css';

function Adminsignin() {
  const [orgid, setOrgid] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [noaccount, setNoaccount] = useState(false)

  const handleSignin = (e) =>{
   
    e.preventDefault(); 

     //Check if every box has been filled by user
     if(orgid.length===0||email.length===0||password.length===0){
      setError(true)
      return;
    }

    //Verify the admin credentials and redirect to admin home page
    Axios.post(`http://localhost:3001/adminsignin/verify`, {
      orgid: orgid, 
      email: email, 
      password: password,
      }).then((res)=>{
        if(res.data.status==="ok"){
          window.localStorage.setItem("userSession", email)
          window.localStorage.setItem("privilige", "admin")
          window.location.href="./adminhome"
        }else{
          setNoaccount(true)
        }
      })
  }

  //Admin Login page Components
  return (
    <div className = "content">
        <div className ="slogan">
            <p>Admin Sign In</p>
        </div>
        <div>
            <form className = "signinform">
                {noaccount?<label className="error">Incorrect Admin Email or Password</label>:""} <br/>
                <label className="text">Organization ID</label>
                <br />
                <input className="text" type="text" id="orgid" name="orgid" hint="Organization ID" onChange={(e)=>{
                  setOrgid(e.target.value)
                }}/> <br />
                {error&&orgid.length===0?<label className="error">Enter a valid Organization ID</label>:""}
                <br />
                <label className="text">Email</label>
                <br />
                <input className="text" type="text" id="email" name="email" hint="Email" onChange={(e)=>{
                  setEmail(e.target.value)
                }}/> <br />
                {error&&email.length===0?<label className="error">Enter a valid Admin Email Address</label>:""}
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
                <p>Are you an admin looking to sign up? <a href="adminsignup">Click Here</a></p>
                <br />
                <p>Are you an employee looking to sign in? <a href="employeesignin">Click Here</a></p>
            </form>
        </div>
    </div>
  );
}

export default Adminsignin;
