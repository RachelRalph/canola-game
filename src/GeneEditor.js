import y_canola_flowers from "./Assets/Normalized/stills/flowers/yellow_flower.png"
import w_canola_flowers from "./Assets/Normalized/stills/flowers/white_flower.png"
import b_canola_flowers from "./Assets/Normalized/stills/flowers/blue_flower.png"
import p_canola_flowers from "./Assets/Normalized/stills/flowers/purple_flower.png"


import Plant from "./Plant.js"

import './App.css';

import { useState } from 'react';

import FeatureSelector from "./FeatureSelector.js"


import Dna from "./Dna";

function GeneEditor({getPlantPart, togglePlant, className = ""}) {


    //Hooks for the colour of the flower. 

    const [flowerColour, setFlowerColour] = useState(0);
    const flowers = [y_canola_flowers, w_canola_flowers, b_canola_flowers, p_canola_flowers];


    const getColour = () => {
        return flowerColour;
    }

    const changeColour = (colour) => {
        setFlowerColour(colour);
        setAnimateDNA(true);

    }

    //Hooks for the root / pod / height combinations

    const [roots, _setRoots] = useState("short");
    const [animateRoots, _setAnimateRoots] = useState(false)

    const getRoots = () => { return roots;}
    const setRoots = (value) => { if (roots !== value){
        _setRoots(value);
        setAnimateRoots(true);
        setAnimateDNA(true);
    }}

    const setAnimateRoots = (value) => { _setAnimateRoots(value);}
    const getAnimateRoots = () => {return(animateRoots)}

    const [height, _setHeight] = useState("tall");

    const getHeight = () => { return height;}
    const setHeight = (value) => { if (height !== value){
        _setHeight(value)
        setAnimateDNA(true);
    }

    }

    /*TODO: ADD height animations */

    const [pods, _setPods] = useState("few");
    const [animatePods, _setAnimatePods] = useState(false)

    const getAnimatePods = () => {return animatePods;}
    const setAnimatePods = (value) => {_setAnimatePods(value); console.log("Animate pods is", value)};

    const getPods = () => { return pods;}
    const setPods = (value) => {if (pods !== value){
        _setPods(value);
        setAnimatePods(true);
        setAnimateDNA(true);
    }}

    const [animateDNA, setAnimateDNA] = useState(false)

    
  

    


    if (getPlantPart() === 0){
        const isFlowerStage = className.includes("flower-stage");
        return (
            <div className = {`gene-editor ${className}`.trim()}>
            <img
                src = {flowers[flowerColour]}
                alt = {"canola plant"}
                className = {isFlowerStage ? "flower-art flower-stage-art" : "flower-art"}
            />
            <div className = "dna-selector">
                <FeatureSelector plantPart = {getPlantPart()} togglePlant = {togglePlant} getColour = {getColour} setFlowers = {changeColour} style = {{backgroundColor : "blue"}}/>
            </div>
            <Dna isPlaying = {animateDNA} setAnimateDNA = {setAnimateDNA}/>
            </div>
        );
    }
    else{
        return (
            <div className = {`gene-editor ${className}`.trim()}>
            <Plant getRoots = {getRoots} getPods = {getPods} getAnimateRoots = {getAnimateRoots} getAnimatePods = {getAnimatePods} setAnimateRoots = {setAnimateRoots} setAnimatePods = {setAnimatePods} getHeight = {getHeight}/>
            <div className = "dna-selector">
                <FeatureSelector plantPart = {getPlantPart()}  togglePlant = {togglePlant} setRoots = {setRoots} setStem = {setHeight} getColour = {getColour} setPods = {setPods} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} flower = {flowers[getColour()]}/>
            </div>
            <Dna isPlaying = {animateDNA} setAnimateDNA = {setAnimateDNA}/>
            </div>
            
        );
    }

}

export default GeneEditor;
