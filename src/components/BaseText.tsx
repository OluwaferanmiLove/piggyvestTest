import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {colors} from '../theme/colors';
import {hp, wp} from '@utils/responsive-dimension';

export interface BaseTextT extends TextProps {
  children?: ReactNode;
  fontSize?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  lineHeight?: number;
  fontFamily?: 'Graphik-Bold' | 'Graphik-Regular' | 'Graphik-Medium';
  color?: string;
  textAlign?: string;
  customStyles?: StyleProp<TextStyle>;
}

const BaseText: React.FC<BaseTextT> = ({
  children,
  fontSize = wp(16),
  fontFamily = 'Graphik-Regular',
  marginTop = 0,
  marginLeft = 0,
  lineHeight = hp(24),
  marginRight = 0,
  marginBottom = 0,
  customStyles = {},
  textAlign = 'left',
  color = colors.black,
  ...rest
}) => {
  const styles = StyleSheet.create({
    main: {
      fontSize,
      fontFamily,
      marginTop,
      marginLeft,
      lineHeight,
      marginRight,
      marginBottom,
      color,
      textAlign,
    },
  });

  return (
    <Text style={[styles.main, customStyles]} {...rest}>
      {children}
    </Text>
  );
};
export default BaseText;
