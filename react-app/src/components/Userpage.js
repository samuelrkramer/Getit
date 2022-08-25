import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

function User() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  const allItems = useSelector({posts: state.posts.obj, comments: state.comments.obj});
  console.log(allItems);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
    setLoaded(true);
  }, [userId]);

  if (!loaded) {
    return (
      <h2>Loading...</h2>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
export default User;
