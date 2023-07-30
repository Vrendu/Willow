import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./SearchBar.css"

function SearchBar({ placeholder, onSearch}) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const history = useHistory();

    const handleSearch = async (e) => {
        e.preventDefault();
        history.push(`/searchresults?q=${query}`);
    };


    return (
        <div >
            <form onSubmit={handleSearch}>
                <input
                    type='text'
                    name='q'
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type='submit'>
                    <i className='fa fa-search'></i>
                </button>
            </form>
            
        </div>
    );
}

export default SearchBar;