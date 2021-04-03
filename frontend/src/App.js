import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import CreatePost from "./components/CreatePost";
import PostPage from './components/PostPage';
import ProfilePage from './components/ProfilePage';
import SearchResults from './components/SearchResult';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact={true} path="/">
            <Splash />
          </Route>
          <Route path='/create'>
            <CreatePost />
          </Route>
          <Route path='/product/:id'>
            <PostPage />
          </Route>
          <Route path='/profile/:id' >
            <ProfilePage />
          </Route>
          <Route path='/search' >
            <SearchResults />
          </Route>
        </Switch>
      )
      }


    </>
  );
}

export default App;