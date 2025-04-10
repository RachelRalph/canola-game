export function GetPlantMod({type, getRoots, getHeight, getPods}){
    if (getRoots() === "long" && getHeight() === "short" && getPods() === "many" ) {
        return (<div>
        <p>This plant is fully optimized for yield and
        drought tolerance</p>
        </div>);
    }

    else if (getPods() === "many" && (getRoots() === "long" || getHeight() === "short")){
        return (<div>
            <p>This plant delivers increased food yield.</p>
            <p>Adaptations make this plant more drought-tolerant.</p>
            </div>);

    }

    else if (getPods() === "many"){
        return (<div>
            <p>This plant delivers increased food yield.</p>
            </div>);
    }
    else if(getRoots() === "long" || getHeight() === "short"){
        return (<div>
            <p>Adaptations make this plant more drought-tolerant.</p>
            </div>);

    }
    else{
        return (<div></div>);
    }

}

function PrintText({isFlower, type, getRoots, getHeight, getPods}){

    const colours = ["yellow", "white", "blue", "purple"]; 



    if (isFlower === true){
    return(
        <div>
            <p> Now the flowers are {colours[type]} <br/>
            This might change which pollinators prefer them, influencing their reproduction. <br/>
            Imagine a whole field of {colours[type]} canola! </p>
            <p>Name and print your plant</p>
        </div>
    );
    }
    else{
        return(
        <div>
            <p>Nicely done! You’ve created a brand new type of canola plant.</p>
            <GetPlantMod type = {type} getRoots = {getRoots} getHeight = {getHeight} getPods = {getPods} />
            <p>Name and print your plant</p>
        </div>
        );
    }

};

export default PrintText;