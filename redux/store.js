import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeLatest, put, call } from 'redux-saga/effects';

import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { all } from 'redux-saga/effects';



// Action Types
const FETCH_GIFS = 'FETCH_GIFS';
const SET_GIFS = 'SET_GIFS';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const ADD_FAVORITE = 'ADD_FAVORITE';
const UPDATE_FAVORITE_CATEGORY = 'UPDATE_FAVORITE_CATEGORY';

// Action Creators
export const fetchGifs = (query = 'funny+cat') => ({
  type: FETCH_GIFS,
  payload: query,
});

export const setGifs = (gifs) => ({
  type: SET_GIFS,
  payload: gifs,
});

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const addFavorite = (giphy, categoryId) => ({
  type: ADD_FAVORITE,
  payload: { giphy, categoryId },
});

export const updateFavoriteCategory = (favoriteId, categoryId) => ({
  type: UPDATE_FAVORITE_CATEGORY,
  payload: { favoriteId, categoryId },
});

// Reducers
const gifsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_GIFS:
      return action.payload;
    default:
      return state;
  }
};

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  gifs: gifsReducer,
  categories: categoriesReducer,
});

// Sagas
function* fetchGifsSaga(action) {
  try {
    const response = yield axios.get(`/api/giphy/search?q=${action.payload}`);
    yield put(setGifs(response.data.data)); // Adjust the response path if necessary
  } catch (error) {
    console.error('Error fetching GIFs', error);
  }
}

function* fetchCategoriesSaga() {
  try {
    const response = yield axios.get(`/api/categories`);
    yield put(setCategories(response.data)); // Adjust the response path if necessary
  } catch (error) {
    console.error('Error fetching categories', error);
  }
}

function* addFavoriteSaga(action) {
  try {
    yield axios.post(`/api/favorites`, action.payload);
    yield put(fetchGifs()); // Refresh GIFs after adding a favorite
  } catch (error) {
    console.error('Error adding favorite', error);
  }
}

function* updateFavoriteCategorySaga(action) {
  try {
    yield axios.put(`/api/favorites/${action.payload.favoriteId}`, { category_id: action.payload.categoryId });
    yield put(fetchGifs()); // Refresh GIFs after updating category
  } catch (error) {
    console.error('Error updating favorite category', error);
  }
}

function* rootSaga() {
  yield all([
    takeLatest(FETCH_GIFS, fetchGifsSaga),
    takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga),
    takeLatest(ADD_FAVORITE, addFavoriteSaga),
    takeLatest(UPDATE_FAVORITE_CATEGORY, updateFavoriteCategorySaga),
  ]);
}

// Store Setup
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

