
import back from "./Assets/PostcardBack.png";
import background from "./Assets/Watercolour-background.jpeg";

function PostcardBack({plant}) {
    return (
        <div className = {"postcard-div"}>
        <img src = {background} className = {"postcard-background"}/>
        <img src = {plant} className = {"postcard-plant"}/>
        <div className = {"postcard-template"}>
        <div className = {"vline"}/>
        <div className = {"lines"}>
            <div className = {"hline"}/>
            <div className = {"hline"}/>
            <div className = {"hline"}/>
            <div className = {"hline"}/>
            <div className = {"hline"}/>
        </div>
        </div>

        </div>
    );

}

export default PostcardBack;