import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import "./SearchBar.css"

function SearchBar({placeholder, data}) {

    return(
        <div className="search"> 
            <div className="search-bar"action="/search" method="get">
                <input type="text" name="q" placeholder={placeholder}></input>
                <div className="searchIcon"></div>
            </div>
            <div className="dataResult"></div>
         </div>
        
    );
}

export default SearchBar;