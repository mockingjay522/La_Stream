import React, {useState, useEffect} from 'react'
import Axios from "axios"

function NewConference() {

    const [email, setEmail] = useState('')
    const [orgid, setOrgId] = useState('')
    const [confDate, setConfDate] = useState('')
    const [confName, setConfName] = useState('')
    const [confTime, setConfTime] = useState('')

    const submitConference = () =>{
         //Create New Conference
        Axios.post(`http://localhost:3001/createConference`,{
            orgid: orgid,
            email: email,
            confName: confName,
            confTime: confTime,
            confDate: confDate
        })
    .then((res)=>{
        window.location.href="./conferencelist"
    })}
    const getData = async() =>{
        const email = window.localStorage.getItem("employeeSession");
        const privilige = window.localStorage.getItem("privilige");
        const orgid = window.localStorage.getItem("orgId");
  
        //Redirect to Sign in page if the variables are not set
        if(email==="" || privilige !=="employee"){
          window.location.href="./employeesignin"
        }

        setEmail(email)
        setOrgId(orgid)

      }

      //Employee Data
  useEffect(()=>{
    getData()
},[])

  return (
    <div className = "content">
        <div className ="slogan">
            <p>CREATE NEW CONFERENCE</p>
        </div>
        <form className = "signinform">
            <label className="text">Subject</label><br/>
            <input className="text" type="text" id="confName" name="confName" onChange={(e)=>{
                setConfName(e.target.value)
            }}/><br/>
            <label className="text">Date</label><br/>
            <input className="text" type="date" id="confDate" name="confDate" onChange={(e)=>{
                setConfDate(e.target.value)
            }}/><br/>
            <label className="text">Time</label><br/>
            <input className="text" type="time" id="confTime" name="confTime" onChange={(e)=>{
                setConfTime(e.target.value)
            }}/><br/><br/>
            <button className="btn btn-dark" onClick={submitConference}>CREATE CONFERENCE</button>
            <br />
            <br />
        </form>
    </div>
  )
}

export default NewConference