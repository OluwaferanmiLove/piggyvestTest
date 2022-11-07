import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from 'react-native';
import {colors} from '@theme/colors';
import {wp, hp} from '@utils/responsive-dimension';
import BaseText from './BaseText';

interface MealCardT {
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  title?: string;
  image?: string;
  selected?: boolean;
  onPressMealCard: (event: GestureResponderEvent) => void;
  onPressAddToCart: (event: GestureResponderEvent) => void;
}

const MealCard: React.FC<MealCardT> = ({
  marginTop,
  marginLeft,
  marginRight,
  title,
  image,
  onPressMealCard,
  onPressAddToCart,
}) => {
  const styles = StyleSheet.create({
    main: {
      // flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      marginTop: marginTop,
      marginLeft,
      marginRight,
      width: wp(240),
      height: wp(290),
      borderRadius: wp(20),
      paddingVertical: hp(25),
      paddingHorizontal: hp(16),
      backgroundColor: colors.bgColor,
    },
    imageContainer: {
      width: wp(116),
      height: hp(116),
      borderRadius: wp(60),
      marginTop: hp(20),
      // overflow: 'hidden',
      shadowColor: '#E3CBAF',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 2,
    },
    image: {
      width: wp(116),
      height: hp(116),
      borderRadius: wp(60),
      resizeMode: 'contain',
    },
    otherInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: hp(20),
      width: '100%',
    },
    timeInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp(6),
    },
    addToCartBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: wp(45),
      height: hp(45),
      borderRadius: wp(10),
      backgroundColor: colors.white,
    },
  });

  return (
    <TouchableOpacity onPress={onPressMealCard} activeOpacity={0.8}>
      <View style={styles.main}>
        <BaseText
          fontFamily={'Graphik-Medium'}
          fontSize={wp(16)}
          textAlign={'center'}
          numberOfLines={1}
          color={colors.black}>
          {title!}
        </BaseText>
        <BaseText
          fontFamily={'Graphik-Medium'}
          fontSize={wp(16)}
          textAlign={'center'}
          numberOfLines={1}
          marginTop={hp(8)}
          color={colors.black}>
          <BaseText fontFamily={'Graphik-Medium'} color={colors.green}>
            ${' '}
          </BaseText>
          9.99
        </BaseText>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
        <View style={styles.otherInfoContainer}>
          <View>
            <BaseText
              color={colors.black}
              fontFamily={'Graphik-Medium'}
              fontSize={wp(18)}
              marginTop={hp(6)}
              lineHeight={hp(22)}>
              🔥 44 Calories
            </BaseText>
            <View style={styles.timeInfo}>
              <Image
                source={require('@assets/images/clock.png')}
                style={{width: wp(16), height: hp(16)}}
              />
              <BaseText
                color={colors.grey1}
                fontFamily={'Graphik-Medium'}
                marginLeft={wp(8)}>
                20 min
              </BaseText>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressAddToCart}>
            <View style={styles.addToCartBtn}>
              <Image
                source={require('@assets/images/bag.png')}
                style={{width: wp(24), height: hp(24)}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;
