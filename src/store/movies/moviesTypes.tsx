export const SET_MOVIE_LOADING = 'SET_MOVIE_LOADING';
export const LOAD_MOVIES_UPCOMING = 'LOAD_MOVIES_UPCOMING';
export const LOAD_MOVIES_TOP_RATED = 'LOAD_MOVIES_TOP_RATED';
export const LOAD_MOVIES_NOW_PLAYING = 'LOAD_MOVIES_NOW_PLAYING';
export const LOAD_MOVIES_POPULAR = 'LOAD_MOVIES_POPULAR';
export const LOAD_MORE_UPCOMING = 'LOAD_MORE_UPCOMING';
export const FAVOURITE_MOVIE = 'FAVOURITE_MOVIE';


export type initMovieState = {
  top_rated: respondData;
  popular: respondData;
  now_playing: respondData;
  upcoming: respondData;
  fav_movies: any;
}

export type loadMoviesUpcoming ={
  type: typeof LOAD_MOVIES_UPCOMING;
  payload: {
    upcoming: respondData;
  };
}

export type loadMoviesTopRated ={
  type: typeof LOAD_MOVIES_TOP_RATED;
  payload: {
    top_rated: respondData;
  };
}

export type loadMoviesNowPlaying ={
  type: typeof LOAD_MOVIES_NOW_PLAYING;
  payload: {
    now_playing: respondData;
  };
}

export type loadMoviesPopular ={
  type: typeof LOAD_MOVIES_POPULAR;
  payload: {
    popular: respondData;
  };
}

export type respondLoadingState ={
  type: typeof SET_MOVIE_LOADING;
  payload: (keyof initMovieState)[];
}

export type isLoadMoreUpcoming ={
  type: typeof LOAD_MORE_UPCOMING;
  payload: respondPageData;
}

export type movieData ={
  id: number;
  title: string;
  overview: string;
  vote_average: string;
  poster_path: string;
  release_date: string;
}

export type respondPageData ={
  results: movieData[];
  page: number;
  total_pages: number;
}

export type respondData = {
  isLoading: any;
  movies: movieData[];
  currentPage: null | number;
  totalPages: null | number;
}

export type favouriteMovies = {
  type: typeof FAVOURITE_MOVIE;
  payload: []
}

export type moviesActionTypes =
  | loadMoviesPopular
  | loadMoviesNowPlaying
  | loadMoviesTopRated
  | loadMoviesUpcoming
  | respondLoadingState
  | isLoadMoreUpcoming
  | favouriteMovies;
