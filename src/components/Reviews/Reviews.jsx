import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../services/api';
import s from './reviews.module.css';

const Reviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { results } = await getMovieReviews(movieId);
        setData(results);
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
            {data.map(({ author, content, id }) => (
              <li key={id} className={s.listItem}>
                <p className={s.listName}>{author}</p>
                {content && content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={s.error}>No reviews found</p>
      )}
    </>
  );
};

export default Reviews;
