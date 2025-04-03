import s_background from "../Assets/slide_1_landscape.jpeg"
import { Link } from "react-router";

const PlantSelection = () => {
    return(
        <div className = {"path-div"}>
            <img src = {s_background} className = {"background"}/>
            <Link to = "/game-flower"><button className = {"sour-gummy-bold select-button top-button"}>Change Flower Colours!</button></Link>
            <Link to = "/game-plant"><button className = {"sour-gummy-bold select-button bottom-button"}>Improve Drought Tolerance and Yield </button></Link>
        </div>
    );
}

export default PlantSelection;