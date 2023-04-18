import React, {useState, useEffect} from 'react'
import Axios from "axios"
import DashboardBar from './DashboardBar'

function EmployeeProfile() {

const [orgid, setOrgid] = useState('')   
const [empid, setEmpid] = useState('')  
const [firstName, setFirstname] = useState('')
const [lastName, setLastname] = useState('')
const [middleName, setMiddlename] = useState('')
const [contactno, setContactno] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [address, setAddress] = useState('')
const [departmentid, setDepartmentid] = useState('')
const [supervisorid, setSupervisorid] = useState('')
const [salary, setSalary] = useState('')
const [emergencycontact, setEmergencycontact] = useState('')
const [emergencycontactno, setEmergencycontactno] = useState('')
const [hiredate, setHiredate] = useState('')
const [post, setPost] = useState('')
const [gender, setGender] = useState('')
const [birthdate, setBirthdate] = useState('')
const [error, setError] = useState(false)
const [organization, setOrganization] = useState('')

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
        setFirstname(res.data.firstName)
        setLastname(res.data.lastName)
        setMiddlename(res.data.middleName)
        setEmail(res.data.email)
        setOrgid(res.data.orgid) 
        setContactno(res.data.contactno)
        setPassword(res.data.password)
        setDepartmentid(res.data.departmentid)
        setEmpid(res.data.empid)
        setAddress(res.data.address)
        setSupervisorid(res.data.supervisorid)
        setSalary(res.data.salary)
        setEmergencycontact(res.data.emergencycontact)
        setEmergencycontactno(res.data.emergencycontactno)
        setHiredate(res.data.hiredate)
        setPost(res.data.post)
        setGender(res.data.gender)
        setBirthdate(res.data.birthdate)

        //Get organization Data
        Axios.post(`http://localhost:3001/orgData`, {
          orgid: orgid,
          }).then((res1)=>{
            setOrganization(res1.data.orgname)
          })
  })
   
},[])

const updateProfile =async (e)=>{

    e.preventDefault()

    //Check if every box has been filled by user
    if(lastName.length===0||empid==="-"||firstName==="-"||contactno==="-"||email.length===0
        ||address.length===0||password.length<=6||departmentid.length===0||supervisorid.length===0
        ||salary<=0||emergencycontact.length===0||emergencycontactno.length===0||hiredate.length===0
        ||post.length===0||gender.length===0||gender.length===0||birthdate.length===0){
        setError(true)
        return;
    }

    Axios.post(`http://localhost:3001/updateEmployee`, {
                orgid: orgid,
                    empid: empid, 
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    contactno: contactno,
                    email: email,
                    password: password,
                    address: address,
                    departmentid: departmentid,
                    supervisorid: supervisorid,
                    salary: salary,
                    emergencycontact: emergencycontact,
                    emergencycontactno: emergencycontactno,
                    hiredate: hiredate,
                    post: post,
                    gender: gender,
                    birthdate: birthdate,
                }).then((response1)=>{
                    alert("Thank you.The profile has been updated")
                    window.location.href="./employeehome"
                })
}
  
return (
    <div className = "contente">
        <DashboardBar/>
    <div className = "content">
        <div className ="slogan">
            <p>Employee Profile</p>
        </div>
        <form className = "signinform">
            <label className="text">Employee ID</label>
            <br />
            <input className="text" type="text" id="empid" name="empid" value ={empid} fixed/> <br />
            {error&&empid.length===0?<label className="error">Enter a valid Employee id</label>:""}
            <br />
            <label className="text">First Name</label>
            <br />
            <input className="text" type="text" id="firstname" name="firstname" value={firstName} onChange={(e)=>{
                setFirstname(e.target.value)
            }}/> <br />
            {error&&firstName.length===0?<label className="error">Enter a valid First Name</label>:""}
            <br />
            <label className="text">Middle Name</label>
            <br />
            <input className="text" type="text" id="middleName" name="middleName" value ={middleName} onChange={(e)=>{
                setMiddlename(e.target.value)
            }}/>
            <br />
            <label className="text">Last Name</label>
            <br />
            <input className="text" type="text" id="lastName" name="lastName" value = {lastName} onChange={(e)=>{
                setLastname(e.target.value)
            }}/> <br />
            {error&&lastName.length===0?<label className="error">Enter a valid Last Name</label>:""}
            <br />
            <label className="text">Contact Number</label>
            <br />
            <input className="text" type="text" id="contactno" name="contactno" value = {contactno} onChange={(e)=>{
                setContactno(e.target.value)
            }}/> <br />
            {error&&contactno.length===0?<label className="error">Enter a valid Contact Number</label>:""}
            <br />
            <label className="text">Email</label>
            <br />
            <input className="text" type="text" id="email" name="email" value={email} fixed/> <br />
            {error&&email.length===0?<label className="error">Enter a valid Email Address</label>:""}
            <br />
            <label className="text">Password</label>
            <br />
            <input className="text" type="password" id="password" name="password" value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }}/> <br />
            {error&&password.length===0?<label className="error">Password must be greater than 6 characters</label>:""}
            <br />
            <label className="text">Address</label>
            <br />
            <input className="text" type="text" id="address" name="address" value={address} onChange={(e)=>{
                setAddress(e.target.value)
            }}/> <br />
            {error&&address.length===0?<label className="error">Enter a valid Address</label>:""}
            <br />
            <label className="text">Department ID</label>
            <br />
            <input className="text" type="text" id="departmentid" name="departmentid" value={departmentid} onChange={(e)=>{
                setDepartmentid(e.target.value)
            }}/> <br />
            {error&&departmentid.length===0?<label className="error">Enter a valid Department ID</label>:""}
            <br />
            <label className="text">Supervisor ID</label>
            <br />
            <input className="text" type="text" id="supervisorid" name="supervisorid" value={supervisorid} onChange={(e)=>{
                setSupervisorid(e.target.value)
            }}/> <br />
            {error&&supervisorid.length===0?<label className="error">Enter a valid Supervisor ID</label>:""}
            <br />
            <label className="text">Salary</label>
            <br />
            <input className="text" type="text" id="salary" name="salary" value={salary} onChange={(e)=>{
                setSalary(e.target.value)
            }}/> <br />
            {error&&salary<=0?<label className="error">Enter a valid Salary</label>:""}
            <br />
            <label className="text">Emergency Contact</label>
            <br />
            <input className="text" type="text" id="emergencycontact" name="emergencycontact" value ={emergencycontact} onChange={(e)=>{
                setEmergencycontact(e.target.value)
            }}/> <br />
            {error&&emergencycontact.length===0?<label className="error">Enter a valid Emergency Contact</label>:""}
            <br />
            <label className="text">Energency Contact Number</label>
            <br />
            <input className="text" type="text" id="emergencycontactno" name="emergencycontactno" value={emergencycontactno} onChange={(e)=>{
                setEmergencycontactno(e.target.value)
            }}/> <br />
            {error&&emergencycontactno.length===0?<label className="error">Enter a valid Emergency Contact Number</label>:""}
            <br />
            <label className="text">Hire Date</label>
            <br />
            <input className="text" type="date" id="hiredate" name="hiredate" value={hiredate} fixed /> <br />
            {error&&hiredate.length===0?<label className="error">Enter a valid Hire Date</label>:""}
            <br />
            <label className="text">Post</label>
            <br />
            <input className="text" type="text" id="post" name="post" value={post} fixed/> <br />
            {error&&post.length===0?<label className="error">Enter a valid job title</label>:""}
            <br />
            <label className="text">Gender</label>
            <br />
            <select className="text" id="gender" name="gender" value={gender} onChange={(e)=>{
                setGender(e.target.value)
            }}>
                <option value="-">Select a Gender </option>
                <option value="F">Female</option>
                <option value="M">Male</option>
                <option value="U">Prefer not to say</option>
            </select>
            <br />
            {error&&gender==="-"?<label className="error">Please select a gender</label>:""}
            <br />
            <label className="text">Birth Date</label>
            <br />
            <input className="text" type="date" id="birthdate" name="birthdate" value={birthdate} onChange={(e)=>{
                setBirthdate(e.target.value)
            }}/> <br />
            {error&&birthdate.length===0?<label className="error">Enter a valid Birth Date</label>:""}
            <br />
            <br />
            <button className="btn btn-dark" onClick={updateProfile}>UPDATE PROFILE</button>
            <br />
            <br />
        </form>
    </div>
    </div>
)}

export default EmployeeProfile