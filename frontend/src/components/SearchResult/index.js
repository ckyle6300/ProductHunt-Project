import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getItAll } from '../../store/splash';
import { getAllOfThemP } from '../../store/profile'
import { Link } from 'react-router-dom';
import Search from '../Search'
import styles from './searchResult.module.css'

function SearchResults() {
  const dispatch = useDispatch();

  const searchText = useSelector((state) => state.searchReducer.msg);
  const profiles = useSelector((state) => Object.values(state.profileReducer));
  const products = useSelector((state) => Object.values(state.splashReducer));



  const userResults = profiles?.filter(user => user.username?.toLowerCase().includes(searchText?.toLowerCase()));
  const prodResults = products?.filter(product => product.productName?.toLowerCase().includes(searchText?.toLowerCase()))



  useEffect(() => {
    dispatch(getItAll());
    dispatch(getAllOfThemP());
  }, [dispatch])

  return (
    <>
      <div className={styles.search}><Search /></div>
      <div className={styles.outerDiv}>
        <div className={styles.users}>
          <h3>Users</h3>
          <ul>
            {userResults.map(user => {
              return (
                <div className={styles.userList}>
                  <div>
                    <Link to={`/profile/${user.id}`}>
                      <img className={styles.userImg} src={user.picture || 'https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_boss_client_male_person_user_work-128.png'} />
                    </Link>
                  </div>
                  <div className={styles.userInfo}>
                    <Link to={`/profile/${user.id}`}>
                      <p>{user.username}</p>
                    </Link>
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
        <div className={styles.product}>
          <h3>Products</h3>
          <ul>
            {
              prodResults.map(product => {
                return (
                  <Link to={`/product/${product.id}`}>
                    <div className={styles.list}>
                      <div className={styles.imgDiv}>
                        <img src={product?.image} />
                      </div>
                      <div className={styles.prodInfo}>
                        <p>{product?.productName}</p>
                      </div>
                    </div>
                  </ Link >
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default SearchResults;