import { Link } from "react-router-dom";
import { deleteComment } from '../../store/comment';
import { useDispatch } from 'react-redux';

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
    <div>
      <p>{comment}</p>
      <Link to={`/profile/${userId}`}>
        <p>{username}</p>

        <img src={image} />
      </Link>
      {
        loginId == userId &&
        <button onClick={handleDelete}>Delete</button>
      }
    </div>
  )
}

export default Comment;