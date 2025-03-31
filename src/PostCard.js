
import "./App.css";
import "./print.css"
import background from "./Assets/Watercolour-background.jpeg"


function PostCard({flower, name}){

    return(
        <div className = {"postcard-div"}>
            <img src = {background} className = {"postcard-background"}/>
            <img src = {flower} className = {"postcard-flower"}/>
            <h4 className = {"postcard-text"} >{name}'s Canola Flower</h4>
        </div>

    )

}

export default PostCard;