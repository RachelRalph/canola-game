import '../App.css';
import { Link } from "react-router";

import arrow from "../Assets/orange-arrow.jpg";


const Slide1 = () => {
    return (
        <div className = "slide-div">
            <h5 className = "slide-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Duis viverra urna quis augue pretium lobortis. 
                Donec nec nibh non nisl mollis volutpat. Vivamus iaculis interdum augue id sodales. 
                Donec sapien eros, commodo ac venenatis nec, lobortis sed ligula.
                Nam consequat mauris nisi, at ultricies justo tempus at. Nunc dolor neque, viverra quis ante in, convallis finibus urna. Ut tincidunt ligula sed mi congue fringilla. Proin dictum vehicula varius. Duis blandit odio eget turpis cursus rhoncus.</h5>
            <Link to="/slide2"><img src = {arrow} alt = {"arrow"} className = {"slide-arrow-right"}></img></Link>
        </div>
    )
};

export default Slide1