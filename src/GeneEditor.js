import y_canola_flowers from "./Assets/yellow_flower.png"
import w_canola_flowers from "./Assets/white_flower.png"
import b_canola_flowers from "./Assets/blue_flower.png"
import p_canola_flowers from "./Assets/purple_flower.png"


import PrintModal from "./PrintModal.js";
import Plant from "./Plant.js"

import './App.css';

import { useState } from 'react';

import FeatureSelector from "./FeatureSelector.js"



function GeneEditor({plantPart}) {


    //Hooks for the colour of the flower. 

    const [flowerColour, setFlowerColour] = useState(0);
    const flowers = [y_canola_flowers, w_canola_flowers, b_canola_flowers, p_canola_flowers];

    const changeColour = (colour) => {
        setFlowerColour(colour);
    }

    //Hooks for the root / pod / height combinations

    const [roots, _setRoots] = useState("short");
    const [animateRoots, _setAnimateRoots] = useState(false)

    const getRoots = () => { return roots;}
    const setRoots = (value) => { _setRoots(value); console.log(animateRoots); setAnimateRoots(true); console.log("Set Roots");}

    const setAnimateRoots = (value) => {console.log("Animate roots is ", value); _setAnimateRoots(value)}
    const getAnimateRoots = () => {return(animateRoots)}

    const [height, _setHeight] = useState("tall");

    const getHeight = () => { return height;}
    const setHeight = (value) => {_setHeight(value)}

    /*TODO: ADD height animations */

    const [pods, _setPods] = useState("few");
    const [animatePods, _setAnimatePods] = useState(false)

    const getAnimatePods = () => {return animatePods;}
    const setAnimatePods = (value) => {_setAnimatePods(value); console.log("Animate pods is", value)};

    const getPods = () => { return pods;}
    const setPods = (value) => {_setPods(value); setAnimatePods(true); console.log("Pods are ", value)}

    
  
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
            <img src = {flowers[flowerColour]} alt = {"canola plant"} className = {"canola-flower"}/>
            <div className = "dna-selector">
            <div className = {"colour-selector"}>
                <FeatureSelector plantPart = {plantPart} setFlowers = {changeColour} />
                <button id = "openModal" onClick = {() => {openModal(); console.log(isModalOpen);}}>Finish!</button>
                <PrintModal isOpen = {isModalOpen} closeModal = {closeModal} flower = {flowers[flowerColour]} isFlower = {true} type = {flowerColour}/>
        
            </div>
            </div>
            </div>
        );
    }
    else{
        return (
            <div className = "gene-editor">
            <Plant getRoots = {getRoots} getPods = {getPods} getAnimateRoots = {getAnimateRoots} getAnimatePods = {getAnimatePods} setAnimateRoots = {setAnimateRoots} setAnimatePods = {setAnimatePods} getHeight = {getHeight}/>
            <div className = "dna-selector">
                <FeatureSelector plantPart = {plantPart} setRoots = {setRoots} setStem = {setHeight} setPods = {setPods}/>
                <button id = "openModal" onClick = {() => {openModal(); console.log(isModalOpen);}}>Print!</button>
                {/*<PrintModal isOpen = {isModalOpen} closeModal = {closeModal} flower = {flowers[flowerColour]} plant = {plants[plantType]} isFlower = {false} type = {plantType}/> */}
            </div>
            </div>
        );
    }

}

export default GeneEditor;