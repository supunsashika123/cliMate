/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {fetchNewData} from '../../services/WeatherService';
import MainLayout from './components/MainLayout';
import TableLayout from './components/TableLayout';
import moment from 'moment';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import {getColorFromImage} from '../../helpers/imageColor';

const deviceWidth = Dimensions.get('screen').width;
const dotSize = 8;

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [imageColor, setImageColor] = useState('#fff');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [opacityValue] = useState(new Animated.Value(0.3));

  useEffect(() => {
    getNewData();
  }, []);

  useEffect(() => {
    setStatusBarBackground();
  }, [selectedItem]);

  const setStatusBarBackground = async () => {
    const color = await getColorFromImage(selectedItem.image);

    setImageColor(color);
  };

  const getNewData = async () => {
    Animated.loop(
      Animated.timing(opacityValue, {
        fromValue: 0.3,
        toValue: 1,
        friction: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      {iterations: 2500},
    ).start();

    setIsLoading(true);
    let data = await fetchNewData();

    setIsLoading(false);
    setWeatherData(data);
    setSelectedItem(data[0]);
  };

  const renderItem = item => {
    return item === 1 ? (
      <MainLayout
        item={selectedItem.data.find(
          d => moment().format('YYYY-MM-DD') === d.date,
        )}
      />
    ) : (
      <TableLayout items={selectedItem} />
    );
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  if (isLoading || !Object.keys(selectedItem).length) {
    return (
      <View style={styles.loadingSectionWrapper}>
        <Animated.Text
          style={{
            opacity: opacityValue,
          }}>
          Loading data...
        </Animated.Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={imageColor} />
      <Sidebar
        show={showSidebar}
        weatherData={weatherData}
        onHide={() => setShowSidebar(false)}
        onItemSelect={item => setSelectedItem(item)}
      />
      <View style={styles.mainSectionWrapper}>
        <ImageBackground
          source={{uri: selectedItem.image}}
          blurRadius={50}
          resizeMode="cover"
          style={styles.imageBackgroundHeader}>
          <HeaderBar onToggleSidebar={() => setShowSidebar(!showSidebar)} />
        </ImageBackground>
        <View style={styles.townImageContainer}>
          <Image
            source={{uri: selectedItem.image}}
            blurRadius={1}
            style={styles.townImage}
          />
        </View>
      </View>
      <View style={styles.mainInfoBoxContainer}>
        <Text style={styles.townTitle}>{selectedItem.town}</Text>
        <View style={styles.paginationContainer}>
          {[1, 2].map((_, i) => {
            return <View key={i} style={styles.dots} />;
          })}
          <Animated.View
            style={[
              styles.dotBorder,
              {
                transform: [
                  {
                    translateX: Animated.divide(
                      scrollX,
                      deviceWidth,
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 15],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        <View style={styles.flatListWrapper}>
          <Animated.FlatList
            style={styles.flatList}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            data={[1, 2]}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item}
            horizontal
            snapToInterval={deviceWidth}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingSectionWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainContainer: {backgroundColor: 'white', flex: 1, paddingBottom: 10},
  mainSectionWrapper: {
    flex: 2,
    justifyContent: 'space-between',
  },
  imageBackgroundHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight + 50 : 20,
  },
  townImageContainer: {
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 18,
  },
  townImage: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    bottom: -55,
  },
  mainInfoBoxContainer: {flex: 5, paddingTop: 80},
  townTitle: {textAlign: 'center', fontSize: 30, fontWeight: 'bold'},
  paginationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  dots: {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize,
    backgroundColor: '#333',
    marginRight: 18,
  },
  dotBorder: {
    width: 18,
    height: dotSize,
    backgroundColor: 'black',
    borderRadius: dotSize + 8,
    borderWidth: 1,
    borderColor: '#333',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  flatListWrapper: {flex: 1},
  flatList: {flex: 1},
});

export default Home;
