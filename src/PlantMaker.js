
import { useState } from 'react';
import arrow from "./Assets/orange-arrow.jpg";
import watercolour_background from "./Assets/Watercolour-background.jpeg"

import './App.css';
import GeneEditor from "./GeneEditor.js";


function PlantMaker() {

    const [plantPart, setPlantPart] = useState(0);
    const plantParts = ["flowers", "pods", "roots", "stem"];



    const togglePlantPartRight = () => {
        setPlantPart((plantPart + 1) % 4);
    };

    const togglePlantPartLeft = () => {
        setPlantPart((plantPart - 1) % 4);
    };
    
    return (
        <div className = "game-screen">
        <div className = "selector">
            <img src ={arrow} alt = {"arrow"} className = {"left-arrow"} onClick = {togglePlantPartLeft}/>
            <h1>{plantParts[plantPart]}</h1>
            <img src ={arrow} alt = {"arrow"} className = {"right-arrow"} onClick = {togglePlantPartRight}/>
        </div>
        <GeneEditor plantPart = {plantPart}/>
        
        </div>
    );
}

export default PlantMaker;