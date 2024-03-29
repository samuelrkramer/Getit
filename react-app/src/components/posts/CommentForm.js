import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createComment, deleteComment, editComment } from '../../store/comment';
import { Modal } from '../../context/GetitContext';

const CommentForm = ({mode, postId, comment={}, setCForm }) => {
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState(comment.body || '');
  const [showModal, setShowModal] = useState(false);

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

  const deleteConfirm = e => {
    e.preventDefault();
    setShowModal(true);
  }

  const deleteHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    const result = await dispatch(deleteComment(comment.id));
    if (result && result.errors) setErrors(result.errors);
    else setCForm(false);
  }

  const cancelHandler = e => {
    e.preventDefault();
    setCForm(false);
  }

  let bodyRemain = body.toLowerCase().startsWith("long")?body.length:1000-body.length;

  return (
    <>
    <form onSubmit={submitHandler}>
      <div className="errorBox">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="inputBox">
        <div>
          <label><span className="red">*</span>Body</label>
          <textarea
            name='body'
            className="field bodyField"
            onChange={ e => setBody(e.target.value) }
            value={body}
          ></textarea>
          <span className={`xsmall ${bodyRemain<0?"red":""}`}>
            {bodyRemain}
          </span>
        </div>
      </div>
      <span>*required</span><br />
      <button type='submit'>{mode} Comment</button>
      {mode === "Edit" && (
        <button onClick={deleteConfirm}>Delete</button>
      )}
      <button onClick={cancelHandler}>Cancel</button>
    </form>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <div className="confirm">
          <p>Are you sure you want to delete this?</p>
          <button onClick={() => setShowModal(false)} >Cancel</button>
          <button onClick={deleteHandler} >Delete</button>
        </div>
      </Modal>
    )}
    </>
  );
};

export default CommentForm;
