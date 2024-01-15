import axios from 'axios';




const BASE_URL = 'https://api.themoviedb.org/3'


// ce5f5ba3541816040759123dfd3242ac' 





// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;                 

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTVmNWJhMzU0MTgxNjA0MDc1OTEyM2RmZDMyNDJhYyIsInN1YiI6IjY1OGQ5YWVlZjJjZjI1NjY0ZjRjYmQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRfRJHhiLNeE0jN_L3guqfuGDKnRyMkmm0jeGAkyw_I";
const headers = {
  Authorization: "Bearer " + TMDB_TOKEN
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(
      BASE_URL + url,
      {
        headers,
        params
      }
    );
    return data;
  }
  catch (err) {
    console.log(err);
    return err;

  }
}

