import React, { useCallback, useEffect, useRef } from 'react';
import {
  ImageBackground,
  View,
  Text,
  RefreshControl,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { Spinner, Item, Input, Icon, Card } from "native-base";
import { useSelector, useDispatch } from 'react-redux';

import {
  loadMovies,
  loadMoreUpcoming,
  addRemoveFavouriteMovies,
} from '../../store/movies/moviesActions';
import { ReduxState } from '../../store/index';
import { color } from '../../utils/globalVariable'
import HeaderMenu from '../../components/headerMenu'
import Poster from '../../components/poster'

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export function HomeScreen() {
  const dispatch = useDispatch();
  const onMomentum = useRef(true);
  const [popular, upcoming, now_playing, top_rated, isLoading, fav_movies] = useSelector((state: ReduxState) => [
    state.movies.popular,
    state.movies.upcoming,
    state.movies.now_playing,
    state.movies.top_rated,
    state.movies.popular.isLoading && state.movies.upcoming.isLoading,
    state.movies.fav_movies,
  ]);
  const getMovies = useCallback(() => {
    dispatch(loadMovies());
  }, []);
  useEffect(() => {
    getMovies();
  }, []);

  const listData: any = [
    {
      title: 'Popular Movies',
      isLoading: popular.isLoading,
      data: popular.movies,
    },
    {
      title: 'Top Rated Movies',
      isLoading: top_rated.isLoading,
      data: top_rated.movies,
    },
    {
      title: 'Now Playing Movies',
      isLoading: now_playing.isLoading,
      data: now_playing.movies,
    },
  ];

  const upcomingData: any = {
    title: 'Upcoming Movies',
    isLoading: upcoming.isLoading,
    data: upcoming.movies,
  }

  const loadMore = useCallback(() => {
    dispatch(loadMoreUpcoming())
  }, [onMomentum.current]);



  return (
    <View style={{ flex: 1, backgroundColor: color.backgroundColor }} >
      <HeaderMenu title={"Movie App"} />
      <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/home.jpeg')} >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading && listData[1].data.length != 0}
              title="Pull to refresh"
              tintColor="#fff"
              titleColor="#fff"
              onRefresh={getMovies}
            />
          }>
          <Item style={{ backgroundColor: 'white', marginTop: 10, marginBottom: 30, borderRadius: 10, width: width - 40, alignSelf: 'center' }} regular>
            <Input placeholderTextColor="black" placeholder='Search Movie' />
            <Icon type="FontAwesome" name="search" style={{ color: 'black', }} />
          </Item>
          {
            listData.map((objData: any, index: number) => {
              return (
                <View style={{ paddingLeft: 20, width: '100%', }} key={index} >
                  <Text style={{ fontSize: 18, color: 'white' }} >
                    {objData.title}
                  </Text>
                  <View style={{ backgroundColor: 'white', height: 0.5, marginTop: 10 }} />
                  {
                    objData.isLoading ?
                      <Spinner color="white" />
                      :
                      <FlatList
                        horizontal={true}
                        data={objData.data}
                        showsHorizontalScrollIndicator={false}
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
                  }
                </View>
              )
            })
          }
          <View style={{ marginHorizontal: 20, marginTop: 60, }} >
            <Text style={{ fontSize: 18, color: 'white' }} >
              {upcomingData.title}
            </Text>
            <View style={{ backgroundColor: 'white', height: 0.5, marginTop: 10 }} />
          </View>
          {
            upcomingData.isLoading ?
              <Spinner color="white" />
              :
              upcomingData.data.length == 0 ?
                <View style={{ padding: 20, width: width - 30, alignSelf: 'center' }} >
                  <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 14, color: 'white' }} >
                    Failed to load data{"\n"}Please check you internet
                  </Text>
                </View>
                :
                <FlatList
                  data={upcomingData.data}
                  numColumns={4}
                  style={{ width: width - 30, alignSelf: 'center' }}
                  showsHorizontalScrollIndicator={false}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.5}
                  extraData={popular.isLoading}
                  onMomentumScrollBegin={() => (onMomentum.current = false)}
                  ListFooterComponent={
                    <>
                      {
                        upcoming.totalPages == upcoming.currentPage ?
                          null
                          :
                          <View>
                            <View
                              style={{
                                height: 40,
                              }}
                            />
                            <Spinner color={'white'} />
                            <View
                              style={{
                                height: 70,
                              }}
                            />
                          </View>
                      }
                    </>
                  }
                  columnWrapperStyle={{
                    flex: 1,
                    justifyContent: "space-around"
                  }}
                  keyExtractor={(item: any) => `${item.id}`}
                  renderItem={({ item }: { item: any }) => {
                    return (
                      <ImageBackground
                        imageStyle={{ borderRadius: 10, resizeMode: 'stretch' }}
                        style={{ borderRadius: 20, marginTop: 30, width: width / 5, height: width / 3, }}
                        source={{ uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}` }} >

                      </ImageBackground>
                    );
                  }}
                />
          }
          <View style={{ height: 120 }} />
        </ScrollView>
      </ImageBackground>
    </View >
  );
}
