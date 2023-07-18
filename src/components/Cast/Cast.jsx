import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCast } from '../../services/api';
import s from './cast.module.css';
import PropTypes from 'prop-types';

import userImg from '../../img/user.jpg';

const Cast = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { cast } = await getMovieCast(movieId);
        setData(cast);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <>
      {loading ? (
        'Loading...'
      ) : data && data.length > 0 ? (
        <div className={s.listWrap}>
          <ul className={s.list}>
            {data.map(({ name, character, profile_path, id }) => (
              <li key={id} className={s.listItem}>
                {profile_path ? (
                  <img
                    className={s.listImg}
                    alt={name}
                    src={`https://image.tmdb.org/t/p/w92${profile_path}`}
                  />
                ) : (
                  <img className={s.listImg} alt={name} src={userImg} />
                )}

                <p className={s.listName}>{name}</p>
                <p className={s.listCharacter}>{character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={s.error}>No data found</p>
      )}
    </>
  );
};

Cast.propTypes = {
  movieId: PropTypes.number,
};

export default Cast;
