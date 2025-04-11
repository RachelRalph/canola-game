import ReactPlayer from "react-player/file";
import { useState } from "react";

function Animation({video, png, getAnimate, setAnimate}) {

    const onEnd = () =>{
        setAnimate(false);
    }

    if (getAnimate()){
    return (
       <ReactPlayer url = {video} muted = {true} playing={true} loop={false}  onEnded = {onEnd} className = "animation pos-div-2"></ReactPlayer>
        );
    }
    else {
        return(
        <img src = {png} className = "image"></img>
        );
    }
}

export default Animation;