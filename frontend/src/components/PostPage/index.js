import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/splash';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getComments } from '../../store/comment';
import CommentForm from './CommentForm';
import Comment from './Comment';
import styles from './postpage.module.css';

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
    <div className={styles.outerDiv}>
      <div className={styles.upper}>
        <h2>{page?.productName}</h2>
        <img src={page?.image}></img>
        <p>{page?.description}</p>
        <Link to={`/profile/${user?.id}`}>
          <img className={styles.avatar} src={user?.picture ? user.picture : 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png'} />
        </Link>
      </div>
      <div className={styles.comment}>
        {
          loggedIn?.id &&
          <CommentForm id={loggedIn?.id} product={page?.id} />
        }
      </div>
      <div>
        <ul>
          {Object.values(comments).map((obj => {
            return (

              <div className={styles.comList}>
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
              </div>

            )
          }))}
        </ul>
      </div>
    </div >
  )
}

export default PostPage