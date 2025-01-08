import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define headers
const cryptoNewsHeaders = {
  'x-rapidapi-key': 'b94bb7fe8fmsh8b2b88e0cc83acbp161a90jsn4da8c1177fed',
  'x-rapidapi-host': 'crypto-news16.p.rapidapi.com',
};

// Define base URL
const baseUrl = 'https://crypto-news16.p.rapidapi.com';

// Helper function to create request
const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
});

// Define API using RTK Query
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ category }) => 
        createRequest(`/news/coindesk?q=${category || 'crypto'}&safeSearch=Off&textFormat=Raw`),
    }),
  }),
});

// Export the generated hook
export const { useGetCryptoNewsQuery } = cryptoNewsApi;
