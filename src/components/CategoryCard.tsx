import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {colors} from '@theme/colors';
import {wp, hp} from '@utils/responsive-dimension';
import BaseText from './BaseText';

interface CategoryCardT {
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  title?: string;
  image?: string;
  selected?: boolean;
  onPressCategoryCard: () => void;
}

const CategoryCard: React.FC<CategoryCardT> = ({
  marginTop,
  title,
  image,
  selected,
  onPressCategoryCard,
  marginLeft,
  marginRight,
}) => {
  const styles = StyleSheet.create({
    main: {
      // flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: marginTop,
      marginLeft,
      marginRight,
      width: wp(80),
      height: wp(100),
      borderRadius: wp(18),
      padding: hp(8),
      borderWidth: selected ? wp(2) : wp(2),
      borderColor: selected ? colors.borderGreen : colors.border,
      backgroundColor: selected ? colors.green : 'transparent',
    },
    image: {
      width: wp(30),
      height: hp(30),
      resizeMode: 'contain',
    },
  });

  return (
    <TouchableOpacity onPress={onPressCategoryCard}>
      <View style={styles.main}>
        <Image source={{uri: image}} style={styles.image} />
        <BaseText
          fontFamily={'Graphik-Medium'}
          fontSize={wp(14)}
          marginTop={hp(4)}
          textAlign={'center'}
          numberOfLines={1}
          color={selected ? colors.white : colors.black}>
          {title!}
        </BaseText>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
