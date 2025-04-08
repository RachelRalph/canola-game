
import back from "./Assets/PostcardBack.jpg"
import "./print.css"

function PostcardBack({plant}) {
    return (
        <img src = {back} className = {"back"}/>
    );

}

export default PostcardBack;