import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const api_key = import.meta.env.VITE_API_KEY;
const base_url = import.meta.env.VITE_BASE_URL;

// Fetch TV shows based on the endpoint
export const getTVShows = createAsyncThunk("getTVShows", async ({ endpoint, language }) => {
    let tvShows = [];
    let total_pages;

    // Define total pages based on the endpoint
    if (endpoint === "airing_today" || endpoint === "on_the_air") {
        total_pages = 5; // Limit pages for specific endpoints
    } else {
        total_pages = 15; // General case for other endpoints
    }

    // Loop through pages to fetch TV shows
    for (let current_page = 1; current_page <= total_pages; current_page++) {
        const response = await axios.get(`${base_url}/tv/${endpoint}?api_key=${api_key}&language=${language}&page=${current_page}`);
        tvShows = [...tvShows, ...response.data.results];
    }

    // Remove duplicate TV shows based on title
    const key = 'name'; // Use 'name' for TV shows instead of 'title'
    const unique_tvShows = [...new Map(tvShows.map(item => [item[key], item])).values()];
    return unique_tvShows;
});

// Initial state for the TV shows slice
const initialState = {
    loading: false,
    tvShows: [],
    error: ""
};

// Create the TV shows slice
export const tvShowsSlice = createSlice({
    name: "tvShows",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTVShows.pending, (state) => {
            state.loading = true; // Set loading to true when fetching
        }),
        builder.addCase(getTVShows.fulfilled, (state, action) => {
            state.loading = false; // Set loading to false when done
            state.tvShows = action.payload; // Store fetched TV shows
        }),
        builder.addCase(getTVShows.rejected, (state, action) => {
            state.loading = false; // Set loading to false on error
            state.error = action.error.message; // Store error message
        });
    }
});

// Export the reducer
export default tvShowsSlice.reducer;
