import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGifs,fetchCategories} from '../../../redux/store';

function Favorites() {
  const dispatch = useDispatch();
  const gifs = useSelector(state => state.gifs);
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchGifs());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (favoriteId, categoryId) => {
    dispatch(setFavoriteCategory(favoriteId, categoryId));
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {gifs.map(gif => (
          <li key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
            <select onChange={(e) => handleCategoryChange(gif.id, e.target.value)}>
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;

  
