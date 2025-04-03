import { useState } from 'react';
import watercolour_background from "../Assets/Watercolour-background.jpeg"
import dna from "../Assets/DNA.png"

import '../App.css';
import GeneEditor from "../GeneEditor.js";


const GameFlower = () => {

    return (
        <div className = "game-screen">
          <div className = "game-text">
            <h1 className = "sour-gummy-bold">Flowers</h1>
            <h3 className = "sour-gummy">Canola flowers are yellow by default. <br/>As the plant matures, these flowers fall away and are replaced by seed pods.</h3>
        </div>
        <GeneEditor plantPart = {0} className = {"gene-editor"}/>
        <img src = {dna} className = {"dna"}/>
        
        </div>
  );
}

export default GameFlower;
