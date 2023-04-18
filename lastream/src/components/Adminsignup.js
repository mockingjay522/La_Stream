import React, {useState} from "react";
import '../style/App.css';
import Axios from "axios";

function Adminsignup() {
  
const [orgname, setOrgname] = useState('')  
const [industry, setIndustry] = useState('-')  
const [service, setService] = useState('-')  
const [numberemp, setNumberemp] = useState('-')  
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')  
const [error, setError] = useState(false)
const [duplicate, setDuplicate] =useState(false)

const submitOrg =async (e)=>{

    e.preventDefault()
    setDuplicate(false)

    //Check if every box has been filled by user
    if(orgname.length===0||industry==="-"||service==="-"||numberemp==="-"||email.length===0||password.length<=6){
        setError(true)
        return;
    }

    //check if user with the same email exists
    Axios.post(`http://localhost:3001/validateadminemail`, { 
        email: email, 
    }).then((res)=>{
        console.log("Here")
        //if user exists alert user
        if(res.data.exists){
            setDuplicate(true)
            return;
        }else{
            //if user does not exist, create new user
            Axios.post(`http://localhost:3001/createUser`, {
                orgname: orgname, 
                industry: industry, 
                service: service, 
                numberemp: numberemp, 
                email: email, 
                password: password,
            }).then((response)=>{
                alert("Thank you for signing up. Your organization id is " + response.data.orgid)
                window.location.href="./adminsignin"
            })
        }
    })
}

//Admin Register Page Components
return (
    <div className = "content">
        <div className ="slogan">
            <p>Admin Sign Up</p>
        </div>
        <form className = "signinform">
            <label className="text">Organization Name</label>
            <br />
            <input className="text" type="text" id="orgname" name="orgname" onChange={(e)=>{
                setOrgname(e.target.value)
            }}/> <br />
            {error&&orgname.length===0?<label className="error">Enter a valid Organization Name</label>:""}
            <br />
            <label className="text">Industry</label>
            <br />
            <select className="text" id="industry" name="industry" value={industry} onChange={(e)=>{
                setIndustry(e.target.value)
            }}>
                <option value="-">Select a Industry </option>
                <option value="IT">IT</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Metal">Metal</option>
                <option value="Chemical">Chemical</option>
                <option value="Commerce">Commerce</option>
                <option value="Construction">Construction</option>
                <option value="Education">Education</option>
                <option value="FinancialService">Financial Service</option>
                <option value="Food">Food/ Drink. Tobacoo</option>
                <option value="Health">Health</option>
                <option value="Hotel">Hotel</option>
                <option value="Mining">Mining</option>
                <option value="Engineering">Engineering</option>
                <option value="Oil">Oil</option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="PublicService">Public Service</option>
                <option value="Shipping">Shipping</option>
                <option value="Textile">Textile</option>
                <option value="Transport">Transport</option>
                <option value="Other">Other</option>
            </select> 
            <br />
            {error&&industry==="-"?<label className="error">Please select an industry</label>:""}
            <br />
            <label className="text">Type of Service</label>
            <br />
            <select className="text" id="service" name="service" value={service} onChange={(e)=>{
                setService(e.target.value)
            }}>
                <option value="-">Select a Service </option>
                <option value="Technical">Technical Service</option>
                <option value="BusinessService">Business Service</option>
                <option value="ConsumerServices">Consumer Services</option>
                <option value="Hospitability">Hospitability</option>
                <option value="PublicService">Public Service</option>
                <option value="ServiceEconomy">Service Economy</option>
                <option value="DigitalService">Digital Service</option>
                <option value="OnDemand">On Demand</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
            </select>
            <br />
            {error&&service==="-"?<label className="error">Please select a service</label>:""}
            <br />
            <label className="text">Number of Employees</label>
            <br />
            <select className="text" id="numberemp" name="numberemp" value={numberemp} onChange={(e)=>{
                setNumberemp(e.target.value)
            }}>
                <option value="-">Select a Size </option>
                <option value="Small">1-10</option>
                <option value="Medium">10-20</option>
                <option value="Large">20+</option>
            </select>
            <br />
            {error&&numberemp==="-"?<label className="error">Please select a size</label>:""}
            <br />
            <label className="text">Admin Email</label>
            <br />
            <input className="text" type="email" id="adminemail" name="adminemail" onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <br />
            {error&&email.length===0?<label className="error">Please enter a valid email address</label>:""}
            {duplicate?<label className="error">Admin user with the email already exists. Please use another email address</label>:""}
            <br />
            <label className="text">Password</label>
            <br />
            <input className="text" type="password" id="password" name="password" onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <br />
            {error&&password.length<=6?<label className="error">Please enter a password longer than 6 characters</label>:""}
            <br />
            <br />
            <button className="btn btn-dark" onClick={submitOrg}>SIGN UP</button>
            <br />
            <br />
            <p>Are you an admin looking to sign in? <a href="adminsignin">Click Here</a></p>
            <p>Are you an employee looking to sign in? <a href="employeesignin">Click Here</a></p>
        </form>
    </div>
  );
}

export default Adminsignup;
