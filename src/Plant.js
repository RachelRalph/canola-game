/*Roots*/

import shortRoots from "./Assets/Plants/ShortRoots.png";
import longRoots from "./Assets/Plants/LongRoots.png";

/*Stems*/

import shortPlantFewPods from "./Assets/Plants/ShortPlant.png";
import tallPlantFewPods from "./Assets/Plants/TallPlant.png";

/*Pods*/

import shortPlantManyPods from "./Assets/Plants/output.png";
import tallPlantManyPods from "./Assets/Animations/output.webp";


/*Videos*/
import growingRoots from "./Assets/Animations/GrowingRoots.webm";
import growingRootsReverse from "./Assets/Animations/NEWGrowingRootsReverse.webm";

import tallPlantGrowingPods from "./Assets/Animations/NEWTallPlantsMorePods.webm";
import tallPlantGrowingPodsReverse from "./Assets/Animations/NEWTallPlantsMorePodsREVERSE.webm";

import shortPlantGrowingPods from "./Assets/Animations/NEWShortPlantsMorePods.webm";
import shortPlantGrowingPodsReverse from "./Assets/Animations/NEW_NEWShortPlantsMorePodsREVERSE.webm"

import Animation from "./Animation.js";
import  './App.css';

export function Roots({getRoots, getAnimateRoots, setAnimateRoots}){
    if(getRoots() === "short"){
        return( <div className = "shortRoots pos-div"><Animation video = {growingRootsReverse} png = {shortRoots} getAnimate= {getAnimateRoots} setAnimate = {setAnimateRoots}/></div>);
    }
    else{
        return(
         <div className = "longRoots pos-div"><Animation video = {growingRoots} png = {longRoots} getAnimate= {getAnimateRoots} setAnimate = {setAnimateRoots}/></div>
       );
    }
    
}

export function Stem({getHeight, getPods, animatePods, setAnimatePods}){
    if (getHeight() === "short" && getPods() === "few"){
        return( 
        <div className = "shortPlant shortPlantFewPods pos-div">
        <Animation video = {shortPlantGrowingPodsReverse} png = {shortPlantFewPods} getAnimate= {animatePods} setAnimate = {setAnimatePods}/>
        </div>);
    }
    else if (getHeight() === "tall" && getPods() === "few"){
        return (<div className = "tallPlant tallPlantFewPods pos-div"> <Animation video = {tallPlantGrowingPodsReverse} png = {tallPlantFewPods} getAnimate= {animatePods} setAnimate = {setAnimatePods}/></div>);
    }

    else if(getHeight() === "short"  && getPods() === "many"){
                 
        return ( <div className = "shortPlantManyPods pos-div"><Animation video = {shortPlantGrowingPods} png = {shortPlantManyPods} getAnimate= {animatePods} setAnimate = {setAnimatePods}/>
                </div>);
    }

    else if(getHeight() === "tall" && getPods() === "many"){
        return (<div className = "tallPlant tallPlantManyPods pos-div"><Animation video = {tallPlantGrowingPods} png = {tallPlantManyPods} getAnimate= {animatePods} setAnimate = {setAnimatePods}/></div> );
    }

    
}





function Plant({getPods, getRoots, getHeight, getAnimatePods, getAnimateRoots,  setAnimatePods, setAnimateRoots}){

    return(
    <div>
    <Stem getHeight = {getHeight} getPods = {getPods} animatePods = {getAnimatePods} setAnimatePods = {setAnimatePods}/>
    <Roots getRoots = {getRoots} getAnimateRoots = {getAnimateRoots} setAnimateRoots = {setAnimateRoots}/>
    </div>);

    
}

export default Plant;