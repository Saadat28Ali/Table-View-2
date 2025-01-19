// ----------------------------------------------

// IMPORTS

// COMPONENTS
import Column from "../Column/Column";
import Cell from "../Cell/Cell";

// ----------------------------------------------

function arraysToComponents(data: Array<Array<string>>) {
    // THIS EXPECTS COLUMN FIRST TABLE DATA
    // i.e. the data[c][r], where c is column, r is row

    const components: Array<any> = data.map((column: Array<string>, columnIndex: number) => {
        return(
            <Column key={columnIndex} cells={column.map((cell: string, rowIndex: number) => {
                return(
                    <Cell value={cell} header={(rowIndex === 0)} />
                );
            })} />
        );
    });

    return components;

}

function Table(
    {
        data
    }:
    {
        data: Array<Array<string>>
    }
) {

    return(
        <div
        className="Table"
        style={{
            padding: "0.5em", 
            boxSizing: "border-box", 
            border: "2px solid white", 
            maxHeight: "80vh", 
            height: "80vh",
            maxWidth: "60vw", 
            width: "60vw", 
            borderRadius: "0.5em", 

            flexDirection: "row", 
            justifyContent: "start", 

            overflow: "auto", 
        }}
        >
            {(data.length === 0) ? 
                <p
                style={{
                    width: "100%", 

                    textAlign: "center", 
                }}>
                    No columns selected to display
                </p> : 
                arraysToComponents(data)}

        </div>
    )
}

export default Table;