import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp, wp} from '@utils/responsive-dimension';
import Container from '@components/Container';
import {useNavigation, useRoute} from '@react-navigation/native';
import BaseText from '@components/BaseText';
import {pricingData} from '@constant/staticData';
import PricingCard from '@components/PricingCard';
import Button from '@components/Button';
import {addOrder} from '@redux/meal/cartSlice';
import {useDispatch} from 'react-redux';
import {Category, Meal} from '@redux/meal/meal';

interface params {
  meal: Meal;
  category: Category;
}

function FoodDetail() {
  const [selectedPricing, setSelectedPricing] = useState('index002');
  const [quantity, setQuantity] = useState(1);
  const insert = useSafeAreaInsets();
  const paddingTop = insert.top;
  const paddingBottom = insert.bottom;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const params = useRoute().params as params;

  const handleAddToCart = () => {
    const orderData = {
      quantity,
      item: params?.meal,
    };
    dispatch(addOrder(orderData));
    navigation.goBack();
  };

  const handleQuantity = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      if (quantity === 10) {
        return;
      }
      setQuantity(prev => prev + 1);
      return;
    }

    if (type === 'decrease') {
      if (quantity === 1) {
        return;
      }
      setQuantity(prev => prev - 1);
      return;
    }
  };

  return (
    <View style={[styles.main, {paddingTop}]}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('@assets/images/chevronLeft.png')}
            style={{width: wp(24), height: hp(24)}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('@assets/images/heart.png')}
            style={{width: wp(24), height: hp(24)}}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.foodDetailContainer, {paddingBottom}]}>
        <Container>
          <View style={styles.foodInfo}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: params?.meal?.strMealThumb}}
                style={styles.image}
              />
            </View>
            <BaseText
              fontSize={wp(18)}
              lineHeight={hp(22)}
              color={colors.black}
              marginTop={hp(30)}
              fontFamily={'Graphik-Medium'}>
              {params?.meal?.strMeal}
            </BaseText>
            <View style={[styles.row, {marginTop: hp(8)}]}>
              <Image
                source={{uri: params?.category?.strCategoryThumb}}
                style={{width: wp(24), height: hp(24), resizeMode: 'contain'}}
              />
              <BaseText
                fontSize={wp(12)}
                lineHeight={hp(18)}
                color={colors.grey1}
                marginLeft={wp(8)}
                fontFamily={'Graphik-Medium'}>
                {params?.meal?.strMeal}
              </BaseText>
            </View>
            <View style={[styles.row, {marginTop: hp(8)}]}>
              <Image
                source={require('@assets/images/clock.png')}
                style={{width: wp(20), height: hp(20), resizeMode: 'contain'}}
              />
              <BaseText
                fontSize={wp(16)}
                lineHeight={hp(18)}
                color={colors.black}
                marginLeft={wp(8)}
                fontFamily={'Graphik-Medium'}>
                15 min
              </BaseText>
              <BaseText
                fontSize={wp(12)}
                lineHeight={hp(18)}
                color={colors.grey1}
                marginLeft={wp(8)}>
                •
              </BaseText>
              <BaseText
                fontSize={wp(16)}
                lineHeight={hp(18)}
                color={colors.black}
                marginLeft={wp(8)}
                fontFamily={'Graphik-Medium'}>
                4.8
              </BaseText>
              <BaseText
                fontSize={wp(16)}
                lineHeight={hp(18)}
                color={colors.grey1}
                marginLeft={wp(8)}
                fontFamily={'Graphik-Medium'}>
                (2.2k review) {'>'}
              </BaseText>
            </View>
          </View>
          <View style={styles.pricingContainer}>
            {pricingData.map(item => (
              <PricingCard
                onPressPricingCard={() => setSelectedPricing(item.id)}
                selected={item.id === selectedPricing}
                key={item.id}
                title={item.title}
                price={item.pricing}
              />
            ))}
          </View>
          <BaseText
            fontSize={wp(16)}
            lineHeight={hp(30)}
            color={colors.grey1}
            textAlign={'center'}
            marginTop={wp(30)}
            fontFamily={'Graphik-Medium'}>
            Melting cheese pizza making with Extra virgin olive oil, Cornmeal,
            beef/chicken, Tomato sauce (smooth or pureed), Firm mozza, 100 gm
            onion, 70 gm chopped capsicum.
          </BaseText>
          <View
            style={[
              styles.row,
              {marginTop: hp(30), justifyContent: 'space-between'},
            ]}>
            <BaseText
              fontSize={wp(16)}
              lineHeight={hp(18)}
              color={colors.black}
              marginLeft={wp(8)}
              fontFamily={'Graphik-Medium'}>
              Total: $12.99
            </BaseText>
            <View style={[styles.row]}>
              <TouchableOpacity
                onPress={() => handleQuantity('decrease')}
                style={styles.qtyBtn}>
                <Text>-</Text>
              </TouchableOpacity>
              <BaseText
                fontSize={wp(16)}
                lineHeight={hp(20)}
                color={colors.grey1}
                marginRight={wp(10)}
                marginLeft={wp(10)}
                textAlign={'center'}
                fontFamily={'Graphik-Medium'}>
                {quantity}
              </BaseText>
              <TouchableOpacity
                onPress={() => handleQuantity('increase')}
                style={styles.qtyBtn}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            marginTop={hp(25)}
            backgroundColor={colors.green}
            onPress={handleAddToCart}
            title={'Next'}
          />
        </Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.green,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(8),
    marginBottom: hp(90),
    marginHorizontal: wp(20),
  },
  foodDetailContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: wp(24),
    borderTopRightRadius: wp(24),
  },
  foodInfo: {
    alignItems: 'center',
  },
  imageContainer: {
    width: wp(200),
    height: hp(200),
    borderRadius: wp(100),
    marginTop: -wp(100),
    // overflow: 'hidden',
    shadowColor: '#E3CBAF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 2,
  },
  image: {
    width: wp(200),
    height: hp(200),
    borderRadius: wp(100),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp(26),
  },
  qtyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(24),
    height: hp(24),
    borderRadius: wp(8),
    borderWidth: wp(1),
    borderColor: colors.border,
  },
});

export default FoodDetail;
