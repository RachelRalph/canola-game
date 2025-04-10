function FeatureSelector({plantPart, setFlowers, setRoots, setStem, setPods}){


    if (plantPart === 0){

        return(
        <div className = {"colour-selector"}>
        <div className = {"choice"} onClick = {() => setFlowers(0)}>
            <h3 className = {"sour-gummy-sub"}>yellow</h3>
        </div>
        <div className = {"choice"} onClick = {() => setFlowers(1)}>
            <h3 className = {"sour-gummy-sub"}>white</h3>
        </div>
        <div className = {"choice"} onClick = {() => setFlowers(2)}>
            <h3 className = {"sour-gummy-sub"}>blue</h3>
        </div>
        <div className = {"choice"} onClick = {() => setFlowers(3)}>
            <h3 className = {"sour-gummy-sub"}>purple</h3>
        </div>
        </div>
        );
    } 

    if (plantPart === 3){

        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => setPods("few")}>
                <h3>few pods</h3>
            </div>
            <div className = {"choice"} onClick = {() => setPods("many")}>
                <h3>more pods</h3>
            </div>
        </div>);

    } 

    if (plantPart === 1){
        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => setRoots("short")}>
                <h3>shorter roots</h3>
            </div>
            <div className = {"choice"} onClick = {() => setRoots("long")}>
                <h3>longer roots</h3>
            </div>
        </div>);

    }


    if (plantPart === 2){

        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => setStem("short")}>
                <h3>shorter plant</h3>
            </div>
            <div className = {"choice"} onClick = {() => setStem("tall")}>
                <h3>longer plant</h3>
            </div>
        </div>);

    }
    

    else {
        return(
            <div><p>NOOOOOOOOOOO</p></div>
        )
    }
}

export default FeatureSelector;