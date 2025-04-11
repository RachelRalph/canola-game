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
import { useNavigate} from "react-router-dom";


function PrintModal({isOpen, closeModal, flower, getRoots, getHeight, getPods, isFlower, type}){

    const layout = {
        'default': [
          '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
          ' Q W E R T Y U I O P { } |',
          ' A S D F G H J K L : " print',
          ' Z X C V B N M &lt; &gt; ? ',
          '@ .com {space}'
        ]
      }
    


    Modal.setAppElement(document.getElementById('root'));

    const handleSubmit = () => {
        handlePrint();
        
    }


    //Set up state for printing

    const componentRef = useRef();
    let navigate = useNavigate();
    const handlePrint = useReactToPrint({
        documentTitle: 'Title',
        contentRef: componentRef,
        onAfterPrint: () => {console.log("hi"); closeModal(); setName(""); navigate("/");}
      });

    //Global name variable for printing. 

    const [name, setName] = useState(""); 

    const onKeyPress = button => {
        if(button === "print"){
            handleSubmit();
        }
    }

    const onChange = name => {
        if (name.length < 5 || name.slice(-5) !== "print"){
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