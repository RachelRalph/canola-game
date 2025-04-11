function FeatureSelector({plantPart, setFlowers, setRoots, setStem, setPods, getRoots, getStem, getPods}){


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
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>few pods</h3>
            </div>
            <div className = {"choice"} onClick = {() => setPods("many")}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>more pods</h3>
            </div>
        </div>);

    } 

    if (plantPart === 1){
        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => setRoots("short")}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>shorter roots</h3>
            </div>
            <div className = {"choice"} onClick = {() => setRoots("long")}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>longer roots</h3>
            </div>
        </div>);}
    


    if (plantPart === 2){

        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => setStem("short")}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>shorter plant</h3>
            </div>
            <div className = {"choice"} onClick = {() => setStem("tall")}>
                <h3 className = {"sour-gummy-sub"} style = {{lineHeight : "120%"}}>longer plant</h3>
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