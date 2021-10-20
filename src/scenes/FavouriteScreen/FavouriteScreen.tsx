import React from 'react';
import {
  ImageBackground,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../store/index';

import { color } from '../../utils/globalVariable'
import HeaderMenu from '../../components/headerMenu'
import Poster from '../../components/poster'
import {
  addRemoveFavouriteMovies,
} from '../../store/movies/moviesActions';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export function InfoScreen() {
  const dispatch = useDispatch();
  const [fav_movies] = useSelector((state: ReduxState) => [
    state.movies.fav_movies,
  ]);
  return (
    <View style={{ flex: 1, backgroundColor: color.backgroundColor }} >
      <HeaderMenu title={"Favourite Movies"} />
      <ImageBackground imageStyle={{}} style={{ width: '100%', height: '100%' }} source={require('../../assets/information.jpg')} >
        <FlatList
          style={{ paddingLeft: 20, width: '100%', }}
          numColumns={2}
          data={fav_movies}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ height: 80}} />}
          keyExtractor={(item: any) => `${item.id}`}
          renderItem={({ item }: { item: any }) => {
            let indexFav = fav_movies.map((e: any) => { return e.id; }).indexOf(item.id);
            return (
              <Poster
                isFav={indexFav !== -1 ? true : false}
                title={item.title}
                releaseDate={item.release_date}
                image={{ uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}` }}
                onClickFav={() => {
                  dispatch(addRemoveFavouriteMovies(item))
                }}
              />
            );
          }}
        />
      </ImageBackground>
    </View>
  );
}
