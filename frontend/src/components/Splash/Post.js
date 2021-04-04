import { Link } from 'react-router-dom'
import styles from './splash.module.css'

export default function Post(props) {
  const breakup = props.description.split('.')
  const hook = breakup[0];
  return (

    <div className={styles.listDiv}>
      <div className={styles.picDiv}>
        <Link to={`/product/${props.postId}`}>
          <img src={props.imageUrl} />
        </Link>
      </div>
      <div className={styles.info}>
        <h3><Link to={`/product/${props.postId}`}>{props.name}</Link></h3>
        <p><Link to={`/product/${props.postId}`}>{hook}</Link></p>
      </div>
    </div >
  )
}