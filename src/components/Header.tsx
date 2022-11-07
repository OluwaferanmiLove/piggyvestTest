import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import BaseText from './BaseText';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.nameContainer}>
        <BaseText
          color={colors.grey2}
          fontFamily={'Graphik-Medium'}
          fontSize={wp(14)}>
          Hi Oluwaferanmi
        </BaseText>
        <BaseText
          color={colors.black}
          fontFamily={'Graphik-Medium'}
          fontSize={wp(28)}
          marginTop={hp(6)}
          lineHeight={hp(32)}>
          Hungry Now? 🔥
        </BaseText>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/11.jpg',
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: hp(8),
  },
  nameContainer: {
    flex: 1,
    marginRight: wp(16),
  },
  imageContainer: {
    width: wp(40),
    height: hp(40),
    borderRadius: wp(20),
    backgroundColor: colors.grey2,
    overflow: 'hidden',
  },
  image: {
    width: wp(40),
    height: hp(40),
    resizeMode: 'contain',
  },
});

export default Header;
