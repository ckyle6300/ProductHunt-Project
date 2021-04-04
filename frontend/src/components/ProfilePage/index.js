import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfiles } from '../../store/profile'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './profilePage.module.css'


function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector(state => Object.values(state.profileReducer)[0])
  const comments = profile?.Comments
  const posts = profile?.Products

  useEffect(() => {
    dispatch(getProfiles(id));
  }, [dispatch])

  return (
    <div >
      <div className={styles.profilehead}>
        <div className={styles.imgdiv}>
          <img className={styles.profimg} src={profile?.picture ? profile.picture : 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png'} />
        </div>
        <div>
          <h1>{profile?.username}</h1>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.comlist}>
          <h2>Comments</h2>
          <ul>
            {
              comments?.map((obj) => {
                return (
                  <li key={obj?.id}>

                    <div className={styles.comitem}>
                      <p>{obj?.comment}</p>
                      <Link to={`/product/${obj?.Product.id}`}>
                        <p>{obj?.Product.productName}</p>
                      </Link>
                    </div>

                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={styles.prodDiv}>
          <h2>Posts</h2>
          <ul>
            {
              posts?.map((obj) => {
                const arrdesc = obj?.description.split(' ');
                const newArr = arrdesc.slice(0, 4)
                return (

                  <Link to={`/product/${obj?.id}`}>
                    <div className={styles.listItem}>
                      <li key={obj?.id}>
                        <div className={styles.prodcont}>
                          <div>
                            <img className={styles.prodImg} src={obj?.image} />
                          </div>
                          <div>
                            <h3>{obj?.productName}</h3>
                            <p>{newArr.join(' ') + '...'}</p>
                          </div>
                        </div>
                      </li>
                    </div>
                  </Link>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage