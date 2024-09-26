import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const api_key = import.meta.env.VITE_API_KEY;
const base_url = import.meta.env.VITE_BASE_URL;

// Fetch a specific TV show
export const getTVShow = createAsyncThunk("getTVShow", async ({ id, language }) => {
    const response = await axios.get(`${base_url}/tv/${id}?api_key=${api_key}&language=${language}`);
    return response.data;
});

const initialState = {
    loading: false,
    tvShow: {},
    error: ""
};

export const tvShowSlice = createSlice({
    name: "tvShow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTVShow.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getTVShow.fulfilled, (state, action) => {
            state.loading = false;
            state.tvShow = action.payload;
        }),
        builder.addCase(getTVShow.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default tvShowSlice.reducer;
