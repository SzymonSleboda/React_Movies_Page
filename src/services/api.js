import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'aa3a1d368472f27adb5bb4cd561a9a69',
    language: 'en-US',
  },
});

export async function getTrendingMovies() {
  const query = `/trending/movie/week`;
  try {
    const { data } = await instance.get(query);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function getMovieDetails(id) {
  const query = `/movie/${id}`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieCast(id) {
  const query = `/movie/${id}/credits`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovieReviews(id) {
  const query = `/movie/${id}/reviews`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function searchMovie(queryString) {
  const query = `/search/movie?query=${queryString}`;
  try {
    const { data } = await instance.get(query);
    return data;
  } catch (error) {
    throw error;
  }
}
