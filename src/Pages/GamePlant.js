
import { useState } from 'react';
import '../App.css';
import GeneEditor from "../GeneEditor.js";


function PlantMaker() {

    const [plantPart, setPlantPart] = useState(0);
    const plantParts = ["flowers",  "roots", "stem", "pods"];



    const togglePlantPartRight = () => {
        setPlantPart((plantPart + 1) % 4);
        console.log("SETPLANTPART: ", {plantPart});
    };

    const getPlantPart = () => {
        return plantPart;
    }

    const plant_text = [
        "Canola flowers are yellow by default. \n As the plant matures, these flowers fall away and are replaced by seed pods.",
        "By default, canola plants have shallow roots which don’t hold much water. This makes them more susceptible to drought. \n Deeper roots will increase their drought tolerance.",
        "By default, canola plants are tall. This means they need more water to travel all the way up their stems to their leaves. \n A shorter stem increases drought tolerance.",
        "Canola seed pods are where much of their food value comes from. \n Adding more pods increases their yield and strengthens the food supply."

    ]
    
    const isFlowerStage = plantPart === 0;
    const textClassName = isFlowerStage ? "game-text flower-page-text" : "game-text plant-page-text";
    const titleClassName = isFlowerStage
        ? "sour-gummy-bold flower-header"
        : "sour-gummy-bold";
    const introClassName = isFlowerStage
        ? "sour-gummy flower-intro"
        : "sour-gummy plant-intro display-linebreak";
    const titleText = isFlowerStage ? "Flowers" : plantParts[plantPart];
    const introText = isFlowerStage ? (
        <>
            Canola flowers are yellow by default. <br />
            As the plant matures, these flowers fall away and are replaced by seed pods.
        </>
    ) : (
        plant_text[plantPart]
    );

    return (
        <div className = "game-screen">
        <div className = {textClassName}>
        {isFlowerStage ? (
            <h1 className = {titleClassName}>{titleText}</h1>
        ) : (
            <div className = "selector">
                <h1 className = {titleClassName}>{titleText}</h1>
            </div>
        )}
        <h3 className = {introClassName}>{introText}</h3>
        </div>
        <GeneEditor togglePlant = {togglePlantPartRight} getPlantPart = {getPlantPart} className = {isFlowerStage ? "flower-stage" : "plant-stage"}/>
        
        </div>
    );
}



export default PlantMaker;
