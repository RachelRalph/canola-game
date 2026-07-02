/*Roots*/

import shortRoots from "./Assets/Normalized/stills/roots/ShortRoots.png";
import longRoots from "./Assets/Normalized/stills/roots/LongRoots.png";
import growingRootsSafari from "./Assets/Normalized/animations/GrowingRoots.png";
import growingRootsReverseSafari from "./Assets/Normalized/animations/NEWGrowingRootsReverse.png";

/*Stems*/

import shortPlantFewPods from "./Assets/Normalized/stills/plants/ShortPlant.png";
import tallPlantFewPods from "./Assets/Normalized/stills/plants/TallPlant.png";

/*Pods*/

import shortPlantManyPods from "./Assets/Normalized/stills/plants/output.png";
import tallPlantManyPods from "./Assets/Normalized/animations/output.webp";


/*Animations*/
import growingRoots from "./Assets/Animations/GrowingRoots.webm";
import growingRootsReverse from "./Assets/Normalized/animations/NEWGrowingRootsReverse.webm";

import tallPlantGrowingPodsSafari from "./Assets/Normalized/animations/NEWTallPlantsMorePods.png";
import tallPlantGrowingPodsReverseSafari from "./Assets/Normalized/animations/NEWTallPlantsMorePodsREVERSE.png";

import tallPlantGrowingPods from "./Assets/Normalized/animations/NEWTallPlantsMorePods.png";
import tallPlantGrowingPodsReverse from "./Assets/Normalized/animations/NEWTallPlantsMorePodsREVERSE.png";

import shortPlantGrowingPodsSafari from "./Assets/Normalized/animations/NEWShortPlantsMorePods.png";
import shortPlantGrowingPodsReverseSafari from "./Assets/Normalized/animations/NEW_NEWShortPlantsMorePodsREVERSE.png";

import shortPlantGrowingPods from "./Assets/Normalized/animations/NEWShortPlantsMorePods.png";
import shortPlantGrowingPodsReverse from "./Assets/Normalized/animations/NEW_NEWShortPlantsMorePodsREVERSE.png"

import Animation from "./Animation.js";
import  './App.css';

export function Roots({getRoots, getAnimateRoots, setAnimateRoots}){
    if(getRoots() === "short"){
        return( <div className = "asset-shell roots-shell"><Animation kind="roots" video = {growingRootsReverse} safariVideo={growingRootsReverseSafari} png = {shortRoots} getAnimate= {getAnimateRoots} setAnimate = {setAnimateRoots} durationMs={1900}/></div>);
    }
    else{
        return(
         <div className = "asset-shell roots-shell"><Animation kind="roots" video = {growingRoots} safariVideo={growingRootsSafari} png = {longRoots} getAnimate= {getAnimateRoots} setAnimate = {setAnimateRoots} durationMs={1900} stillClassName="long-roots-still"/></div>
       );
    }
    
}

export function Stem({getHeight, getPods, animatePods, setAnimatePods}){
    console.log(getHeight() === "short");
    console.log(getHeight());
    if (getHeight() === "short" && getPods() === "few"){
        return( 
        <div className = "asset-shell plant-shell short-plant-shell">
        <Animation kind="plant" video = {shortPlantGrowingPodsReverse} safariVideo={shortPlantGrowingPodsReverseSafari} png = {shortPlantFewPods} getAnimate= {animatePods} setAnimate = {setAnimatePods} durationMs={4466} stillClassName="short-plant-still"/>
        </div>);
    }
    else if (getHeight() === "tall" && getPods() === "few"){
        return (<div className = "asset-shell plant-shell"> <Animation kind="plant" video = {tallPlantGrowingPodsReverse} safariVideo={tallPlantGrowingPodsReverseSafari} png = {tallPlantFewPods} getAnimate= {animatePods} setAnimate = {setAnimatePods} durationMs={4466}/></div>);
    }

    else if(getHeight() === "short"  && getPods() === "many"){
                 
        return ( <div className = "asset-shell plant-shell short-plant-shell short-pods-shell"><Animation kind="plant" video = {shortPlantGrowingPods} safariVideo={shortPlantGrowingPodsSafari} png = {shortPlantManyPods} getAnimate= {animatePods} setAnimate = {setAnimatePods} durationMs={4466} stillClassName="short-plant-still" extraClassName="short-pods-animation"/>
                </div>);
    }

    else if(getHeight() === "tall" && getPods() === "many"){
        return (<div className = "asset-shell plant-shell"><Animation kind="plant" video = {tallPlantGrowingPods} safariVideo={tallPlantGrowingPodsSafari} png = {tallPlantManyPods} getAnimate= {animatePods} setAnimate = {setAnimatePods} durationMs={4466}/></div> );
    }
    else{
        return(<h1>AAAAAAAHHHHHHH!!!!!!,{getHeight()},{getPods()}</h1>)
    }

    
}





function Plant({getPods, getRoots, getHeight, getAnimatePods, getAnimateRoots,  setAnimatePods, setAnimateRoots}){

    return(
    <div className="plant-stack">
    <Stem getHeight = {getHeight} getPods = {getPods} animatePods = {getAnimatePods} setAnimatePods = {setAnimatePods}/>
    <Roots getRoots = {getRoots} getAnimateRoots = {getAnimateRoots} setAnimateRoots = {setAnimateRoots}/>
    </div>);

    
}

export default Plant;
