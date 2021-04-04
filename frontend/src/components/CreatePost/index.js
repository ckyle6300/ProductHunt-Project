import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createProduct } from '../../store/splash';
import { useHistory } from "react-router-dom";
import styles from './CreatePost.module.css'

function CreatePost() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState('');

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      productName,
      image,
      description,
      userId: sessionUser.id
    }
    dispatch(createProduct(info));
    history.push('/');
  };

  return (
    <div className={styles.outerDiv}>
      <h3>Create A Post</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          placeholder="Title"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          placeholder="Image Url"
        />
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Product Description"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;