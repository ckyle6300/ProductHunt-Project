import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getItAll } from '../../store/splash';
import { getAllOfThemP } from '../../store/profile'
import { Link } from 'react-router-dom';
import Search from '../Search'

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
    <div>
      <Search />
      <h3>Users</h3>
      <ul>
        {userResults.map(user => {
          return (
            <div>
              <Link to={`/profile/${user.id}`}>
                <img src={user.picture || 'https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_boss_client_male_person_user_work-128.png'} />
                <p>{user.username}</p>
              </Link>
            </div>
          )
        })}
      </ul>

      <h3>products</h3>
      <ul>
        {
          prodResults.map(product => {
            return (
              <div>
                <Link to={`/product/${product.id}`}>
                  <img src={product?.image} />
                  <p>{product?.productName}</p>
                </Link>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SearchResults;