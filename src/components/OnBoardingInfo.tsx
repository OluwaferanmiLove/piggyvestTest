import React, {ReactNode} from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {hp, wp} from '@utils/responsive-dimension';
import BaseText from './BaseText';
import {colors} from '@theme/colors';

interface OnBoardingInfoT {
  children?: ReactNode;
  title: string;
  image: any;
  customStyles?: StyleProp<ViewStyle>;
}

const OnBoardingInfo: React.FC<OnBoardingInfoT> = ({
  customStyles = {},
  title,
  image,
  ...rest
}) => {
  return (
    <View style={[styles.main, customStyles]} {...rest}>
      <Image source={image} style={styles.image} />
      <BaseText
        color={colors.white}
        fontSize={wp(18)}
        marginTop={hp(72)}
        fontFamily={'Graphik-Bold'}
        textAlign={'center'}>
        {title}
      </BaseText>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: wp(375),
    alignItems: 'center',
    paddingHorizontal: wp(55),
  },
  image: {
    width: wp(250),
    height: hp(200),
    resizeMode: 'contain',
  },
  title: {
    fontSize: wp(146),
  },
});

export default OnBoardingInfo;
