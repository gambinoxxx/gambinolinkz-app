import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders = {
'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
'x-rapidapi-key': 'b94bb7fe8fmsh8b2b88e0cc83acbp161a90jsn4da8c1177fed',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest =(url) => ({url ,headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`),
      }),
  
      getCryptoDetails: builder.query({
        query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
  
      // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
      getCryptoHistory: builder.query({
        query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history${timePeriod}`),
      }),
  
      // Note: To access this endpoint you need premium plan
      getExchanges: builder.query({
        query: () => createRequest('/exchanges'),
      }),
    }),
  });
  
  export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery,
  } = cryptoApi;