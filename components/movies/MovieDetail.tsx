/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Alert, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MovieList from './MovieList';
import { useTheme } from '../ThemeContext';
import { AuthContext } from '../screens/authentications/AuthContext';

type RootStackParamList = {
  'Movie Detail': { id: number };
};

type MovieDetailProps = {
  route: RouteProp<RootStackParamList, 'Movie Detail'>;
};

const MovieDetail: React.FC<MovieDetailProps> = ({ route }) => {
  const { id } = route.params;
  const { colors } = useTheme();
  const authContext = useContext(AuthContext);

  const [moviesDetail, setMovieDetail] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!authContext) {
    return null;
  }

  useEffect(() => {
    getMovieList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkIfFavorite();
    }, [id])
  );

  const getMovieList = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieDetail(response);
      })
      .catch((errorResponse) => {
        console.log("errorResponse : ", errorResponse);
      });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const checkIfFavorite = async () => {
    try {
      const initialData = await AsyncStorage.getItem(`@FavoriteList_${authContext.user}`);
      if (initialData) {
        const favMovieList = JSON.parse(initialData);
        const isFav = favMovieList.some((movie: any) => movie.id === id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = async (movie: any) => {
    if (authContext && authContext.user) {
      try {
        const initialData = await AsyncStorage.getItem(`@FavoriteList_${authContext.user}`);
        let favMovieList = initialData ? JSON.parse(initialData) : [];

        const existingIndex = favMovieList.findIndex((m: any) => m.id === movie.id);
        if (existingIndex === -1) {
          favMovieList = [...favMovieList, movie];
          await AsyncStorage.setItem(`@FavoriteList_${authContext.user}`, JSON.stringify(favMovieList));
          setIsFavorite(true);
        } else {
          favMovieList.splice(existingIndex, 1);
          await AsyncStorage.setItem(`@FavoriteList_${authContext.user}`, JSON.stringify(favMovieList));
          setIsFavorite(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        "Sign In Required",
        "Please sign in to use the favorite feature.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      const initialData = await AsyncStorage.getItem(`@FavoriteList_${authContext.user}`);
      const favMovieList = initialData ? JSON.parse(initialData) : [];

      const indexToRemove = favMovieList.findIndex((movie: any) => movie.id === id);
      if (indexToRemove !== -1) {
        favMovieList.splice(indexToRemove, 1);
        await AsyncStorage.setItem(`@FavoriteList_${authContext.user}`, JSON.stringify(favMovieList));
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {moviesDetail && (
          <>
            <ImageBackground
              source={{ uri: `https://image.tmdb.org/t/p/w500/${moviesDetail.poster_path}` }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            />
            <Text style={[styles.titleText, { color: colors.text }]}>{moviesDetail.title}</Text>

            <View style={styles.insideImageContainer}>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={[styles.textRating, { color: colors.text }]}>{moviesDetail.vote_average ? moviesDetail.vote_average.toFixed(1) : ''}</Text>
              </View>
              <View style={styles.favoriteContainer}>
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={25}
                  color={'pink'}
                  onPress={() => isFavorite ? removeFavorite(moviesDetail.id) : addFavorite(moviesDetail)}
                />
              </View>
            </View>
            <Text style={[styles.summaryText, { color: colors.text }]}>Overview: {moviesDetail.overview}</Text>
            <View style={styles.detailMovieContainer}>
              <View style={styles.sideContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Original Language
                </Text>
                <Text style={[styles.detail, { color: colors.text }]}>
                  {moviesDetail.original_language}
                </Text>
              </View>
              <View style={styles.sideContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Popularity
                </Text>
                <Text style={[styles.detail, { color: colors.text }]}>
                  {moviesDetail.popularity}
                </Text>
              </View>
            </View>
            <View style={styles.detailMovieContainer}>
              <View style={styles.sideContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Release Date
                </Text>
                <Text style={[styles.detail, { color: colors.text }]}>
                  {formatDate(moviesDetail.release_date)}
                </Text>
              </View>
              <View style={styles.sideContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Vote Count
                </Text>
                <Text style={[styles.detail, { color: colors.text }]}>
                  {moviesDetail.vote_count}
                </Text>
              </View>
            </View>
            <MovieList
              title={'Recommendation'}
              path={`movie/${id}/similar`}
              coverType={'poster'}
              key={'Recommendation'}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  insideImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  favoriteContainer: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  textRating: {
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 5,
  },
  summaryText: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 15,
    fontStyle: 'italic',
  },
  detailMovieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  sideContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default MovieDetail;
