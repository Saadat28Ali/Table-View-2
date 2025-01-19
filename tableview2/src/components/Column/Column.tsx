function Column(
    {
        cells
    }:
    {
        cells: Array<any>
    }
) {
    return(
        <div
        className="
        Column
        "
        style={{
            // padding: "0.5em", 
            // border: "2px solid white", 
            // borderRadius: "0.5em", 
            boxSizing: "border-box", 
            width: "100%", 
            minWidth: "90px", 
            height: "100%",
            overflow: "visible", 
            // overflow: "auto", 

            justifyContent: "start", 

        }}
        >
            {...cells}
        </div>
    );
}

export default Column;