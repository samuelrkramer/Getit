import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { loginDemo, signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // console.log("handler")
    if (password === repeatPassword) {
      // console.log("match")
      const data = await dispatch(signUp(username, email, password));
      // console.log("thunked")
      if (data) {
        // console.log("data")
        setErrors(data)
        // console.log("errors", errors)
      }
    } else {
      // console.log("no match")
      setErrors(["Password and confirmation must match.","After fixing this, other inputs will be checked."])
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(loginDemo());
    if (data) {
      setErrors(data);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className="inputBox">
      <div className="errorBox">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          className="field"
          onChange={updateUsername}
          value={username}
        ></input>
        <span className={`xsmall ${username.length>40?"red":""}`}>
          {40-username.length}
        </span>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          className="field"
          onChange={updateEmail}
          value={email}
        ></input>
        <span className={`xsmall ${email.length>255?"red":""}`}>
          {255-email.length}
        </span>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          className="field"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          className="field"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
      <button onClick={demoLogin}>Demo</button>
      <span className="xsmall"> Already have an account? <Link to="/login">Log In</Link></span>
    </form>
  );
};

export default SignUpForm;
