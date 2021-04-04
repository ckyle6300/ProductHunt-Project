import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getData } from '../../store/search';

function Search() {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const message = useSelector(state => state.searchReducer)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = search;
    dispatch(getData(data))
    setSearch('');
    history.push('/search');
  }


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
        placeholder='Search'
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default Search;