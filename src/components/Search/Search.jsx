import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGifs } from '../../../redux/store';


function Search() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    dispatch(fetchGifs(searchQuery));
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;

  

