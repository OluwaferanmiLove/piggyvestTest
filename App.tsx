import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Navigation';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
