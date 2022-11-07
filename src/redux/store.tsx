import {combineReducers} from 'redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {mealApi} from './meal/MealApi';
import Cart from './meal/cartSlice';
import onBoarding from './onBoarding/onBoardingSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [mealApi.reducerPath],
};

const rootReducer = combineReducers({
  [mealApi.reducerPath]: mealApi.reducer,
  onBoarding: onBoarding,
  cart: Cart,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mealApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
