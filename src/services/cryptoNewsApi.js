import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'x-rapidapi-key': 'b94bb7fe8fmsh8b2b88e0cc83acbp161a90jsn4da8c1177fed',
    'x-rapidapi-host': 'crypto-news34.p.rapidapi.com',
  };
  
  const baseUrl = 'https://crypto-news34.p.rapidapi.com/news/cryptonews';
  
  const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });
  
  export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptoNews: builder.query({
        query: ({ category }) =>
          createRequest(`/news/coincu?q=${category || 'crypto'}&safeSearch=Off&textFormat=Raw`),
      }),
    }),
  });
  
  export const { useGetCryptoNewsQuery } = cryptoNewsApi;
  