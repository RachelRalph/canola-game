import y_canola_flowers from "./Assets/yellow_flower.jpeg"
import w_canola_flowers from "./Assets/white_flower.png"
import b_canola_flowers from "./Assets/blue_flower.png"
import p_canola_flowers from "./Assets/purple_flower.jpeg"

import sr_mp_ts_plant from "./Assets/sr_ts_mp_plant.png"
import lr_mp_ts_plant from "./Assets/lr_ts_mp_plant.png"
import sr_fp_ts_plant from "./Assets/sr_ts_fp_plant.png"
import lr_fp_ts_plant from "./Assets/lr_ts_fp_plant.png"
import sr_mp_ss_plant from "./Assets/sr_ss_mp_plant.png"
import lr_mp_ss_plant from "./Assets/lr_ss_mp_plant.png"
import sr_fp_ss_plant from "./Assets/sr_ss_fp_plant.png"
import lr_fp_ss_plant from "./Assets/lr_ss_fp_plant.png"

import dna from "./Assets/DNA.png"


import PrintModal from "./PrintModal.js";

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

    const [plantType, setPlantType] = useState(0);
    const plants = [sr_mp_ts_plant, lr_mp_ts_plant, sr_fp_ts_plant, lr_fp_ts_plant, sr_mp_ss_plant, lr_mp_ss_plant, sr_fp_ss_plant, lr_fp_ss_plant]

    const getPlantType = () => {
        return plantType;
    }

    /*

    To change the root size: plant type -/+ 1
    To change the # of pods: plant type -/+ 2
    To change the hieght : plant type -/+ 4


    */
    

    
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
            <img src = {flowers[flowerColour]} alt = {"canola plant"} className = {"canola-plant"}/>
            <div className = "dna-selector">
            <div className = {"colour-selector"}>
                <div className = {"choice"} onClick = {() => changeColour(0)}>
                    <h3>yellow</h3>
                    <h5>Remove gene XXXX</h5>
                </div>
                <div className = {"choice"} onClick = {() => changeColour(1)}>
                    <h3>white</h3>
                    <h5>Remove gene XXXX</h5>
                </div>
                <div className = {"choice"} onClick = {() => changeColour(2)}>
                    <h3>blue</h3>
                    <h5>Remove gene XXXX</h5>
                </div>
                <div className = {"choice"} onClick = {() => changeColour(3)}>
                    <h3>purple</h3>
                    <h5>Remove gene XXXX</h5>
                </div>
                <button id = "openModal" onClick = {() => {openModal(); console.log(isModalOpen);}}>Print!</button>
                <PrintModal isOpen = {isModalOpen} closeModal = {closeModal} flower = {flowers[flowerColour]}/>
        
            </div>
            <img src = {dna} className = {"dna"}/>
            </div>
            </div>
        );
    }
    else{
        return (
            <div className = "gene-editor">
            <img src = {plants[plantType]} alt = {"canola plant"} className = {"canola-plant"}/>
            <div className = "dna-selector">
            <div className = {"colour-selector"}>
                <FeatureSelector plantPart = {plantPart} setPlantType = {setPlantType}  getPlantType = {getPlantType} />
                <button id = "openModal" onClick = {() => {openModal(); console.log(isModalOpen);}}>Print!</button>
                <PrintModal isOpen = {isModalOpen} closeModal = {closeModal} flower = {plants[plantType]}/>
            </div>
            <img src = {dna} className = {"dna"}/>
            </div>
            </div>
        );
    }

}

export default GeneEditor;