import React from "react"
import Modal from 'react-modal';
import {useRef} from 'react';
import { useState } from 'react';

import { useReactToPrint } from "react-to-print";

import PostCard from "./PostCard.js";
import PostcardBack from "./PostcardBack.js";

import Plant from "./Plant.js"

import PrintText from "./PrintText.js";


function PrintModal({isOpen, closeModal, flower, getRoots, getHeight, getPods, isFlower, type}){
    


    Modal.setAppElement(document.getElementById('root'));

    const handleSubmit = () => {
        closeModal();
        handlePrint();
        
    }


    //Set up state for printing

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: 'Title',
        contentRef: componentRef,
      });

    //Global name variable for printing. 

    const [name, setName] = useState(""); 
    if (isFlower){
    return(
        <div>
        <Modal isOpen = {isOpen} className = {"modal"}>
            <PrintText isFlower = {isFlower} type = {type}></PrintText>
            <form> 
                <input type = "text" onChange = {(e) => setName(e.target.value)} />
            </form>
            <button onClick = {() => {handleSubmit()}}>Print</button>

        <div ref = {componentRef} className = {"hide"} >
            <PostCard isFlower = {isFlower} flower = {flower} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} name = {name}/> 
            <PostcardBack/> 
        </div>
        </Modal>

        </div>);
        
    }
    else {
        return(
            <div>
            <Modal isOpen = {isOpen} className = {"modal"}>
                <form> 
                    <input type = "text" onChange = {(e) => setName(e.target.value)} />
                </form>
                <button onClick = {() => {handleSubmit()}}>Print</button>
    
            <div ref = {componentRef} className = {"hide"} >
                <PostCard isFlower = {isFlower} flower = {flower} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} name = {name}/> 
                <PostcardBack/> 
            </div>
            </Modal>
    
            </div>);
    }

}

export default PrintModal;