import '../App.css';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/file";

import video from "../Assets/Normalized/animations/LandingPage.mp4"

const Start = () => {
  return (
      <div className = {"start_div"}>
        <ReactPlayer url = {video} playing = {true} loop = {true} muted={true} className = {"background"} width = {"100vw"} height = {"100vh"} ></ReactPlayer>
       <Link to ="/slide"><button className = "start-button">START</button></Link>
    </div>
  );
}

export default Start;
