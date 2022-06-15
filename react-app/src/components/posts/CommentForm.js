import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createComment, deleteComment, editComment } from '../../store/comment';

const CommentForm = ({mode, postId, comment={}, setCForm }) => {
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState(comment.body || '');

  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newComment = {
      postId, body
    };
    let result;
    if (mode === "Edit") {
      newComment.id = comment.id;
      result = await dispatch(editComment(newComment));
    } else {
      result = await dispatch(createComment(newComment));
    }
    if (result && result.errors) setErrors(result.errors);
    else setCForm(false);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    const result = await dispatch(deleteComment(comment.id));
    if (result && result.errors) setErrors(result.errors);
    setCForm(false);
  }

  const cancelHandler = e => {
    e.preventDefault();
    setCForm(false);
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
      <button type='submit'>{mode} Comment</button>
      {mode === "Edit" && (
        <button onClick={deleteHandler}>Delete</button>
      )}
      <button onClick={cancelHandler}>Cancel</button>
    </form>
  );
};

export default CommentForm;
