import '../App.css';
import "../index.css";
import { Link } from "react-router";

import s_background from "../Assets/slide_1_landscape.jpeg"

const Slide1 = () => {
    return (
        <div className = {"slide-div"}>
         <img className = {"background"} src ={s_background}/>
            <h5 className = "slide-text sour-gummy">Canola is an essential part of Canada’s economy and food supply.
            Yet droughts and heat waves increasingly put farmers’ crops at risk.</h5>
            <Link to="/slide2" className = "arrow sour-gummy">&gt;</Link>
        </div>
    )
};

export default Slide1