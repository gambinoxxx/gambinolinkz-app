import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const axios = require('axios');

// Define headers for RapidAPI
const cryptoNewsHeaders = {
  'x-rapidapi-key': 'b94bb7fe8fmsh8b2b88e0cc83acbp161a90jsn4da8c1177fed',
  'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com',
};

// Define the base URL for the Decrypt API
const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1/decrypt';

// Helper function to create a request object
const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
});

// Define the cryptoNewsApi using RTK Query
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest('/'), // Decrypt API does not require category-based filtering
    }),
  }),
});

// Export the generated hook for the API endpoint
export const { useGetCryptoNewsQuery } = cryptoNewsApi;

// Axios request example (can be used for debugging or as a backup approach)
const fetchDecryptNewsWithAxios = async () => {
  const options = {
    method: 'GET',
    url: baseUrl,
    headers: cryptoNewsHeaders,
  };

  try {
    const response = await axios.request(options);
    console.log('Axios Fetch Success:', response.data);
    return response.data; // Return the data for further use
  } catch (error) {
    console.error('Axios Fetch Error:', error);
    throw error; // Optionally rethrow the error for handling
  }
};

// Export the Axios function for manual fetches if needed
export { fetchDecryptNewsWithAxios };
