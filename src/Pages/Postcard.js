import "../print.css";
import "../index.css";
import { Link, useParams } from "react-router";

import y_canola_flowers from "../Assets/yellow_flower.png"
import w_canola_flowers from "../Assets/white_flower.png"
import b_canola_flowers from "../Assets/blue_flower.png"
import p_canola_flowers from "../Assets/purple_flower.png"

import postcard_background from "../Assets/PostcardBackground.png"

import Plant from "../Plant.js"

import s_background from "../Assets/slide_1_landscape.jpeg"

const Postcard = ({props}) => {
    
    const vars = window.location.href.split("?")[1].split("&");
    const flowers = [y_canola_flowers, w_canola_flowers, b_canola_flowers, p_canola_flowers]

    const getRoots = () => {return vars[1].split("=")[1].trim()};
    const getHeight = () => {return vars[3].split("=")[1].trim()};
    const getPods = () => {return vars[2].split("=")[1].trim()};

    const name = vars[4].split("=")[1].trim();

    
    return (
        <div className = {"postcard-div"}>
        <img src = {postcard_background} className = {"postcard-background"} />
        <h1 className = {"postcard-name"}>{name} THE CANOLA PLANT</h1>
        <img src = {flowers[1]} className = {"postcard-flower"}/>
        <div className = {"postcard-plant"}>
        <Plant getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods}
            getAnimatePods = {() => {return false}} getAnimateRoots = {() => {return false}}
            setAnimatePods = {() => {} }  setAnimateRoots = {() => {}} />
            </div>
        </div>

    )
 
};

export default Postcard;