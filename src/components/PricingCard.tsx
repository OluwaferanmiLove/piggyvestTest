import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors} from '@theme/colors';
import {wp, hp} from '@utils/responsive-dimension';
import BaseText from './BaseText';

interface PricingCardT {
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  title?: string;
  price?: string;
  selected?: boolean;
  onPressPricingCard: () => void;
}

const PricingCard: React.FC<PricingCardT> = ({
  marginTop,
  title,
  selected,
  onPressPricingCard,
  marginLeft,
  marginRight,
  price,
}) => {
  const styles = StyleSheet.create({
    main: {
      // flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: marginTop,
      marginLeft,
      marginRight,
      width: wp(95),
      height: wp(110),
      borderRadius: wp(18),
      padding: hp(8),
      borderWidth: selected ? wp(2) : wp(2),
      borderColor: selected ? colors.borderGreen : colors.border,
      backgroundColor: 'transparent',
    },
    selectedIndicator: {
      alignItems: 'center',
      justifyContent: 'center',
      width: wp(18),
      height: hp(18),
      borderRadius: wp(10),
      borderWidth: wp(1),
      borderColor: selected ? colors.borderGreen : colors.border,
      backgroundColor: selected ? colors.green : colors.white,
    },
    indicator: {
      width: wp(8),
      height: hp(8),
      borderRadius: wp(10),
      backgroundColor: colors.white,
    },
  });

  return (
    <TouchableOpacity onPress={onPressPricingCard} activeOpacity={0.8}>
      <View style={styles.main}>
        <View style={styles.selectedIndicator}>
          {selected && <View style={styles.indicator} />}
        </View>
        <BaseText
          fontFamily={'Graphik-Medium'}
          fontSize={wp(12)}
          marginTop={hp(8)}
          textAlign={'center'}
          numberOfLines={1}
          color={colors.grey1}>
          {title!}
        </BaseText>
        <BaseText
          fontFamily={'Graphik-Medium'}
          fontSize={wp(14)}
          lineHeight={wp(16)}
          // marginTop={hp(2)}
          textAlign={'center'}
          numberOfLines={1}
          color={colors.black}>
          ${price!}
        </BaseText>
      </View>
    </TouchableOpacity>
  );
};

export default PricingCard;
