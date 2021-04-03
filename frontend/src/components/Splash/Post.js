import { Link } from 'react-router-dom'

export default function Post(props) {

  return (

    <div>
      <Link to={`/product/${props.postId}`}>
        <h3>{props.name}</h3>
        <img src={props.imageUrl} />
        <br />
        <p>{props.description}</p>
      </Link>
    </div>
  )
}