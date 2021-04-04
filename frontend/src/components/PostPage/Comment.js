import { Link } from "react-router-dom";
import { deleteComment } from '../../store/comment';
import { useDispatch } from 'react-redux';
import styles from './postpage.module.css';

function Comment({ comment, username, image, userId, loginId, prodId, comId }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    const data = {
      comId,
      prodId,
    }
    dispatch(deleteComment(data));
  }


  return (
    <>
      <div className={styles.comInfo}>
        <div className={styles.compic}>
          <Link to={`/profile/${userId}`}>
            <img src={image ? image : 'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Butler-512.png'} />
          </Link>
        </div>
        <div className={styles.combody}>
          <h4>{username}</h4>
          <p>{comment}</p>
        </div>
      </div>

      {
        loginId == userId &&
        <button onClick={handleDelete}>Delete</button>
      }
    </>
  )
}

export default Comment;