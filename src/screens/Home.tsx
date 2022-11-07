/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LoadingContainer from '@components/LoadingContainer';
import {hp, wp} from '@utils/responsive-dimension';
import BaseText from '@components/BaseText';
import {
  useGetMealCategoriesQuery,
  useLazyGetMealByCaegoryQuery,
} from '@redux/meal/MealApi';
import Container from '@components/Container';
import {colors} from '@theme/colors';
import CategoryCard from '@components/CategoryCard';
import {Category, Meal} from '@redux/meal/meal';
import SearchInput from '@components/SearchInput';
import Header from '@components/Header';
import MealCard from '@components/MealCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addOrder} from '@redux/meal/cartSlice';
import {RootState} from '@redux/store';
import Button from '@components/Button';
import {revertAll} from '@redux/sharedAction';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>({});
  const [meals, setMeals] = useState<Meal[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {data: mealCategories, isLoading: getCategoriesLoading} =
    useGetMealCategoriesQuery();
  const [getMealsByCat, {data: mealsByCat}] = useLazyGetMealByCaegoryQuery();

  const cart = useSelector((state: RootState) => state.cart.order);

  useEffect(() => {
    if (mealCategories) {
      setSelectedCategory(mealCategories.categories[0]);
      getMealsByCat({c: mealCategories.categories[0].strCategory});
    }
  }, [mealCategories]);

  useEffect(() => {
    if (mealsByCat) {
      setMeals(mealsByCat?.meals);
      setLoading(false);
    }
  }, [mealsByCat]);

  // const seperator = () => <View style={styles.seperator} />;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //search feature on meal
  const handleSearch = (text: string) => {
    if (text.length === 0) {
      setMeals(mealsByCat?.meals!);
    }

    let newList = mealsByCat?.meals.filter((meal: any) => {
      return meal.strMeal.toLowerCase().includes(text.toLowerCase());
    });

    if (newList) {
      setMeals(newList);
      return;
    }

    if (!newList) {
      setMeals(mealsByCat?.meals!);
      return;
    }
  };

  //render category card function
  const renderCategoryCard = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    const getSelected = () => {
      let selected =
        selectedCategory?.strCategory === item.strCategory ? true : false;
      return selected;
    };

    const selectCategory = () => {
      setLoading(true);
      setSelectedCategory(item);
      getMealsByCat({c: item.strCategory});
    };

    return (
      <CategoryCard
        selected={getSelected()}
        onPressCategoryCard={selectCategory}
        image={item.strCategoryThumb}
        title={item.strCategory}
        marginLeft={index === 0 ? wp(20) : wp(16)}
      />
    );
  };

  //render meal card function
  const renderMealCard = ({item, index}: {item: Meal; index: number}) => {
    const orderData = {
      quantity: 1,
      item,
    };

    const handleAddToCart = () => {
      dispatch(addOrder(orderData));
    };

    const handleNav = () => {
      navigation.navigate('FoodDetail', {
        meal: item,
        category: selectedCategory,
      });
    };

    return (
      <MealCard
        onPressMealCard={handleNav}
        onPressAddToCart={handleAddToCart}
        image={item.strMealThumb}
        title={item.strMeal}
        marginLeft={index === 0 ? wp(20) : wp(16)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <LoadingContainer loading={getCategoriesLoading}>
        <ScrollView style={{flex: 1}}>
          <Container>
            <Header />
            <View style={styles.searchContainer}>
              <SearchInput
                placeholder={'Search...'}
                onChangeText={handleSearch}
              />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={mealCategories?.categories}
                style={{flex: 1}}
                keyExtractor={item => item.idCategory}
                horizontal
                // ItemSeparatorComponent={seperator}
                showsHorizontalScrollIndicator={false}
                renderItem={renderCategoryCard}
              />
            </View>
            <View style={styles.sectionHead}>
              <BaseText
                fontSize={wp(22)}
                lineHeight={hp(28)}
                fontFamily={'Graphik-Medium'}>
                Popular Items
              </BaseText>
              <TouchableOpacity activeOpacity={0.8}>
                <BaseText
                  fontSize={wp(16)}
                  lineHeight={hp(28)}
                  color={colors.grey1}
                  fontFamily={'Graphik-Medium'}>
                  See All
                </BaseText>
              </TouchableOpacity>
            </View>
            <LoadingContainer loading={loading}>
              <View style={[styles.listContainer, {marginTop: hp(18)}]}>
                <FlatList
                  data={meals}
                  style={{flex: 1}}
                  keyExtractor={item => item.idMeal}
                  horizontal
                  maxToRenderPerBatch={15}
                  // ItemSeparatorComponent={seperator}
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderMealCard}
                />
              </View>
            </LoadingContainer>
            <Button
              title={'Restart app'}
              marginTop={hp(20)}
              onPress={() => dispatch(revertAll())}
            />
            <BaseText
              fontSize={wp(12)}
              lineHeight={hp(16)}
              color={colors.grey1}
              textAlign={'center'}
              marginTop={hp(10)}
              fontFamily={'Graphik-Regular'}>
              Button added as a way of restarting the app without having to
              rebuild, because of the persisted data
            </BaseText>
          </Container>
        </ScrollView>
        {cart && (
          <Container>
            <View style={styles.cart}>
              <View>
                <BaseText
                  fontSize={wp(20)}
                  lineHeight={hp(22)}
                  color={colors.white}
                  fontFamily={'Graphik-Medium'}>
                  Cart
                </BaseText>
                <BaseText
                  fontSize={wp(14)}
                  lineHeight={hp(28)}
                  color={colors.white}
                  fontFamily={'Graphik-Regular'}>
                  {cart.length} item(s)
                </BaseText>
              </View>
              <View style={{flexDirection: 'row'}}>
                {cart?.map((item, index) => {
                  const marginNum = cart.length > 3 ? -wp(25) : wp(8);
                  const marginRight = index === cart.length - 1 ? 0 : marginNum;
                  return (
                    <View style={[styles.cartImageContainer, {marginRight}]}>
                      <Image
                        source={{uri: item.item.strMealThumb}}
                        style={styles.cartImage}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </Container>
        )}
      </LoadingContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    marginVertical: hp(26),
  },
  listContainer: {
    flex: 1,
    width: wp(375),
    marginHorizontal: -wp(20),
    // paddingHorizontal: wp(20),
  },
  seperator: {
    width: wp(16),
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(30),
  },
  cart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(25),
    paddingVertical: wp(20),
    backgroundColor: colors.green,
    height: wp(80),
    borderRadius: wp(20),
  },
  cartImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(50),
    height: hp(50),
    borderRadius: wp(25),
    backgroundColor: colors.white,
  },
  cartImage: {
    width: wp(40),
    height: hp(40),
    borderRadius: wp(25),
    resizeMode: 'contain',
  },
});

export default Home;
