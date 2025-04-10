import React from "react"
import Modal from 'react-modal';
import {useRef} from 'react';
import { useState } from 'react';

import { useReactToPrint } from "react-to-print";

import PostCard from "./PostCard.js";
import PostcardBack from "./PostcardBack.js";

import Plant from "./Plant.js"

import PrintText from "./PrintText.js";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';


function PrintModal({isOpen, closeModal, flower, getRoots, getHeight, getPods, isFlower, type}){

    const layout = {
        'default': [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' print',
          '{shift} z x c v b n m , . / {shift}',
          '.com @ {space}'
        ],
        'shift': [
          '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " print',
          '{shift} Z X C V B N M &lt; &gt; ? {shift}',
          '.com @ {space}'
        ]
      }
    


    Modal.setAppElement(document.getElementById('root'));

    const handleSubmit = () => {
        handlePrint();
        
    }


    //Set up state for printing

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: 'Title',
        contentRef: componentRef,
        onAfterPrint: () => {closeModal();}
      });

    //Global name variable for printing. 

    const [name, setName] = useState(""); 

    const onKeyPress = button => {
        if(button === "print"){
            handleSubmit();
        }
    }

    const onChange = name => {
        if (name.length < 5 || name.slice(-5) != "print"){
            setName(name);
        }
       }

    if (isFlower){
    return(
        <div>
        <Modal isOpen = {isOpen} className = {"modal"}>
            <PrintText isFlower = {isFlower} type = {type}></PrintText>
            <form> 
                <h1>{name}</h1>
            </form>
        <Keyboard onChange = {onChange} layout = {layout} onKeyPress = {onKeyPress} style = {{width : "100vw"}} className = {"keyboard"}> </Keyboard>
        </Modal>
        <div ref = {componentRef} className = {"hide"} >
        <PostCard isFlower = {isFlower} flower = {flower} name = {name}/> 
        <PostcardBack/> 
        </div>
        </div>);
        
    }
    else {
        return(
            <div>
            <Modal isOpen = {isOpen} className = {"modal"}>
                <form> 
                    <PrintText isFlower = {false} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} />
                    <h1>{name}</h1>
                </form>
                <Keyboard onChange = {onChange} layout = {layout} onKeyPress = {onKeyPress} style = {{width : "100vw"}} className = {"keyboard"}> </Keyboard>
    
            </Modal>
            <div ref = {componentRef} className = {"hide"} >
                <PostCard isFlower = {isFlower} flower = {flower} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} name = {name}/> 
                <PostcardBack/> 
            </div>
    
            </div>);
    }

}

export default PrintModal;