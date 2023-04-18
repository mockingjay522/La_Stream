import '../style/App.css';
import logo from '../img/Logo.png';

function Header() {
  //Navigation Bar
  return(
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/"><img id = "logo" style={{width: '250px'}} src = {logo} alt="Logo"/></a>
      </div>
      <ul class="nav navbar-nav">
        <li class="nav-item"><a class="nav-link" href="about">About</a></li>
        <li class="nav-item"><a class="nav-link" href="solutions">Solutions</a></li>
        <li class="nav-item"><a class="nav-link" href="resources">Resources</a></li>
        <li class="nav-item"><a class="nav-link" href="pricing">Pricing</a></li>
        <li class="nav-item"><a class="nav-link" href="contact">Contact</a></li>
      </ul>
      {/* Sign In and Sign Up buttons */}
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item"><a class="nav-link" href="employeesignin"><button type="button" class="btn btn-dark">Sign In</button></a></li>
        <li class="nav-item"><a class="nav-link" href="adminsignup"><button type="button" class="btn btn-dark">Sign Up</button></a></li>
      </ul>
    </div>
  </nav>
  )
}

export default Header;
