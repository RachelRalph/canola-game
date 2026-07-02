import "../print.css";
import "../index.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import y_canola_flowers from "../Assets/Normalized/stills/flowers/yellow_flower.png"
import w_canola_flowers from "../Assets/Normalized/stills/flowers/white_flower.png"
import b_canola_flowers from "../Assets/Normalized/stills/flowers/blue_flower.png"
import p_canola_flowers from "../Assets/Normalized/stills/flowers/purple_flower.png"

import postcard_background from "../Assets/Normalized/postcard/PostcardBackground.png"

import Plant from "../Plant.js"

const POSTCARD_DISPLAY_MS = 5000;
const AUTO_RETURN_TO_HOME = true;

const Postcard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const flowers = [y_canola_flowers, w_canola_flowers, b_canola_flowers, p_canola_flowers];
    const params = new URLSearchParams(location.search);

    const colorIndex = Number(params.get("colour") ?? "0");
    const flowerImage = flowers[Number.isNaN(colorIndex) ? 0 : colorIndex] ?? flowers[0];
    const getRoots = () => params.get("roots")?.trim() || "short";
    const getHeight = () => params.get("height")?.trim() || "tall";
    const getPods = () => params.get("pods")?.trim() || "few";
    const name = params.get("name")?.trim() || "YOUR";
    const displayName = name.toUpperCase();

    useEffect(() => {
        if (!AUTO_RETURN_TO_HOME) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            navigate("/", { replace: true });
        }, POSTCARD_DISPLAY_MS);

        return () => window.clearTimeout(timeout);
    }, [navigate]);

    
    return (
        <div className = {"postcard-div"}>
        <img src = {postcard_background} className = {"postcard-background"} alt="" />
        <h1 className = {"postcard-name"}>{displayName} THE CANOLA PLANT</h1>
        <img src = {flowerImage} className = {"postcard-flower"} alt="" />
        <div className = {"postcard-plant"}>
        <Plant getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods}
            getAnimatePods = {() => {return false}} getAnimateRoots = {() => {return false}}
            setAnimatePods = {() => {} }  setAnimateRoots = {() => {}} />
            </div>
        </div>

    )
 
};

export default Postcard;
