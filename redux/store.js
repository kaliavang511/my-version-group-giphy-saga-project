import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeLatest, put, call } from 'redux-saga/effects';
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';


// function* rootSaga() {
//     yield takeLatest('FETCH_GIF', fetchGif);
//     yield takeLatest('ADD_GIF', postGif);
//     yield takeLatest('DROP_GIF', removeGif);
//     yield takeLatest('UPDATE_GIF', updateGif);
// }

// function* fetchGif(action) {
//     try {
//         const searchQuery = action.payload || 'funny+cat'; 3
//         const response = yield call(axios.get, `/api/giphy/search?q=${searchQuery}`);
//         yield put({ type: 'SET_FAVORITES', payload: response.data });
//     } catch (error) {
//         console.log('Error fetching GIF', error);
//     }
// }

// function* postGif(action) {
//     try {
//         yield call(axios.post, '/api/favorites', action.payload);
//         yield put({ type: 'FETCH_GIF' });
//     } catch (error) {
//         console.log('Error adding GIF', error);
//     }
// }

// function* removeGif(action) {
//     try {
//         yield call(axios.delete, `/api/favorites/${action.payload}`);
//         yield put({ type: 'FETCH_GIF' });
//     } catch (error) {
//         console.log('Error removing GIF', error);
//     }
// }

// function* updateGif(action) {
//     try {
//         yield call(axios.put, `/api/favorites/${action.payload.id}`, { category_id: action.payload.category_id });
//         yield put({ type: 'FETCH_GIF' });
//     } catch (error) {
//         console.log('Error updating GIF', error);
//     }
// }


// const categoriesReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_CATEGORIES':
//             return action.payload;
//         default:
//             return state;
//     }
// }

// const favoritesReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_FAVORITES':
//             return action.payload;
//         default:
//             return state;
//     }
// }


// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//     combineReducers({
//         categories: categoriesReducer,
//         favorites: favoritesReducer,
//     }),
//     applyMiddleware(sagaMiddleware, logger)
// );



const FETCH_GIFS = 'FETCH_GIFS';
const SET_GIFS = 'SET_GIFS';

// Action Creators
export const fetchGifs = (query) => ({
  type: FETCH_GIFS,
  payload: query,
});

// Reducer
const gifsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_GIFS:
      return action.payload;
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  gifs: gifsReducer,
});

// Saga
function* fetchGifsSaga(action) {
  try {
    const response = yield call(axios.get, `/api/giphy/search?q=${action.payload}`);
    yield put({ type: SET_GIFS, payload: response.data.data }); // Adjust the response path if necessary
  } catch (error) {
    console.error('Error fetching GIFs', error);
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_GIFS, fetchGifsSaga);
}

// Store Setup
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;