import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '@constant/staticData';
import {MealCategories, MealsByCategoryT} from './meal';

export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getMealCategories: builder.query<MealCategories, void>({
      query: () => '/categories.php',
    }),
    getMealByCaegory: builder.query<MealsByCategoryT, {c: string}>({
      query: arg => {
        const {c} = arg;
        return {
          url: '/filter.php',
          params: {c},
        };
      },
    }),
  }),
});

export const {useGetMealCategoriesQuery, useLazyGetMealByCaegoryQuery} =
  mealApi;
