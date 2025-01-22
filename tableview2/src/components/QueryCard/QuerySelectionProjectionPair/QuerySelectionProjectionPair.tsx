function QuerySelectionProjectionPair(
    {
        checked, 
        column, 
        value, 
        setColumnStatus, 
        setColumnValue, 

    }:
    {
        checked: boolean, 
        column: string, 
        value: string, 
        setColumnStatus: Function
        setColumnValue: Function, 
    }
) {

    return(
        <div
        className="QuerySelectionProjectionPair"
        style={{
            width: "100%", 
            minWidth: "100%", 
            borderBottom: "2px solid rgb(0,0,0,0.25)", 
            // borderRadius: "1em", 
            boxSizing: "border-box", 
            padding: "1em", 

            flexDirection: "row", 
            justifyContent: "space-evenly", 
        }}
        >
            <input 
            type="checkbox" 
            checked={checked}
            onChange={(event: any) => {
                // event.preventDefault();
                setColumnStatus(event.target.checked);
                event.target
            }}
            style={{
                minWidth: "1.5em", 
                width: "1.5em", 
                minHeight: "1.5em", 
                height: "1.5em",
            }}
            />


            <div
            style={{
                paddingLeft: "0.5em", 
                paddingRight: "0.2em", 
                minWidth: "5em",
            }}
            >   
                <p
                style={{ 
                    boxSizing: "border-box", 
                    padding: "0.25em", 
                    width: "100%", 
                    borderRadius: "0.2em", 
                    border: "2px solid rgba(0,0,0,0.1)", 

                    fontSize: "1em",
                    fontWeight: "bold",

                    overflow: "auto", 
                    textWrap: "pretty", 
                }}
                >
                    {column}
                </p>

                <p
                style={{
                    width: "100%", 
                    minWidth: "100%", 
                    boxSizing: "border-box", 
                    marginTop: "0.5em", 
                    marginBottom: "0.5em", 

                    color: "rgba(0,0,0,0.75)",
                    fontSize: "0.85em", 
                    textAlign: "center", 

                }}
                > Column Name 
                </p>
            </div>
            

            <p
            style={{
                fontSize: "1.5em", 
                // border: "2px solid black", 
                minWidth: "2em", 
                textAlign: "center", 
            }}
            >
                =
            </p>
            <div
            style={{

            }}
            >
                <input type="text" 
                defaultValue={value}
                onChange={(event: any) => {
                    // event.preventDefault();
                    // console.log("event target value", event.target.value);
                    setColumnValue(event.target.value);
                }}
                style={{
                    width: "100%", 
                    boxSizing: "border-box", 
                    border: "2px solid rgba(0,0,0,0.1)", 
                    borderRadius: "0.2em", 
                    padding: "0.75em", 

                    fontSize: "1em", 
                    fontWeight: "bold", 
                    fontFamily: "sans-serif", 
                }}
                />

                <p
                style={{
                    width: "100%", 
                    minWidth: "100%", 
                    boxSizing: "border-box", 
                    marginTop: "0.5em", 
                    marginBottom: "0.5em", 

                    color: "rgba(0,0,0,0.75)",
                    fontSize: "0.85em", 
                    textAlign: "center", 

                }}
                > Target Value
                </p>
            </div>
            
        </div>
    );
}

export default QuerySelectionProjectionPair;