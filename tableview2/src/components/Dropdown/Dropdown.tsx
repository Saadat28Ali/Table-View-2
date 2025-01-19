import DropdownItem from "../DropdownItem/DropdownItem";

function Dropdown(
    {
        items
    }:
    {
        items: Array<string>
    }
) {
    return(
        <div
        className="
        Dropdown
        "
        style={{
            position: "absolute", 
            top: "1.5em", 
            minWidth: "8em", 
            width: "8em", 
            borderRadius: "0.5em", 
            border: "2px solid rgb(0,0,0,0.25)", 
            boxShadow: "0px 0px 20px 2px rgba(0,0,0,0.25)", 

            backgroundColor: "white", 

            fontSize: "1.5em", 
        }}
        >
            {items.map((item: string, index: number) => {
                return(
                    <DropdownItem key={index} text={item} noBottomBorder={(index === items.length - 1)}/>
                );
            })}
        </div>
    )
}

export default Dropdown;