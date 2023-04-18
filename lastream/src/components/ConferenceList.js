import React, { useState, useEffect } from 'react'
import Axios from "axios"
import DashboardBar from './DashboardBar'

function ConferenceList() {

    const [conferenceLead, setConferenceLead] = useState([])
    const [conferenceother, setConferenceother] = useState([])

    const openEditConference = (confId) =>{
      window.location.href = "./conference/"+confId
    }

    const newConference = () =>{
        window.location.href = "./newConference"
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
      await Axios.post(`http://localhost:3001/getConferencedata`, {
        orgid: orgid,
        email: email
      }).then((res)=>{
        setConferenceLead(res.data)   
      })    
      
        await Axios.post(`http://localhost:3001/getOtherconference`, {
            email: email
          }).then((res)=>{
            console.log(res.data)
            setConferenceother(res.data)   
          })  
    }

  // Employee Data
  useEffect(()=>{
    getData()
},[])

  return (
    <div className = "contente">
          <DashboardBar/>
            <div className ="slogan">
                Conferences
            </div>
            <div className='signinform'>
            <button className="btn btn-primary" onClick={newConference}>Create New</button>
            <form>
                <div className="form-row align-items-center">
                </div>
            </form>
            <br />
            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">AGENDA</th>
                            <th scope="col">DATE</th>
                            <th scope="col">TIME</th>
                            <th scope="col">JOIN</th> 
                            <th scope="col">EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                            {conferenceLead.map((conference) => 
                                <tr>
                                  <th scope="row">{conference.subject}</th>
                                  <td>{conference.date}</td>
                                  <td>{conference.time}</td>
                                  <td><a className="btn btn-dark" href={"http://localhost:3003/"+conference.roomId}>JOIN</a></td>
                                  <td><button className="btn btn-dark" onClick={()=>{
                                    openEditConference(conference.meetingrtid)
                                  }}>EDIT</button></td>
                                </tr>)}
                            {conferenceother.map((conference) => 
                                <tr>
                                <th scope="row">{conference.subject}</th>
                                <td>{conference.date}</td>
                                <td>{conference.time}</td>
                                <td><a className="btn btn-dark" href={"http://localhost:3003/"+conference.roomId}>JOIN</a></td>
                                <td><button className="btn btn-dark" onClick={()=>{
                                  openEditConference(conference.meetingrtid)
                                }}>EDIT</button></td>
                              </tr>)}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default ConferenceList