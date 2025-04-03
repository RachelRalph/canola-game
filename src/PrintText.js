export function GetPlantMod({type}){
    if (type === 5) {
        return (<div>
        <p>This plant is fully optimized for yield and
        drought tolerance</p>
        </div>);
    }

    else if (type ===  1 || type === 4){
        return (<div>
            <p>This plant delivers increased food yield.</p>
            <p>Adaptations make this plant more drought-tolerant.</p>
            </div>);

    }

    else if (type === 0){
        return (<div>
            <p>This plant delivers increased food yield.</p>
            </div>);
    }
    else if(type === 3 || type === 6 || type === 7 ){
        return (<div>
            <p>Adaptations make this plant more drought-tolerant.</p>
            </div>);

    }
    else if (type === 2){
        return (<div></div>);
    }

}

function PrintText({isFlower, type}){

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
            <GetPlantMod type = {type}/>
            <p>Name and print your plant</p>
        </div>
        );
    }

};

export default PrintText;