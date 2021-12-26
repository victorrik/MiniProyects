import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/configureStore';
import Screens from './src/Screens';

function App() {
  return (
    <Provider store={configureStore} >
      <Screens />
    </Provider>
  );
};
 

export default App;
