import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Axios from 'axios'

function Conference() {
    const {confId} = useParams();
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [subject, setSubject] = useState('')
    const [conferenceTeam, setConferenceTeam] = useState([])
    const [newEmail, setNewEmail] = useState('')
    const [roomId, setRoomId] = useState('')

    const handleAdd = (e) =>{
      e.preventDefault()
      Axios.post(`http://localhost:3001/addConferenceMember`, {
        confId: confId,
        newEmail:newEmail,
        date: date,
        time: time,
        subject: subject,
        roomId: roomId
    }).then({
      
    })
    }

    useEffect(()=>{
        //Get Project Data
        Axios.post(`http://localhost:3001/getoneConferencedata`, {
            confId:confId
        }).then((res)=>{
            setDate(res.data[0].date)
            setTime(res.data[0].time)
            setSubject(res.data[0].subject)
            setRoomId(res.data[0].roomId)
        })
        
        //Get Project Data
        Axios.post(`http://localhost:3001/ConferenceTeamData`, {
            confId: confId
        }).then((res)=>{
          setConferenceTeam(res.data)
        }, [])
    })


    return (
        <div>
            <div className = "content">
            <div className ="slogan">
                Meeting {subject} !
            </div>
            <div>
      <div className = "ideas">
          <p>Participants</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:"50% 50%"}}>
      {conferenceTeam.map((team) => 
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">{team.email}</h5>
            </div>
          </div>
      )}
      </div>
      <div className = "ideas">
          <p>Add New Participant</p>
      </div>
        <form>
        <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name="email" onChange={(e)=>{
                        setNewEmail(e.target.value)
                        }} required/>
        </div>
        <button type="submit" className="btn btn-dark" onClick={handleAdd}>ADD PARTICIPANT</button>
        </form>
    </div>

            </div>
        </div>
    )
}

export default Conference