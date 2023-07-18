import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { searchMovie } from '../../services/api';
import s from './movies.module.css';

const Movies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const [query, setQuery] = useState(() => searchQuery || '');

  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { results } = await searchMovie(searchQuery);
        setData(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (searchQuery) {
      getData();
    }
  }, [searchQuery]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: query });
  };

  return (
    <>
      <div className={s.wrap}>
        <h2 className={s.title}>Search movies:</h2>

        <form onSubmit={handleSubmit} className={s.movieForm}>
          <input
            value={query}
            onChange={handleChange}
            name="search"
            type="text"
            placeholder="Type here"
            className={s.movieInput}
          />
          <button type="submit" className={s.btn}>
            Search
          </button>
        </form>
      </div>
      <ul className={s.list}>
        {searchQuery ? (
          loading ? (
            'Loading...'
          ) : data.length > 0 ? (
            data.map(({ title, id }) => (
              <li key={id} className={s.listItem}>
                <Link state={{ from: location }} to={`/movies/${id}`}>
                  {title}
                </Link>
              </li>
            ))
          ) : (
            <p>
              No movies with this title were found. Try entering another title
            </p>
          )
        ) : (
          <p className={s.descr}></p>
        )}
      </ul>
    </>
  );
};

export default Movies;
