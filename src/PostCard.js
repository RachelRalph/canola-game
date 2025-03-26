import y_canola_flowers from "./Assets/yellow_flower.jpeg"
import w_canola_flowers from "./Assets/white_flower.png"

import "./App.css";

function PostCard({flowerColour, ref, name}){

    const flowers = [y_canola_flowers, w_canola_flowers];
    return(
        <div ref = {ref} className = {"hide"}>
            <img src = {flowers[flowerColour]}/>
            <h4>{name}'s Canola Flower</h4>
        </div>

    )

}

export default PostCard;