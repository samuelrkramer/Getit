import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PostsList from './components/posts/PostsList';
import SinglePost from './components/posts/SinglePost';
import PostForm from './components/posts/PostForm';
import { authenticate } from './store/session';
import './Global.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/posts' exact={true} >
          <PostsList />
        </Route>
        <ProtectedRoute path='/posts/undefined' exact={true} >
          You've been naughty to get to this point. I told you that the title was required!
        </ProtectedRoute>
        <ProtectedRoute path='/posts/new' exact={true} >
          <PostForm mode="Create" />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <PostForm mode="Edit" />
        </ProtectedRoute>
        <Route path='/posts/:postId' exact={true} >
          <SinglePost />
        </Route>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
