import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGifs } from '../../../redux/store';


function GifList() {
    const dispatch = useDispatch();
    const gifs = useSelector((state) => state.gifs);
  
    useEffect(() => {
      dispatch(fetchGifs('funny+cat'));
    }, [dispatch]);
  
    return (
      <div>
        <h2>GIFs</h2>
        <ul>
          {gifs.map((gif) => (
            <li key={gif.id}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  
  export default GifList;