import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar({ placeholder, data, setSearchResults }) {
    const [query, setQuery] = useState('');
    const history = useHistory();

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/search?q=${query}`);
        const results = await response.json();
        setSearchResults(results);
        history.push('/searchresults');
    };

    return (
        <div className='search'>
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