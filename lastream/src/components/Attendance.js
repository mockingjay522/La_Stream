import '../style/App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function Attendance() {

  const [orgname, setOrgname] = useState('')  
  const [email, setEmail] = useState('')
  const [empemail, setEmpemail] = useState('')
  const [orgid, setOrgid] = useState('')
  const [attendancedata, setAttendanceData] = useState([])

  //Get the attendance data
  const getAttendance =(e)=>{
    e.preventDefault()
    Axios.post(`http://localhost:3001/getOneAttendance`, {
      orgid: orgid, 
      empemail: empemail, 
      }).then((res)=>{
        setAttendanceData(res.data)
      })
  }

  const goBack = ()=>{
    window.location.href="./adminhome"
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
        setOrgid(res.data.orgid) 
  })},[])


  return (
    //Attendance Sheet Components
        <div className = "content">
            <div className ="slogan">
                Attendance For {orgname}
            </div>
            <div className='signinform'>
            <form>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <label className="sr-only" for="inlineFormInput">Email</label>
                        <input type="text" className="form-control mb-2" id="inlineFormInput" onChange={(e)=>{
                setEmpemail(e.target.value)}}/>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={getAttendance}>View</button>
                </div>
            </form>
            <br />
            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">TIME</th>
                            <th scope="col">IN/OUT</th>
                        </tr>
                    </thead>
                    <tbody>
                            {/* <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td> */}
                            {attendancedata.map((attendance) => <tr><th scope="row">{attendance.email}</th><td>{attendance.type}</td><td>{attendance.timestamp}</td></tr>)}
                    </tbody>
                </table>
                <button className="btn btn-dark" onClick={goBack}>BACK</button>
            </div>
    </div>
  );
}

export default Attendance;