import "./App.css";
import EmailModal from "./EmailModal.js";
import {useState} from 'react';



function FeatureSelector({plantPart, getColour, setFlowers, setRoots, setStem, setPods, getRoots, getHeight, getPods, togglePlant, flower}){

    async function toggleAfterDelay() {
        console.log("Starting...");
        await delay(3000); // Pause for 3 seconds
        togglePlant();
        console.log("Resuming after 3 seconds.");

      }

      async function openModalAfterDelay() {
        console.log("Starting...");
        await delay(3000); // Pause for 3 seconds
        openModal();
        console.log("Resuming after 3 seconds.");

      }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //Set up modal props

    const [isModalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }
    


    if (plantPart === 0){

        return(
        <div className = {"colour-selector"}>
        <div className = {"choice"} onClick = {() => setFlowers(0)}>
            <h3 className = {"sour-gummy-sub"}>yellow</h3>
        </div>
        <div className = {"choice"} onClick = {() => setFlowers(1)}>
            <h3 className = {"sour-gummy-sub"}>white</h3>
        </div>
        <div className = {"choice"} onClick = {() => setFlowers(2)}>
            <h3 className = {"sour-gummy-sub"}>blue</h3>
        </div>
        <div className = {"choice"} onClick = {() => setFlowers(3)}>
            <h3 className = {"sour-gummy-sub"}>purple</h3>
        </div>
        <div className = {"choice"} onClick = {() => togglePlant()}>
            <h3 className = {"sour-gummy-sub"}>Continue</h3>
        </div>
        </div>

        );
    } 

    if (plantPart === 3){

        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => {setPods("many"); openModalAfterDelay()}}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>Add more pods</h3>
            </div>
            <div className = {"choice"} onClick = {() => {openModal()}}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>Keep current pods</h3>
            </div>
            <EmailModal className = {"modal"} isOpen = {isModalOpen} closeModal = {closeModal} getColour = {getColour} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} ></EmailModal>
        </div>
        );

    } 

    if (plantPart === 1){
        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => {setRoots("long"); toggleAfterDelay();}}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>Change to longer roots</h3>   
            </div>
            <div className = {"choice"} onClick = {() => {togglePlant()}}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}} >Continue with Short Roots</h3>
            </div>
        </div>);}
    


    if (plantPart === 2){

        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => {setStem("short"); toggleAfterDelay();}}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>Change to shorter plant</h3>
            </div>
            <div className = {"choice"} onClick = {() => {togglePlant()}}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>Keep tall plant</h3>
            </div>
            
        </div>);

    }
    

    else {
        return(
            <div><p>NOOOOOOOOOOO</p></div>
        )
    }
}

export default FeatureSelector;
