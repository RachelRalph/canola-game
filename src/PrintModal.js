import React from "react"
import Modal from 'react-modal';
import {useRef} from 'react';
import { useState } from 'react';

import { useReactToPrint } from "react-to-print";

import PostCard from "./PostCard.js";

function PrintModal({isOpen, closeModal,flower}){
    


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

    return(
        <div>
        <Modal isOpen = {isOpen}>
            <p>Hi!</p>
            <p>Please type your name</p>
            <form> 
                <input type = "text" onChange = {(e) => setName(e.target.value)} />
            </form>
            <button onClick = {() => {handleSubmit()}}>Print</button>
        </Modal>
        <PostCard flower = {flower} ref = {componentRef} name = {name}/>
        </div>
        
    )

}

export default PrintModal;