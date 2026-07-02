import animation from "./Assets/Animations/DNA.webm";
import safariAnimation from "./Assets/Normalized/animations/DNA.png";
import still from "./Assets/Normalized/animations/STILL_DNA.png";
import Animation from "./Animation.js";

function Dna({isPlaying, setAnimateDNA}) {
    return (
        <div className={"dna-pos-div"}>
            <Animation
                kind="dna"
                video={animation}
                safariVideo={safariAnimation}
                png={still}
                getAnimate={() => isPlaying}
                setAnimate={setAnimateDNA}
                durationMs={7000}
            />
        </div>
    );
}

export default Dna;
