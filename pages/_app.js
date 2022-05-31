import React from 'react'
import '../styles/globals.css'
import {Provider} from 'react-redux'
import store from '../store/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';


function MyApp({ Component, pageProps }) {

  let persistor = persistStore(store);



  return <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
}

export default MyApp
