// store.js
import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi'; // Path to your API slice
import { cryptoNewsApi } from '../services/cryptoNewsApi'; // Path to your API slice

const store = configureStore({
  reducer: {
    // Add the cryptoApi reducer
      [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(cryptoApi.middleware)
  .concat(cryptoNewsApi.middleware)
  ,
});

export default store;
