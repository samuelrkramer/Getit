import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import { useParams, useHistory } from 'react-router-dom';
// import { createPost, deletePost, editPost } from '../../store/post'
import { createComment, deleteComment, editComment } from '../../store/comment';

const CommentForm = ({mode, postId, comment={}, setCForm, hideCForm }) => {
  // let { postId } = useParams();
  // postId = parseInt(postId);
  // const oldComment = useSelector(state => state.comments.obj[postId]);
  // let comment = {};
  // if (mode === "Edit") {
  //   post = { ...oldPost };
  // }

  const [errors, setErrors] = useState([]);
  // const [title, setTitle] = useState(post.title || '');
  const [body, setBody] = useState(comment.body || '');
  // const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  // const history = useHistory();

  console.log("commentform render, setCForm:", setCForm);
  console.log("commentform render, hideCForm:", hideCForm);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newComment = {
      postId, body
    };
    // let thunk = createPost;
    // let result = await dispatch(createComment(newComment));
    let result;
    if (mode === "Edit") {
      newComment.id = comment.id;
      // thunk = editComment;
      result = await dispatch(editComment(newComment));
    } else {
      result = await dispatch(createComment(newComment));
    }
    // const result = await dispatch(thunk(newComment));
    if (result && result.errors) setErrors(result.errors);
    // else history.push(`/posts/${result.id}`)
    // hideCForm(false);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    const result = await dispatch(deleteComment(comment.id));
    if (result && result.errors) setErrors(result.errors);
    // else history.push('/posts');
    // hideCForm(false);
  }

  const cancelHandler = e => {
    e.preventDefault();
    // history.goBack();
    // hideCForm(false);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
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
      <button type='submit'>{mode} Comment</button>
      {mode === "Edit" && (
        <button onClick={deleteHandler}>Delete</button>
      )}
      <button onClick={cancelHandler}>Cancel</button>
    </form>
  );
};

export default CommentForm;
