import y_canola_flowers from "./Assets/yellow_canola_flowers.png"
import l_canola_flowers from "./Assets/light_canola_flowers.png"
import d_canola_flowers from "./Assets/dark_canola_flowers.png"
import close_flower from "./Assets/yellow-flowers-close-up.png"


import PrintModal from "./PrintModal.js";

import './App.css';

import { useState } from 'react';



function GeneEditor({plantPart}) {

    const [flowerColour, setFlowerColour] = useState(0);
    const flowers = [y_canola_flowers, l_canola_flowers, d_canola_flowers];

    const changeColour = (colour) => {
        setFlowerColour(colour);
    }
    

    
    //Set up modal props

    const [isModalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    //Global name variable for printing. 

    const [name, setName] = useState("");
    


    if (plantPart === 0){
        return (
            <div className = "gene-editor">
            <img src = {flowers[flowerColour]} alt = {"canola plant"} className = {"canola-plant"}/>
            <div className = {"colour-selector"}>
                <img src = {close_flower} onClick = {() => changeColour(1)}/>
                <h1>light yellow</h1>
                <img src = {close_flower} onClick = {() => changeColour(0)}/>
                <h1>mustard yellow</h1>
                <img src = {close_flower} onClick = {() => changeColour(2)}/>
                <h1>dark yellow</h1>
                <button id = "openModal" onClick = {() => {openModal(); console.log(isModalOpen);}}>Print!</button>
                <PrintModal isOpen = {isModalOpen} closeModal = {closeModal} flowerColour = {flowerColour}/>
            
                
            </div>
            </div>
        );
    }
    else{
        return (
            <div>
            <img src = {y_canola_flowers} alt = {"canola plant"}/>
            </div>
        );
    }

}

export default GeneEditor;