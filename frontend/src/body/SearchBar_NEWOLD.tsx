import React, { useState } from 'react';
import '../styling/search.css';
import '../styling/general.css';

//Henter data fra tekstfelt
const SearchInput = () => {
    const store = useDataStore();

    const handleChange = (event: any) => {
        var value = event.target.value;
        if (value === "") {
            value = "---"
        }
        store.addFilterProps("searchInput", value);
    }
    return (
        <div>
            <form>
                <div id="search_input">
                    <img alt="pic" style={{verticalAlign:-7, opacity: 0.8}}  src={require("../resources/search.svg")}/>
                    <input type="text" onChange={handleChange}/>
                </div>
            </form>
        </div>
    );
}    

export default function Search() {

    return(
        <div>
            <div>
                <SearchInput/>
            </div>
        </div>
    )
};
