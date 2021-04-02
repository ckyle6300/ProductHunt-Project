import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../store/splash'
import Post from './Post';

function Splash() {
  console.log(Post)
  const posts = useSelector(state => state.splashReducer);
  const dispatch = useDispatch();

  console.log(posts, '=================')
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  console.log(typeof posts)
  const splashElements = Object.values(posts).map((post) => {

    return (
      <Post name={post.productName} description={post.description} imageUrl={post.image} postId={post.id} />
    )
  })


  return (
    <>
      <ul>
        <li>{splashElements}</li>
      </ul>
    </>
  )
}

export default Splash;