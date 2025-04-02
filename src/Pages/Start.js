import '../App.css';
import { Link } from "react-router";

import  start_screen from "../Assets/start-screen.jpeg"

const Start = () => {
  return (
      <div className = {"start_div"}>
        <h1 className = {"title"}>Design Your Own Canola Plant</h1>
       <img className = {"background"} src ={start_screen}/>
       <Link to ="/slide"><button className = "start-button">START</button></Link>
    </div>
  );
}

export default Start;
