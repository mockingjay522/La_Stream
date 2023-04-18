import '../style/App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import Dashboard from './Dashboard';
import { ContactsProvider } from '../context/ContactsProvider'
import { ConversationsProvider } from '../context/ConversationsProvider'
import { SocketProvider } from '../context/SocketProvider'
import DashboardBar from './DashboardBar';

//Home Page of Employee
function Employeehome({id}) {

  const [empname, setEmpname] = useState('')
  const [email, setEmail] = useState('')
  const [orgid, setOrgid] =useState('')
  const [organization, setOrganization]=useState('')

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
        setEmpname(res.data.firstName)
        setEmail(res.data.email)
        setOrgid(res.data.orgid) 

        //Get organization Data
        Axios.post(`http://localhost:3001/orgData`, {
          orgid: orgid,
          }).then((res1)=>{
            setOrganization(res1.data.orgname)
          })
  })
   
},[])

  //Employee Home Page Components
  return (
    <div className = "contente">
        <SocketProvider id ={id}>
          <ContactsProvider>
            <DashboardBar/>
            <ConversationsProvider id={id}><Dashboard id ={id} /></ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>   
    </div>
  );
}
export default Employeehome;
