import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfiles } from '../../store/profile'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


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
    <div>
      <h1>{profile?.username}</h1>
      <img src={profile?.picture} />
      <h4>Comments</h4>
      <ul>
        {
          comments?.map((obj) => {

            return (
              <li key={obj?.id}>
                <p>{obj?.comment}</p>
                <Link to={`/product/${obj?.Product.id}`}>
                  <p>{obj?.Product.productName}</p>
                </Link>
              </li>

            )
          })
        }
      </ul>

      <h4>Posts</h4>
      <ul>
        {
          posts?.map((obj) => {

            return (
              <Link to={`/product/${obj?.id}`}>
                <li key={obj?.id}>
                  <div>
                    <img src={obj?.image} />
                  </div>
                  <div>
                    <h5>{obj?.productName}</h5>
                    <p>{obj?.description}</p>
                  </div>
                </li>
              </Link>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ProfilePage