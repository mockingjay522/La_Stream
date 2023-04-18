import React, {useState, useEffect} from "react";
import '../style/App.css';
import Axios from "axios";

function Employeesignup() {

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
const [imgid, setImgid] = useState('')
const [error, setError] = useState(false)
const [duplicateemail, setDuplicateemail] =useState(false)
const [duplicateempid, setDuplicateempid] =useState(false)


useEffect(()=>{
    //Get session variables
    const ademail = window.localStorage.getItem("userSession");
    
    //Get admin data
    Axios.post(`http://localhost:3001/adminData`, {
      email: ademail, 
      }).then((res)=>{
        setOrgid(res.data.orgid)
    })},[])


const submitEmp =async (e)=>{

    e.preventDefault()
    setDuplicateemail(false)
    setDuplicateempid(false)

    //Check if every box has been filled by user
    if(lastName.length===0||empid==="-"||firstName==="-"||contactno==="-"||email.length===0
        ||address.length===0||password.length<=6||departmentid.length===0||supervisorid.length===0
        ||salary<=0||emergencycontact.length===0||emergencycontactno.length===0||hiredate.length===0
        ||post.length===0||gender.length===0||gender.length===0||birthdate.length===0||imgid.length===0){
        setError(true)
        return;
    }

    //Check if user with the same email exists
    Axios.post(`http://localhost:3001/validateemployeeemail`, { 
        email: email, 
        orgid: orgid
    }).then((res)=>{
        //if user exists alert user
        if(res.data.exists){
            setDuplicateemail(true)
            return;
        }else{
            Axios.post(`http://localhost:3001/validateemployeeid`, { 
                orgid: orgid, 
                empid: empid
            }).then((response)=>{
                //if user exists alert user
                if(response.data.exists){
                    setDuplicateempid(true)
                    return;
                }else{
                //if employee does not exist, create new employee
                Axios.post(`http://localhost:3001/createEmployee`, {
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
                    imgid: imgid
                }).then((response1)=>{
                    alert("Thank you for signing up.The employee has been created")
                    window.location.href="./adminhome"
                })
            }
        })}
    })
}

// Employee Signup page Componets
return (
    <div className = "content">
        <div className ="slogan">
            <p>New Employee Registration Form</p>
        </div>
        <form className = "signinform">
            <label className="text">Employee ID</label>
            <br />
            <input className="text" type="text" id="empid" name="empid" onChange={(e)=>{
                setEmpid(e.target.value)
            }}/> <br />
            {error&&empid.length===0?<label className="error">Enter a valid Employee id</label>:""}
            {duplicateempid?<label className="error">Same employee id already exists for your organization</label>:""}
            <br />
            <label className="text">First Name</label>
            <br />
            <input className="text" type="text" id="firstname" name="firstname" onChange={(e)=>{
                setFirstname(e.target.value)
            }}/> <br />
            {error&&firstName.length===0?<label className="error">Enter a valid First Name</label>:""}
            <br />
            <label className="text">Middle Name</label>
            <br />
            <input className="text" type="text" id="middleName" name="middleName" onChange={(e)=>{
                setMiddlename(e.target.value)
            }}/>
            <br />
            <label className="text">Last Name</label>
            <br />
            <input className="text" type="text" id="lastName" name="lastName" onChange={(e)=>{
                setLastname(e.target.value)
            }}/> <br />
            {error&&lastName.length===0?<label className="error">Enter a valid Last Name</label>:""}
            <br />
            <label className="text">Contact Number</label>
            <br />
            <input className="text" type="text" id="contactno" name="contactno" onChange={(e)=>{
                setContactno(e.target.value)
            }}/> <br />
            {error&&contactno.length===0?<label className="error">Enter a valid Contact Number</label>:""}
            <br />
            <label className="text">Email</label>
            <br />
            <input className="text" type="text" id="email" name="email" onChange={(e)=>{
                setEmail(e.target.value)
            }}/> <br />
            {error&&email.length===0?<label className="error">Enter a valid Email Address</label>:""}
            {duplicateemail?<label className="error">Same email already exists for your organization</label>:""}
            <br />
            <label className="text">Password</label>
            <br />
            <input className="text" type="password" id="password" name="password" onChange={(e)=>{
                setPassword(e.target.value)
            }}/> <br />
            {error&&password.length===0?<label className="error">Password must be greater than 6 characters</label>:""}
            <br />
            <label className="text">Address</label>
            <br />
            <input className="text" type="text" id="address" name="address" onChange={(e)=>{
                setAddress(e.target.value)
            }}/> <br />
            {error&&address.length===0?<label className="error">Enter a valid Address</label>:""}
            <br />
            <label className="text">Department ID</label>
            <br />
            <input className="text" type="text" id="departmentid" name="departmentid" onChange={(e)=>{
                setDepartmentid(e.target.value)
            }}/> <br />
            {error&&departmentid.length===0?<label className="error">Enter a valid Department ID</label>:""}
            <br />
            <label className="text">Supervisor ID</label>
            <br />
            <input className="text" type="text" id="supervisorid" name="supervisorid" onChange={(e)=>{
                setSupervisorid(e.target.value)
            }}/> <br />
            {error&&supervisorid.length===0?<label className="error">Enter a valid Supervisor ID</label>:""}
            <br />
            <label className="text">Salary</label>
            <br />
            <input className="text" type="text" id="salary" name="salary" onChange={(e)=>{
                setSalary(e.target.value)
            }}/> <br />
            {error&&salary<=0?<label className="error">Enter a valid Salary</label>:""}
            <br />
            <label className="text">Emergency Contact</label>
            <br />
            <input className="text" type="text" id="emergencycontact" name="emergencycontact" onChange={(e)=>{
                setEmergencycontact(e.target.value)
            }}/> <br />
            {error&&emergencycontact.length===0?<label className="error">Enter a valid Emergency Contact</label>:""}
            <br />
            <label className="text">Energency Contact Number</label>
            <br />
            <input className="text" type="text" id="emergencycontactno" name="emergencycontactno" onChange={(e)=>{
                setEmergencycontactno(e.target.value)
            }}/> <br />
            {error&&emergencycontactno.length===0?<label className="error">Enter a valid Emergency Contact Number</label>:""}
            <br />
            <label className="text">Hire Date</label>
            <br />
            <input className="text" type="date" id="hiredate" name="hiredate" onChange={(e)=>{
                setHiredate(e.target.value)
            }}/> <br />
            {error&&hiredate.length===0?<label className="error">Enter a valid Hire Date</label>:""}
            <br />
            <label className="text">Post</label>
            <br />
            <input className="text" type="text" id="post" name="post" onChange={(e)=>{
                setPost(e.target.value)
            }}/> <br />
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
            <input className="text" type="date" id="birthdate" name="birthdate" onChange={(e)=>{
                setBirthdate(e.target.value)
            }}/> <br />
            {error&&birthdate.length===0?<label className="error">Enter a valid Birth Date</label>:""}
            <br />
            <label className="text">Profile Image</label>
            <br />
            <input className="text" type="text" id="imgid" name="imgid" onChange={(e)=>{
                setImgid(e.target.value)
            }}/> <br />
            {error&&imgid.length===0?<label className="error">Enter a valid Image location</label>:""}
            <br />
            <br />
            <button className="btn btn-dark" onClick={submitEmp}>SIGN UP</button>
            <br />
            <br />
        </form>
    </div>
  );
}

export default Employeesignup;
