import y_canola_flowers from "./Assets/yellow_canola_flowers.png"
import l_canola_flowers from "./Assets/light_canola_flowers.png"
import d_canola_flowers from "./Assets/dark_canola_flowers.png"

import "./App.css";

function PostCard({flowerColour, ref, name}){

    const flowers = [y_canola_flowers, l_canola_flowers, d_canola_flowers];
    return(
        <div ref = {ref} className = {"hide"}>
            <img src = {flowers[flowerColour]}/>
            <h4>{name}'s Canola Flower</h4>
        </div>

    )

}

export default PostCard;