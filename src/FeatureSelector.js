function FeatureSelector({plantPart, setPlantType, getPlantType}){


    const changeFlowers = (num) => {
        setPlantType(num);
    }

    const changeRoots = (num) => {
        if (getPlantType() % 2 === 1 && num === - 1){
            setPlantType(getPlantType() - 1);
        }
        else if (getPlantType() % 2 === 0 && num ===  1){
            setPlantType(getPlantType() + 1);
        }

    }

    const changePods = (num) => {
        console.log(getPlantType())
        if (num === 1 && [2, 3, 6, 7].includes(getPlantType())){
            setPlantType(getPlantType() - 2);
            console.log("hi!");
        }
        else if (num === - 1 && [0, 1, 4, 5].includes(getPlantType())){
            setPlantType(getPlantType() + 2);
            console.log("hi")
        }

    }

    const changeStem = (num) => {
        console.log(getPlantType())
        if (num === -1 && getPlantType() < 4){
            setPlantType(getPlantType() + 4);
        }

        else if (num === 1 && getPlantType() > 3){
            setPlantType(getPlantType() - 4)
        }
    }

    if (plantPart === 0){

        return(
        <div className = {"colour-selector"}>
        <div className = {"choice"} onClick = {() => changeFlowers(0)}>
            <h3>yellow</h3>
            <h5>Remove gene XXXX</h5>
        </div>
        <div className = {"choice"} onClick = {() => changeFlowers(1)}>
            <h3>white</h3>
            <h5>Remove gene XXXX</h5>
        </div>
        <div className = {"choice"} onClick = {() => changeFlowers(2)}>
            <h3>blue</h3>
            <h5>Remove gene XXXX</h5>
        </div>
        <div className = {"choice"} onClick = {() => changeFlowers(3)}>
            <h3>purple</h3>
            <h5>Remove gene XXXX</h5>
        </div>
        </div>
        );
    }

    if (plantPart === 1){

        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => changePods(-1)}>
                <h3>few pods</h3>
                <h5>Remove gene XXXX</h5>
            </div>
            <div className = {"choice"} onClick = {() => changePods(1)}>
                <h3>more pods</h3>
                <h5>Remove gene XXXX</h5>
            </div>
        </div>);

    }

    if (plantPart === 2){
        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => changeRoots(-1)}>
                <h3>shorter roots</h3>
                <h5>Remove gene XXXX</h5>
            </div>
            <div className = {"choice"} onClick = {() => changeRoots(1)}>
                <h3>longer roots</h3>
                <h5>Remove gene XXXX</h5>
            </div>
        </div>);

    }


    if (plantPart === 3){

        return(
        <div className = {"colour-selector"}>
            <div className = {"choice"} onClick = {() => changeStem(-1)}>
                <h3>shorter plant</h3>
                <h5>Remove gene XXXX</h5>
            </div>
            <div className = {"choice"} onClick = {() => changeStem(1)}>
                <h3>longer plant</h3>
                <h5>Remove gene XXXX</h5>
            </div>
        </div>);

    }

    else {
        return(
            <div></div>
        )
    }
}

export default FeatureSelector;