import {
  moviesActionTypes,
  LOAD_MOVIES_UPCOMING,
  LOAD_MOVIES_TOP_RATED,
  LOAD_MOVIES_NOW_PLAYING,
  LOAD_MOVIES_POPULAR,
  respondMovieData,
  initMovieState,
  respondLoadingState,
  SET_MOVIE_LOADING,
  respondPageData,
  LOAD_MORE_UPCOMING,
} from './moviesTypes';
import { Dispatch } from 'react';
import { Toast } from 'native-base';

import { APISettings } from "../../utils/globalVariable";
import { ReduxState } from '..';

export const setMovieLoading = (
  keys: (keyof initMovieState)[],
): respondLoadingState => ({
  type: SET_MOVIE_LOADING,
  payload: keys,
});

export const setMoviesNowPlaying = (
  now_playing: respondMovieData,
): moviesActionTypes => ({
  type: LOAD_MOVIES_NOW_PLAYING,
  payload: {
    now_playing,
  },
});

export const setMoviesPopular = (
  popular: respondMovieData,
): moviesActionTypes => ({
  type: LOAD_MOVIES_POPULAR,
  payload: {
    popular,
  },
});

export const setMoviesTopRated = (
  top_rated: respondMovieData,
): moviesActionTypes => ({
  type: LOAD_MOVIES_TOP_RATED,
  payload: {
    top_rated,
  },
});

export const setMoviesUpcoming = (
  upcoming: respondMovieData,
): moviesActionTypes => ({
  type: LOAD_MOVIES_UPCOMING,
  payload: {
    upcoming,
  },
});

export const setMoreUpcoming = (data: respondPageData): moviesActionTypes => ({
  type: LOAD_MORE_UPCOMING,
  payload: data,
});


export const loadMoreUpcoming = () => {
  return (
    dispatch: Dispatch<moviesActionTypes>,
    getState: () => ReduxState,
  ) => {
    const {
      movies: {
        upcoming: { isLoading, currentPage, totalPages },
      },
    } = getState();
    if (!isLoading && currentPage !== totalPages && currentPage) {
      fetch(`${APISettings.url}movie/upcoming?api_key=${APISettings.token}&language=en-US&page=${currentPage + 1}
      `, {
        method: "GET"
      })
        .then(response => response.json())
        .then(async responseJson => {
          dispatch(setMoreUpcoming(responseJson));
        })
        .catch(err => {
          Toast.show({
            text: `Error: Plase check your internet connectionn later`,
            position: "bottom",
            type: "danger",
            duration: 4000,
            buttonText: "Okay"
          });
        });
    }
  };
};

export const loadMovies = () => {
  return async (dispath: Dispatch<moviesActionTypes>) => {
    dispath(setMovieLoading(['popular', 'upcoming', 'top_rated', 'now_playing']));

    // ------------------------------------------------------------
    // UPCOMING
    await fetch(`${APISettings.url}movie/upcoming?api_key=${APISettings.token}&language=en-US&page=1
    `, {
      method: "GET"
    })
      .then(response => response.json())
      .then(async responseJson => {
        dispath(
          setMoviesUpcoming(
            {
              currentPage: responseJson.page,
              movies: responseJson.results,
              totalPages: responseJson.total_pages,
            },
          ),
        );
      })
      .catch(err => {
        Toast.show({
          text: `Error: Plase check your internet connection`,
          position: "bottom",
          type: "danger",
          duration: 4000,
          buttonText: "Okay"
        });
        dispath(
          setMoviesUpcoming(
            {
              currentPage: 1,
              movies: [],
              totalPages: 1,
            },
          ),
        );
      });
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // GET TOP RATED  
    await fetch(`${APISettings.url}movie/top_rated?api_key=${APISettings.token}&language=en-US&page=1
    `, {
      method: "GET"
    })
      .then(response => {
        return response.json()
      })
      .then(async responseJson => {
        dispath(
          setMoviesTopRated(
            {
              currentPage: responseJson.page,
              movies: responseJson.results,
              totalPages: responseJson.total_pages,
            },
          ),
        );
      })
      .catch(err => {
        Toast.show({
          text: `Error: Plase check your internet connection`,
          position: "bottom",
          type: "danger",
          duration: 4000,
          buttonText: "Okay"
        });
      });
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // NOW PLAYING
    await fetch(`${APISettings.url}movie/now_playing?api_key=${APISettings.token}&language=en-US&page=1
    `, {
      method: "GET"
    })
      .then(response => response.json())
      .then(async responseJson => {
        dispath(
          setMoviesNowPlaying(
            {
              currentPage: responseJson.page,
              movies: responseJson.results,
              totalPages: responseJson.total_pages,
            },
          ),
        );
      })
      .catch(err => {
        Toast.show({
          text: `Error: Plase check your internet connection`,
          position: "bottom",
          type: "danger",
          duration: 4000,
          buttonText: "Okay"
        });
      });
    // ------------------------------------------------------------


    // ------------------------------------------------------------
    // POPULAR
    await fetch(`${APISettings.url}movie/popular?api_key=${APISettings.token}&language=en-US&page=1
    `, {
      method: "GET"
    })
      .then(response => response.json())
      .then(async responseJson => {
        dispath(
          setMoviesPopular(
            {
              currentPage: responseJson.page,
              movies: responseJson.results,
              totalPages: responseJson.total_pages,
            },
          ),
        );
      })
      .catch(err => {
        Toast.show({
          text: `Error: Plase check your internet connection`,
          position: "bottom",
          type: "danger",
          duration: 4000,
          buttonText: "Okay"
        });
      });
    // ------------------------------------------------------------

  };
};
