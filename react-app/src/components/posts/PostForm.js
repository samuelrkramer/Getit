import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
// import { signUp } from '../../store/session';

const PostForm = ({mode}) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
    //   const data = await dispatch(signUp(username, email, password));
    //   if (data) {
    //     setErrors(data)
    //   }
    // }
  };

  // const updateUsername = (e) => {
  //   setUsername(e.target.value);
  // };

  // const updateEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  // const updatePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  // const updateRepeatPassword = (e) => {
  //   setRepeatPassword(e.target.value);
  // };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <form onSubmit={submitHandler}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Title*</label>
        <input
          type='text'
          name='title'
          onChange={ e => setTitle(e.target.value.slice(0,255)) }
          value={title}
        ></input>
      </div>
      <div>
        <label>Body</label>
        <textarea
          name='body'
          onChange={ e => setBody(e.target.value) }
          value={body}
        ></textarea>
      </div>
      {/* <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div> */}
      <button type='submit'>{mode} Post</button>
    </form>
  );
};

export default PostForm;
