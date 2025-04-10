
import "./App.css";
import "./print.css"
import background from "./Assets/Background.png"
import Plant from "./Plant.js"

//const plant_getters = [getRoots, getHeight, getPods];

function PostCard({isFlower, flower,getRoots, getHeight, getPods, name}){

    if (isFlower === true){
    return(
        <div className = {"postcard-div"}>
            <img src = {background} className = {"postcard-background"}/>
            <img src = {flower} className = {"postcard-flower"}/>
            <h4 className = {"postcard-text"} >{name}'s Canola Plant</h4>
        </div>

    )}
    else{
        return(
        <div className = {"postcard-div"}>
            <img src = {background} className = {"postcard-background"}/>
            <Plant className = {"postcard-plant"} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} getAnimatePods = {() => {return false;}} getAnimateRoots = {() => {return false;}}
            setAnimatePods = {() => {}} setAnimateRoots = {() => {}} className = {"postcard-plant"}/>
            <h4 className = {"postcard-text"} >{name}'s Canola Plant</h4>
        </div>);

    }



}

export default PostCard;