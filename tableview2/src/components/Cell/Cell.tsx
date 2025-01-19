function Cell(
    {
        value, 
        header
    }:
    {
        value: string, 
        header: boolean
    }
) {
    return (
        <div
        className="Cell"
        style={{
            ...{
                width: "90%", 
                minHeight: "5em", 
                height: "5em", 
                border: "2px solid rgba(0,0,0,0.25)",
                paddingRight: "5%", 
                paddingLeft: "5%", 

                flexDirection: "row", 
                justifyContent: "start", 
                alignItems: "start", 

                overflow: "clip", 
            }, 
            ...(header ? {
                backgroundColor: "rgb(0, 128, 255)", 

                fontWeight: "bold", 
                color: "white", 
            } : {
                backgroundColor: "white", 

                color: "rgb(47,47,47)",     
            })  
        }}
        >
            {value.toString()}
            {/* {(header) ? <DropDownButton callback={() => {}} /> : <></> } */}
        </div>
    );
}

export default Cell;