import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/splash';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getComments } from '../../store/comment';
import CommentForm from './CommentForm';
import Comment from './Comment';

function PostPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const num = Number(id);

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getComments(num))
  }, [dispatch, num])

  const page = useSelector(state => state.splashReducer[id]);

  const comments = useSelector(state => state.commentReducer)
  const loggedIn = useSelector(state => state.session.user)
  const user = page?.Users[0]

  return (
    <div>
      <h2>{page?.productName}</h2>
      <img src={page?.image}></img>
      <Link to={`/profile/${user?.id}`}>
        <img src={user?.picture} />
      </Link>
      <p>{page?.description}</p>
      {
        loggedIn?.id &&
        <CommentForm id={loggedIn?.id} product={page?.id} />
      }
      <ul>
        {Object.values(comments).map((obj => {
          return (
            <li key={obj.id}>
              <Comment
                comment={obj.comment}
                username={obj.User.username}
                image={obj.User.picture}
                userId={obj.User.id}
                loginId={loggedIn?.id}
                prodId={page?.id}
                comId={obj.id}
              />
            </li>
          )
        }))}
      </ul>
    </div >
  )
}

export default PostPage