import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./SearchBar.css";

function SearchBar({ placeholder, onSearch }) {
    const [query, setQuery] = useState('');
    const history = useHistory();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query) {
            history.push(`/searchresults?q=${query}`);
        }
    };

    return (
        <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={handleSearch}>
                <input
                    className="search-bar-input"
                    type="text"
                    name="q"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-bar-button" type="submit">
                    <i className="fa fa-search" type="submit"> </i> 
                </button>
            </form>
        </div>
    );
}

export default SearchBar;