import axios from 'axios';
import type { OMDBResponse } from '../types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'c5ce15d';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query: string = 'batman'): Promise<OMDBResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};
