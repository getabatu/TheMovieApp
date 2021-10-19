import { initMovieState, moviesActionTypes, respondData } from './moviesTypes';

const initialState: initMovieState = {
  popular: {
    isLoading: false,
    movies: [],
    currentPage: null,
    totalPages: null,
  },
  upcoming: {
    isLoading: false,
    movies: [],
    currentPage: null,
    totalPages: null,
  },
  now_playing: {
    isLoading: false,
    movies: [],
    currentPage: null,
    totalPages: null,
  },
  top_rated: {
    isLoading: false,
    movies: [],
    currentPage: null,
    totalPages: null,
  },
};

export function moviesReducer(
  state: initMovieState = initialState,
  action: moviesActionTypes,
): initMovieState {
  switch (action.type) {
    case 'SET_MOVIE_LOADING': {
      const newState: {
        [name: string]: respondData;
      } = {};
      action.payload.map(key => {
        newState[key] = state[key];
        newState[key].isLoading = true;
      });
      return {
        ...state,
        ...newState,
      };
    }

    case 'LOAD_MOVIES_UPCOMING': {
      return {
        ...state,
        upcoming: {
          ...action.payload.upcoming,
          isLoading: false,
        },
      };
    }

    case 'LOAD_MOVIES_TOP_RATED': {
      return {
        ...state,
        top_rated: {
          ...action.payload.top_rated,
          isLoading: false,
        },
      };
    }

    case 'LOAD_MOVIES_POPULAR': {
      return {
        ...state,
        popular: {
          ...action.payload.popular,
          isLoading: false,
        },
      };
    }

    case 'LOAD_MOVIES_NOW_PLAYING': {
      return {
        ...state,
        now_playing: {
          ...action.payload.now_playing,
          isLoading: false,
        },
      };
    }

    case 'LOAD_MORE_UPCOMING': {
      return {
        ...state,
        upcoming: {
          isLoading: false,
          currentPage: action.payload.page,
          movies: [...state.upcoming.movies, ...action.payload.results],
          totalPages: action.payload.total_pages,
        },
      };
    }
    default:
      return state;
  }
}
