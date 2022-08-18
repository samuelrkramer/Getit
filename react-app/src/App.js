import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PostsAll from './components/posts/PostsAll';
import PostsNewest from './components/posts/PostsNewest';
import SearchPosts from './components/posts/SearchPosts';
import SinglePost from './components/posts/SinglePost';
import PostForm from './components/posts/PostForm';
import Banner from './components/Banner';
import { authenticate } from './store/session';
import './Global.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search.toLowerCase());

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if ((window.location.hostname.startsWith("skgetit") && !params.get('nowake')) || params.get('wake')) {
      // only send automatic wakeup on production, but dev can do it with ?wake=truthy
      fetch('https://wineauxapp.herokuapp.com/api/wakeup', {mode: 'no-cors'});
      fetch('https://sk-kelp.herokuapp.com/api/wakeup', {mode: 'no-cors'});
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Sidebar />
      <main>
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
            <PostsAll />
          </Route>
          <Route path='/newest' exact={true} >
            <PostsNewest />
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
          <Route path='/search' >
            <SearchPosts />
          </Route>
          <Route path='/' exact={true} >
            <Banner />
            {/* <h1>My Home Page</h1> */}
            <PostsAll />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
