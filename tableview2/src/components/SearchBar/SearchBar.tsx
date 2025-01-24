// ----------------------------------------------

// IMPORTS

// REACT
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import DropdownItem from "../DropdownItem/DropdownItem";

// ----------------------------------------------

function updateSuggestions(searchQuery: string, suggestionList: Array<string>, setSuggestions: Function) {

    let matchingSuggestions: Array<string> = [];

    suggestionList.forEach((suggestion: string) => {
        if (suggestion.startsWith(searchQuery) && !matchingSuggestions.includes(suggestion)) {
            matchingSuggestions.push(suggestion);
        }
    });

    if (matchingSuggestions.length === suggestionList.length) setSuggestions([]);
    else setSuggestions(matchingSuggestions);
    return;
}

function SearchBar(
    {
        suggestionList, 
        placeholder, 
        searchedFilter, 
        setSearchedFilter, 
    }:
    {
        suggestionList: Array<string>, 
        placeholder: string, 
        searchedFilter: string, 
        setSearchedFilter: Function
    }
) {

    const [hover, setHover] = useState<boolean>();
    const [click, setClick] = useState<boolean>();
    const [focus, setFocus] = useState<boolean>();

    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    // const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");

    const searchBarId = useRef<string>("SearchBar" + (Math.ceil(Math.random() * 100)).toString());


    useEffect(() => {
        const outOfFocusHandler = (event: any) => {
            // console.log(event.target.id);
            // console.log(searchBarId.current);
            if (searchBarId.current === event.target.id) {
                setFocus(true);
            }
            else {
                setFocus(false);
            };

        }

        document.addEventListener("click", outOfFocusHandler);

        return () => {
            document.removeEventListener("click", outOfFocusHandler);
        }
    }, []);

    return(
        <search
        className="SearchBar"
        style={{
            ...{
                width: "100%", 
                marginBottom: "1em", 
            }, 

        }}
        >
            <div
            style={{
                width: "100%", 
                minWidth: "100%", 
                // padding: "1em", 
                boxSizing: "border-box",    
                flexGrow: "2", 
                position: "relative", 

                justifyContent: "start", 
            }}
            >
                <input 
                type="search" 
                id={searchBarId.current}
                onMouseEnter={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}
                onMouseDown={() => {setClick(true)}}
                onMouseUp={() => {setClick(false)}}
                onChange={(event: any) => {
                    // console.log(event.target.value);
                    updateSuggestions(event.target.value, suggestionList, setSuggestions);
                }}
                placeholder={placeholder}

                style={{
                    ...{
                        minWidth: "100%", 
                        width: "100%", 
                        // border: "2px solid rgba(0,0,0,0.25)",
                        // borderWidth: "2px", 
                        // borderStyle: "solid",   
                        // borderColor: "rgba(0,0,0,0.25)", 
                        outline: "0px solid rgba(0,0,0,0)", 
                        padding: "1em", 
                        // borderRadius: "1em", 
                        borderTopLeftRadius: "1em", 
                        borderTopRightRadius: "1em", 
                        borderBottomLeftRadius: "1em", 
                        borderBottomRightRadius: "1em", 
                        boxSizing: "border-box", 

                        backgroundColor: "white", 

                        fontSize: "1em", 

                        transitionDuration: "0.2ms", 
                        
                    }, 
                    ...((focus && suggestions.length > 0) ? {
                        // borderRadius: "1em", 
                        borderBottomLeftRadius: "0", 
                        borderBottomRightRadius: "0",

                        border: "3px solid rgb(0, 128, 255)", 
                        borderBottomWidth: "3px solid rgba(0,0,0,0)", 

                    } : ((focus) ? {
                        border: "3px solid rgb(0, 128, 255)", 
                    } : {
                        borderBottomLeftRadius: "1em", 
                        borderBottomRightRadius: "1em", 
                        border: "2px solid rgb(190,190,190)", 
                    })), 

                }}
                />
                
                {
                    (focus && suggestions.length > 0) ? 
                    <div
                    className="Suggestions"
                    style={{
                        border: "3px solid rgb(0, 128, 255)",
                        borderTop: "0px" ,  
                        borderBottomLeftRadius: "1em", 
                        borderBottomRightRadius: "1em", 
                        width: "100%", 
                        boxSizing: "border-box", 
                        maxHeight: "10em", 
                        overflowX: "clip", 
                        overflowY: "auto", 
                        zIndex: "10", 
                        position: "absolute", 
                        top: "3.3em", 

                        justifyContent: "start", 

                        textAlign: "left", 
                    }}
                    >
                        {
                            suggestions.map((text: string, index: number) => {
                                return(
                                    <DropdownItem key={index} text={text} setValue={() => {
                                        setSearchedFilter(text);
                                    }} align="left" />
                                )
                            })
                        }
                    </div> :
                    <></>
                }


            </div>
        </search>
    );
}

export default SearchBar;