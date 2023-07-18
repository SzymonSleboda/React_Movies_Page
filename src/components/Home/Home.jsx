import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListMovies, MovieItem } from './home.styled';
import { getTrendingMovies } from '../../services/api';
import s from './home.module.css';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <ListMovies>
        <h2 className={s.title}>Trending movies:</h2>
        {loading
          ? 'Loading...'
          : data.map(({ title, id }) => (
              <MovieItem key={id}>
                <Link
                  to={`/movies/${id}`}
                  state={{ from: location }}
                  className={s.movieItem}
                >
                  {title}
                </Link>
              </MovieItem>
            ))}
      </ListMovies>
    </>
  );
};

export default Home;
