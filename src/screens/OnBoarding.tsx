import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  ViewToken,
} from 'react-native';
import Container from '@components/Container';
import OnBoardingInfo from '@components/OnBoardingInfo';
import {onBoardingData} from '@constant/staticData';
import useInterval from '@hooks/useInterval';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import Button from '@components/Button';
import {useDispatch} from 'react-redux';
import {setOnBoarded} from '@redux/onBoarding/onBoardingSlice';

const OnBoarding = () => {
  const [active, setActive] = useState(0);

  const scrollX = new Animated.Value(0);
  const swiperRef = useRef<FlatList>(null);

  const {width} = Dimensions.get('window');

  const dispatch = useDispatch();

  useInterval(() => {
    if (active < Number(onBoardingData?.length) - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  }, 3500);

  useEffect(() => {
    swiperRef?.current?.scrollToIndex({index: active, animated: true});
  }, [active]);

  const onViewableItemsChangedHandler = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (active != 0) {
        setActive(viewableItems[0].index!);
      }
    },
    [],
  );

  const renderSwipe = ({item}) => {
    return <OnBoardingInfo title={item.title} image={item.image} />;
  };

  const Dots = () => {
    const stepPosition = Animated.divide(scrollX, width);
    return (
      <View style={styles.stepsContainer}>
        {onBoardingData.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`step-${index}`}
              style={[styles.steps, {opacity, backgroundColor: colors.white}]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/piggyVestLogo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.swiperContainer}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment={'center'}
          scrollEventThrottle={20}
          onViewableItemsChanged={onViewableItemsChangedHandler}
          data={onBoardingData}
          renderItem={renderSwipe}
          keyExtractor={item => item.id}
          ref={swiperRef}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {x: scrollX}},
              },
            ],
            {useNativeDriver: false},
          )}
        />
        <Dots />
      </View>
      <Container customStyles={{flex: 1}}>
        <View style={styles.buttonContainer}>
          <Button
            title={'Login'}
            customStyles={{
              flex: 1,
              marginRight: wp(7),
              borderBottomLeftRadius: wp(1),
            }}
            onPress={() => dispatch(setOnBoarded(true))}
          />
          <Button
            title={'Register'}
            backgroundColor={'tranparent'}
            borderColor={colors.white}
            borderWidth={wp(1)}
            customStyles={{
              flex: 1,
              marginLeft: wp(7),
              borderBottomLeftRadius: wp(1),
            }}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.black,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: hp(47),
  },
  logo: {
    width: wp(140),
    height: wp(30),
    resizeMode: 'contain',
  },
  stepsContainer: {
    // display: 'none',
    // position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(12),
  },
  steps: {
    width: wp(14),
    height: hp(3),
    borderRadius: wp(4),
    marginHorizontal: wp(6),
  },
  swiperContainer: {
    marginTop: hp(150),
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
});

export default OnBoarding;
