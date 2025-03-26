import '../App.css';
import { Link } from "react-router";

import  start_screen from "../Assets/start-screen.jpeg"

const Start = () => {
  return (
      <div className = {"start_div"}>
        <Link to = "slide" className = "start_screen"><img src ={start_screen}/></Link>
    </div>
  );
}

export default Start;
