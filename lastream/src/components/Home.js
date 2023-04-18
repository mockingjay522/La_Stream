import '../style/App.css';
import homeimage1 from '../img/homeimage1.jpeg';
import homeimage2 from '../img/homeimage2.jpeg';
import homeimage3 from '../img/homeimage3.jpeg';

function Home() {
  // Home Page  
  return (
    <div className = "content">
    <div className ="slogan">
        <p>The new way to</p>
        <p>collaborate</p>
    </div>
    <div className = "description">
        <p>Là Stream is the remote collaboration tool for enterprise and hybrid teams of all sizes</p>
    </div>
    <div className = "ideas">
        <p>A place to talk about your ideas</p>
    </div>
    <div className = "homecontentimage">
        <img className="homebodyimage" src ={homeimage1} alt="Image1"/>
    </div>
    <div className = "ideas">
        <p>A place to discuss with your team</p>
    </div>
    <div className = "homecontentimage">
        <img className="homebodyimage" src = {homeimage2} alt="Image2"/>
    </div>
    <div className = "ideas">
        <p>A place to manage your hybrid organization</p>
    </div>
    <div className = "homecontentimage">
        <img className="homebodyimage" src={homeimage3} alt="Image3"/>
    </div>
</div>
  );
}

export default Home;
