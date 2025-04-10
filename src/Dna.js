import animation from "./Assets/Animations/DNA.webm"
import ReactPlayer from "react-player/file";
import * as React from "react";

function Dna({isPlaying, setAnimateDNA}){

    const player = React.useRef()
    const onEnd = () =>{
        setAnimateDNA(false);
        player.current.seekTo(0);
        console.log("video ended");
    }
    return(
        <div className = {"dna-pos-div"}>
    <ReactPlayer ref = {player} url = {animation} muted = {true} playing={isPlaying} loop={false} onEnded = {onEnd} height = {"100vh"} className = "dna"></ReactPlayer></div>);

}

export default Dna
