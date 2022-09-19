import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

function Userpage() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  const allPs = useSelector(state => state.posts.obj);
  const allCs = useSelector(state => state.comments.obj);
  console.log("allPs:", allPs);
  console.log("allCs:", allCs);

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

  const allItems = [...(user.pIds||[]).map(n => allPs[n]), ...(user.cIds||[]).map(n => allCs[n])];

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
    {/* </ul>
    <ul> */}
      {allItems.map(el => (
        <li key={el.id+el.title||"c"}>
          {el.created_at || "idk"} - {el.body}
        </li>
      ))}
    </ul>
  );
}
export default Userpage;
