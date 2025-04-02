import '../App.css';
import { Link } from "react-router";
import s_background from "../Assets/slide_2_hand.jpeg"



const Slide2 = () => {
    return (
        <div className = "slide-div">
             <img className = {"background"} src ={s_background}/>
            <h5 className = "slide-text sour-gummy">UCalgary researchers are using gene editing to develop drought-tolerant
            canola plants and secure our food supply.
            This technology is just like the selective breeding farmers have been doing for
            centuries – except it’s targeted at the genetic level!
            Now it’s your turn to design a canola plant!</h5>
            <Link to="/choose-path" className = "arrow sour-gummy">&gt;</Link>
        </div>
    )
};

export default Slide2;