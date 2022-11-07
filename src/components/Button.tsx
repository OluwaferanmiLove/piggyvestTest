import React, {ReactNode} from 'react';
import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {hp, wp} from '@utils/responsive-dimension';
import BaseText, {BaseTextT} from './BaseText';
import {colors} from '@theme/colors';

interface ButtonProps {
  title: string;
  textColor?: string;
  marginTop?: number;
  marginHorizontal?: number;
  width?: number | string;
  backgroundColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  baseTextProps?: Partial<BaseTextT>;
  leftIconElement?: ReactNode;
  rightIconElement?: ReactNode;
  borderWidth?: number;
  borderColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  customStyles?: StyleProp<ViewStyle>;
}

/**
 * Base button
 * This components extends basetext components to display the text
 * you can use baseTextProps to control how th text look.
 */

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  width,
  backgroundColor = colors.piggyBlue,
  disabled,
  marginTop,
  marginHorizontal,
  loading,
  baseTextProps = {},
  customStyles,
  borderWidth,
  borderColor,
  paddingVertical = hp(16),
  paddingHorizontal = hp(12),
}) => {
  const styles = StyleSheet.create({
    btnMain: {
      backgroundColor,
      paddingVertical,
      paddingHorizontal,
      borderRadius: wp(8),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      marginTop: marginTop,
      marginHorizontal,
      borderWidth: borderWidth,
      borderColor: borderColor,
      opacity: loading || disabled ? 0.7 : 1,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.btnMain, customStyles]}
      onPress={onPress}
      disabled={loading ? loading : disabled}>
      <View style={styles.titleContainer}>
        <BaseText
          color={colors.white}
          marginRight={loading ? wp(8) : 0}
          {...baseTextProps}>
          {title}
        </BaseText>
        {loading && <ActivityIndicator color={colors.white} size="small" />}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
