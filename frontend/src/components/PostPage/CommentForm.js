import { useState } from 'react';
import { createComment } from '../../store/comment';
import { useDispatch } from 'react-redux';
import styles from './postpage.module.css';

const CommentForm = ({ id, product }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(id);
  const [productId, setProductId] = useState(product);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userId,
      productId: product,
      comment
    }
    setComment('');
    dispatch(createComment(data));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <textarea
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}>
            testing
      </textarea>
        </div>
        <div className={styles.button}>
          <button type="submit">Post Comment</button>
        </div>
      </div>
    </form>
  )
}

export default CommentForm