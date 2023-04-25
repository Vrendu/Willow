import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import "./SearchBar.css"

function SearchBar(props) {


    return(
        <> 
            <form className="search-bar"action="/search" method="get">
                <input type="text" name="q" placeholder="Enter an address, city, or zip code"></input>
                {/* <button type="submit">Search</button> */}
            </form>
         </>
        
    );
}

export default SearchBar;