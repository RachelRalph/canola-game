import s_background from "../Assets/Normalized/postcard/slide_1_landscape.jpeg"
import { Link } from "react-router-dom";

const PlantSelection = () => {
    return(
        <div className = {"path-div"}>
            <img src = {s_background} className = {"background"} alt="" />
            <Link to = "/game-plant"><button className = {"sour-gummy-bold select-button top-button"}>Change Flower Colours!</button></Link>
            <Link to = "/game-plant"><button className = {"sour-gummy-bold select-button bottom-button"}>Improve Drought Tolerance and Yield </button></Link>
        </div>
    );
}

export default PlantSelection;
