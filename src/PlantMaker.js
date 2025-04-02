
import { useState } from 'react';
import watercolour_background from "./Assets/Watercolour-background.jpeg"
import dna from "./Assets/DNA.png"

import './App.css';
import GeneEditor from "./GeneEditor.js";


function PlantMaker() {

    const [plantPart, setPlantPart] = useState(0);
    const plantParts = ["flowers", "pods", "roots", "stem"];



    const togglePlantPartRight = () => {
        setPlantPart((plantPart + 1) % 4);
    };

    
    return (
        <div className = "game-screen">
        <div className = "selector">
            <h1 className = "sour-gummy-bold">{plantParts[plantPart]}</h1>
            <h1 className = {"sour-gummy-bold"} onClick = {togglePlantPartRight}> &gt; </h1>
        </div>
        <GeneEditor plantPart = {plantPart} className = {"gene-editor"}/>
        <img src = {dna} className = {"dna"}/>
        
        </div>
    );
}

export default PlantMaker;