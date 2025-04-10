
import { useState } from 'react';
import watercolour_background from "../Assets/Background.png"
import PrintText from "../PrintText.js"

import '../App.css';
import GeneEditor from "../GeneEditor.js";


function PlantMaker() {

    const [plantPart, setPlantPart] = useState(1);
    const plantParts = ["flowers",  "roots", "stem", "pods"];



    const togglePlantPartRight = () => {
        setPlantPart((plantPart + 1) % 4);
    };

    const plant_text = [
        "",
        "By default, canola plants have shallow roots which don’t hold much water. This makes them more susceptible to drought. \n Deeper roots will increase their drought tolerance.",
        "By default, canola plants are tall. This means they need more water to travel all the way up their stems to their leaves. \n A shorter stem increases drought tolerance.",
        "Canola seed pods are where much of their food value comes from. \n Adding more pods increases their yield and strengthens the food supply."

    ]

    if (plantPart != 3){
    
    return (
        <div className = "game-screen">
        <div className = "game-text">
        <div className = "selector">
            <h1 className = "sour-gummy-bold">{plantParts[plantPart]}</h1>
            <h1 className = {"sour-gummy-bold"} onClick = {togglePlantPartRight}> &gt; </h1>
        </div>
        <h3 className = "sour-gummy display-linebreak">{plant_text[plantPart]}</h3>
        </div>
        <GeneEditor plantPart = {plantPart} className = {"gene-editor"}/>
        
        </div>
    );
    }

    else{
        return (
            <div className = "game-screen">
            <div className = "game-text">
            <div className = "selector">
                <h1 className = "sour-gummy-bold">{plantParts[plantPart]}</h1>
            </div>
            <h3 className = "sour-gummy display-linebreak">{plant_text[plantPart]}</h3>
            </div>
            <GeneEditor plantPart = {plantPart} className = {"gene-editor"}/>
            
            </div>
        );
        }

    }


export default PlantMaker;