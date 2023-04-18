import React from 'react';
// import '../style/App.css';
import Header from './Header'; 
import Home from './Home';
import Footer from './Footer';
import Adminsignin from './Adminsignin';
import Adminsignup from './Adminsignup';
import Adminhome from './Adminhome'
import Employeehome from './Employeehome'
import Employeesignup from './Employeesignup'
import Employeesignin from './Employeesignin'
import Attendance from './Attendance'
import CreateProject from './CreateProject';
import EmpprojectDashboard from './EmpProjectDashboard';
import EmployeeProfile from './EmployeeProfile';
import OtherProjectDashboard from './OtherProjectDashboard';
import ConferenceList from './ConferenceList';
import NewConference from './NewConference';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Conference from './Conference';
import useLocalStorage from '../hooks/useLocalStorage';
import LeaderProjectDashboard from './LeaderProjectDashboard';


function App() {

  const [id, setId] =useLocalStorage('id')
  
  // Define Routes
  const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/adminsignin", element: <Adminsignin />},
    {path: "/adminsignup", element: <Adminsignup />},
    {path:"/employeehome", element: <Employeehome id={id}/>},
    {path:"/adminhome", element: <Adminhome />},
    {path:"/employeesignup", element: <Employeesignup />},
    {path:"/employeesignin", element: <Employeesignin onIdSubmit={setId}/>},
    {path:"/conferencelist", element: <ConferenceList/>},
    {path: "/newConference", element: <NewConference/>},
    {path:"conference/:confId", element: <Conference />}, 
    {path: "/attendance", element: <Attendance />}, 
    {path:"/createProject", element: <CreateProject />},
    {path: "/empProjectDashboard", element: <EmpprojectDashboard />},
    {path: "/leaderProjectDashboard/:proId", element: <LeaderProjectDashboard/>},
    {path: "/empProfile", element: <EmployeeProfile/>},
    {path: "/otherProjectDashboard/:proId", element: <OtherProjectDashboard/>}
  ])

  //App Components
  return (
    <div>
      <Header />
      <hr />
      <RouterProvider router={router} />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
