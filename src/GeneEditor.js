import y_canola_flowers from "./Assets/yellow_flower.png"
import w_canola_flowers from "./Assets/white_flower.png"
import b_canola_flowers from "./Assets/blue_flower.png"
import p_canola_flowers from "./Assets/purple_flower.png"


import PrintModal from "./PrintModal.js";
import Plant from "./Plant.js"

import './App.css';

import { useState } from 'react';

import FeatureSelector from "./FeatureSelector.js"

import PostCard from "./PostCard"

import Dna from "./Dna";

function GeneEditor({plantPart}) {


    //Hooks for the colour of the flower. 

    const [flowerColour, setFlowerColour] = useState(0);
    const flowers = [y_canola_flowers, w_canola_flowers, b_canola_flowers, p_canola_flowers];
    const width = ["25vw", "23.5vw", "28vw", "25vw"]

    const changeColour = (colour) => {
        setFlowerColour(colour);
        setAnimateDNA(true);
    }

    //Hooks for the root / pod / height combinations

    const [roots, _setRoots] = useState("short");
    const [animateRoots, _setAnimateRoots] = useState(false)

    const getRoots = () => { return roots;}
    const setRoots = (value) => { if (roots != value){
        _setRoots(value);
        setAnimateRoots(true);
        setAnimateDNA(true);
    }}

    const setAnimateRoots = (value) => { _setAnimateRoots(value);}
    const getAnimateRoots = () => {return(animateRoots)}

    const [height, _setHeight] = useState("tall");

    const getHeight = () => { return height;}
    const setHeight = (value) => { if (height != value){
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
    const setPods = (value) => {if (pods != value){
        _setPods(value);
        setAnimatePods(true);
        setAnimateDNA(true);
    }}

    const [animateDNA, setAnimateDNA] = useState(false)

    
  
    //Set up modal props

    const [isModalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    


    if (plantPart === 0){
        return (
            <div className = "gene-editor">
            <img src = {flowers[flowerColour]} alt = {"canola plant"} style = {{width : width[flowerColour]}}className = {"canola-flower"}/>
            <div className = "dna-selector">
                <FeatureSelector plantPart = {plantPart} setFlowers = {changeColour} style = {{backgroundColor : "blue"}}/>
                <button className = {"choice"}  id = "openModal" onClick = {() => {openModal(); console.log(isModalOpen);}}><h3 className = "sour-gummy-sub">Finish!</h3></button>
                <PrintModal isOpen = {isModalOpen} closeModal = {closeModal} flower = {flowers[flowerColour]} isFlower = {true} type = {flowerColour}/>
            </div>
            <Dna isPlaying = {animateDNA} setAnimateDNA = {setAnimateDNA}/>
            </div>
        );
    }
    else{
        return (
            <div className = "gene-editor">
            <Plant getRoots = {getRoots} getPods = {getPods} getAnimateRoots = {getAnimateRoots} getAnimatePods = {getAnimatePods} setAnimateRoots = {setAnimateRoots} setAnimatePods = {setAnimatePods} getHeight = {getHeight}/>
            <div className = "dna-selector">
                <FeatureSelector plantPart = {plantPart} setRoots = {setRoots} setStem = {setHeight} setPods = {setPods}/>
                <button id = "openModal" className = "choice" onClick = {() => {openModal(); console.log(isModalOpen); }}><h4 className = "sour-gummy-sub">Print!</h4></button>
                {<PrintModal  isOpen = {isModalOpen} closeModal = {closeModal} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} isFlower = {false} /> }
            </div>
            <Dna isPlaying = {animateDNA} setAnimateDNA = {setAnimateDNA}/>
            </div>
            
        );
    }

}

export default GeneEditor;